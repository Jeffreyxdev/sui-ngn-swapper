require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { SuiClient, getFullnodeUrl } = require('@mysten/sui.js/client');
const { db } = require('./FIrebase'); // Import Firebase
const { doc, getDoc, updateDoc, setDoc } = require('firebase/firestore');

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// SUI setup
const provider = new SuiClient({ url: getFullnodeUrl('testnet') }); // Match frontend network (testnet)

// Store processed transaction digests to prevent duplicates
const processedTxns = new Set();

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

    // Update user's Naira Vault in Firebase
    const vaultRef = doc(db, 'nairaVaults', wallet.toLowerCase());
    const vaultDoc = await getDoc(vaultRef);

    if (vaultDoc.exists()) {
      const currentBalance = vaultDoc.data().balance || 0;
      await updateDoc(vaultRef, {
        balance: currentBalance + amountNGN,
      });
    } else {
      // Initialize vault for new user
      await setDoc(vaultRef, { balance: amountNGN });
    }

    console.log(`Credited ${amountNGN} NGN to vault for wallet ${wallet}`);
    return res.status(200).json({ message: 'NGN credited to vault', txnHash });
  } catch (error) {
    console.error('Error processing swap:', error);
    return res.status(500).json({ error: 'Failed to process swap' });
  }
});

// Listen for SUI transactions
async function monitorSuiTransfers() {
  setInterval(async () => {
    try {
      // Fetch transactions for the watched address
      const txns = await provider.queryTransactionBlocks({
        filter: {
          ToAddress: process.env.SUI_ADDRESS_TO_WATCH,
        },
        options: {
          showEffects: true,
          showInput: true,
          showEvents: true,
          showBalanceChanges: true,
        },
        limit: 10, // Fetch the latest 10 transactions
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

        // Update user's Naira Vault in Firebase
        const vaultRef = doc(db, 'nairaVaults', sender.toLowerCase());
        const vaultDoc = await getDoc(vaultRef);

        if (vaultDoc.exists()) {
          const currentBalance = vaultDoc.data().balance || 0;
          await updateDoc(vaultRef, {
            balance: currentBalance + amountNGN,
          });
        } else {
          // Initialize vault for new user
          await setDoc(vaultRef, { balance: amountNGN });
        }

        console.log(`Credited ${amountNGN} NGN to vault for wallet ${sender}`);

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
        c.owner.AddressOwner === process.env.SUI_ADDRESS_TO_WATCH
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
    const adjustedPrice = marketPrice * 0.94; // Adjust for 6% fee (consistent with frontend)
    const amountNgn = amountSui * adjustedPrice;
    return Math.floor(amountNgn); // Round down to avoid decimal issues
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