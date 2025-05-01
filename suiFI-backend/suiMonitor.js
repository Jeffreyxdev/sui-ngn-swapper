require('dotenv').config();
const express = require('express');
const axios = require('axios');
const Paystack = require('paystack-api')(process.env.PAYSTACK_SECRET_KEY);
const { SuiClient, getFullnodeUrl } = require('@mysten/sui.js/client');
const { db } = require('./FIrebase');
const { doc, getDoc, updateDoc, setDoc } = require('firebase/firestore');

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// SUI setup
const provider = new SuiClient({ url: getFullnodeUrl('testnet') });

// Validate SUI_ADDRESS_TO_WATCH
const SUI_ADDRESS_TO_WATCH = process.env.SUI_ADDRESS_TO_WATCH;
if (!SUI_ADDRESS_TO_WATCH || !SUI_ADDRESS_TO_WATCH.match(/^0x[0-9a-fA-F]{64}$/)) {
  console.error('Error: SUI_ADDRESS_TO_WATCH is not a valid Sui address or is undefined.');
  console.error('SUI_ADDRESS_TO_WATCH:', SUI_ADDRESS_TO_WATCH);
  process.exit(1);
}

// Store processed transaction digests to prevent duplicates
const processedTxns = new Set();

// Helper function to create a Paystack sub-account for a user
async function createPaystackSubAccount(wallet) {
  try {
    const userRef = doc(db, 'users', wallet.toLowerCase());
    const userDoc = await getDoc(userRef);

    let subAccountCode = userDoc.exists() ? userDoc.data().subAccountCode : null;

    if (!subAccountCode) {
      // Create a new Paystack sub-account
      const response = await Paystack.subaccount.create({
        business_name: `SuifiSwap User ${wallet.slice(0, 8)}`,
        settlement_bank: 'Test Bank', // Replace with actual bank name in production
        account_number: '0000000000', // Replace with a valid test account number
        percentage_charge: 0, // No additional charges on the sub-account
      });

      subAccountCode = response.data.subaccount_code;

      // Store the sub-account code in Firebase
      await setDoc(userRef, { subAccountCode }, { merge: true });
      console.log(`Created Paystack sub-account for wallet ${wallet}: ${subAccountCode}`);
    }

    return subAccountCode;
  } catch (error) {
    console.error(`Error creating Paystack sub-account for wallet ${wallet}:`, error.message);
    throw new Error('Failed to create Paystack sub-account');
  }
}

// Helper function to initiate a Paystack transfer to a sub-account
async function transferToSubAccount(subAccountCode, amountNGN, wallet) {
  try {
    const transferRecipient = await Paystack.transferrecipient.create({
      type: 'nuban',
      name: `SuifiSwap User ${wallet.slice(0, 8)}`,
      account_number: '0000000000', // Replace with actual account number
      bank_code: '044', // Replace with actual bank code (e.g., Access Bank)
      currency: 'NGN',
      subaccount: subAccountCode,
    });

    const transfer = await Paystack.transfer.initiate({
      source: 'balance',
      amount: amountNGN * 100, // Paystack expects amount in kobo (1 NGN = 100 kobo)
      recipient: transferRecipient.data.recipient_code,
      reason: `SUI to NGN swap for wallet ${wallet}`,
    });

    console.log(`Initiated transfer of ${amountNGN} NGN to sub-account ${subAccountCode} for wallet ${wallet}`);
    return transfer.data;
  } catch (error) {
    console.error(`Error initiating transfer to sub-account for wallet ${wallet}:`, error.message);
    throw new Error('Failed to transfer to sub-account');
  }
}

// /api/map endpoint to process SUI-to-NGN swaps
app.post('/api/map', async (req, res) => {
  const { wallet, txnHash, amount } = req.body;

  if (!wallet || !txnHash || !amount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Convert SUI to NGN
    const amountNGN = await convertSuiToNgn(parseFloat(amount));
    if (!amountNGN) {
      return res.status(500).json({ error: 'Failed to convert SUI to NGN' });
    }

    // Create or get Paystack sub-account for the user
    const subAccountCode = await createPaystackSubAccount(wallet);

    // Transfer NGN to the user's sub-account
    await transferToSubAccount(subAccountCode, amountNGN, wallet);

    // Update user's Naira Vault balance in Firebase for frontend display
    const vaultRef = doc(db, 'nairaVaults', wallet.toLowerCase());
    const vaultDoc = await getDoc(vaultRef);

    if (vaultDoc.exists()) {
      const currentBalance = vaultDoc.data().balance || 0;
      await updateDoc(vaultRef, {
        balance: currentBalance + amountNGN,
      });
    } else {
      await setDoc(vaultRef, { balance: amountNGN });
    }

    console.log(`Credited ${amountNGN} NGN to sub-account and vault for wallet ${wallet}`);
    return res.status(200).json({ message: 'NGN credited to sub-account', txnHash });
  } catch (error) {
    console.error('Error processing swap:', error);
    return res.status(500).json({ error: 'Failed to process swap' });
  }
});

// /api/withdraw endpoint to withdraw Naira from sub-account to user's bank account
app.post('/api/withdraw', async (req, res) => {
  const { wallet, bankCode, accountNumber, amount } = req.body;

  if (!wallet || !bankCode || !accountNumber || !amount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Verify the user's Paystack sub-account
    const userRef = doc(db, 'users', wallet.toLowerCase());
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists() || !userDoc.data().subAccountCode) {
      return res.status(400).json({ error: 'Sub-account not found for this wallet' });
    }

    // Verify the Naira Vault balance
    const vaultRef = doc(db, 'nairaVaults', wallet.toLowerCase());
    const vaultDoc = await getDoc(vaultRef);

    if (!vaultDoc.exists() || vaultDoc.data().balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance in Naira Vault' });
    }

    // Create a transfer recipient for the user's bank account
    const transferRecipient = await Paystack.transferrecipient.create({
      type: 'nuban',
      name: `SuifiSwap User ${wallet.slice(0, 8)}`,
      account_number: accountNumber,
      bank_code: bankCode,
      currency: 'NGN',
    });

    // Initiate the transfer from Paystack balance to the user's bank account
    const transfer = await Paystack.transfer.initiate({
      source: 'balance',
      amount: amount * 100, // Paystack expects amount in kobo
      recipient: transferRecipient.data.recipient_code,
      reason: `Withdrawal for wallet ${wallet}`,
    });

    // Update the Naira Vault balance in Firebase
    await updateDoc(vaultRef, {
      balance: vaultDoc.data().balance - amount,
    });

    console.log(`Withdrew ${amount} NGN to bank account for wallet ${wallet}`);
    return res.status(200).json({ message: 'Withdrawal successful', transfer });
  } catch (error) {
    console.error('Error processing withdrawal:', error.message);
    return res.status(500).json({ error: 'Failed to process withdrawal' });
  }
});

// Listen for SUI transactions
async function monitorSuiTransfers() {
  setInterval(async () => {
    try {
      console.log('Querying transactions for address:', SUI_ADDRESS_TO_WATCH);

      // Fetch transactions for the watched address
      const txns = await provider.queryTransactionBlocks({
        filter: {
          ToAddress: SUI_ADDRESS_TO_WATCH,
        },
        options: {
          showEffects: true,
          showInput: true,
          showEvents: true,
          showBalanceChanges: true,
        },
        limit: 10,
        order: 'descending',
      });

      if (!txns.data || txns.data.length === 0) {
        console.log('No new transactions found.');
        return;
      }

      for (const tx of txns.data) {
        const digest = tx.digest;

        // Skip if transaction has already been processed
        if (processedTxns.has(digest)) {
          console.log(`Transaction ${digest} already processed, skipping.`);
          continue;
        }

        // Check if the transaction was successful
        if (tx.effects?.status?.status !== 'success') {
          console.log(`Transaction ${digest} failed, skipping.`);
          continue;
        }

        // Extract the sender and amount
        const sender = tx.transaction?.data?.sender;
        const amount = extractAmount(tx);

        if (!sender || !amount) {
          console.log(`Transaction ${digest}: Could not extract sender or amount, skipping.`);
          continue;
        }

        console.log(`Processing transaction ${digest}: Sender=${sender}, Amount=${amount} SUI`);

        // Convert SUI to NGN
        const amountNGN = await convertSuiToNgn(amount);
        if (!amountNGN) {
          console.log(`Failed to convert ${amount} SUI to NGN, skipping.`);
          continue;
        }

        // Create or get Paystack sub-account for the user
        const subAccountCode = await createPaystackSubAccount(sender);

        // Transfer NGN to the user's sub-account
        await transferToSubAccount(subAccountCode, amountNGN, sender);

        // Update user's Naira Vault balance in Firebase for frontend display
        const vaultRef = doc(db, 'nairaVaults', sender.toLowerCase());
        const vaultDoc = await getDoc(vaultRef);

        if (vaultDoc.exists()) {
          const currentBalance = vaultDoc.data().balance || 0;
          await updateDoc(vaultRef, {
            balance: currentBalance + amountNGN,
          });
        } else {
          await setDoc(vaultRef, { balance: amountNGN });
        }

        console.log(`Credited ${amountNGN} NGN to sub-account and vault for wallet ${sender}`);

        // Mark the transaction as processed
        processedTxns.add(digest);
        console.log(`Transaction ${digest} processed successfully.`);
      }
    } catch (err) {
      console.error('SUI Monitor Error:', err.message);
    }
  }, 10000); // Poll every 10 seconds
}

// Extract SUI amount from a transaction
function extractAmount(tx) {
  try {
    const balanceChanges = tx.balanceChanges;
    if (!balanceChanges) {
      return null;
    }

    // Find the balance change for SUI received by the watched address
    const change = balanceChanges.find(
      (c) =>
        c.coinType === '0x2::sui::SUI' &&
        c.owner.AddressOwner === SUI_ADDRESS_TO_WATCH
    );

    if (!change || !change.amount) {
      return null;
    }

    // Convert MIST to SUI (1 SUI = 10^9 MIST)
    const amountInSui = parseInt(change.amount) / 1_000_000_000;
    return amountInSui > 0 ? amountInSui : null;
  } catch (err) {
    console.error('Error extracting amount:', err.message);
    return null;
  }
}

// Convert SUI to NGN using CoinGecko API
async function convertSuiToNgn(amountSui) {
  try {
    const res = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: 'sui',
        vs_currencies: 'ngn',
      },
    });

    const marketPrice = res.data.sui.ngn;
    const adjustedPrice = marketPrice * 0.94; // Adjust for 6% fee
    const amountNgn = amountSui * adjustedPrice;
    return Math.floor(amountNgn); // Round down
  } catch (err) {
    console.error('Error converting SUI to NGN:', err.message);
    return null;
  }
}

// Start monitoring SUI transfers
monitorSuiTransfers();

// Start the Express server
app.listen(PORT, () => {
  console.log(`suiFI backend running on http://localhost:${PORT}`);
});