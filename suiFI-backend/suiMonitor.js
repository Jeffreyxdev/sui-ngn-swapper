// index.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { SuiClient, getFullnodeUrl } = require('@mysten/sui.js/client');


const app = express();
const PORT = 3000;

// SUI setup

const provider = new SuiClient({ url: getFullnodeUrl('mainnet') });

// Listen for SUI txns
async function monitorSuiTransfers() {
  setInterval(async () => {
    try {
      const txs = await provider.getTransactionsForAddress(process.env.SUI_ADDRESS_TO_WATCH);
      for (let tx of txs) {
        const details = await provider.getTransactionBlock({ digest: tx });
        // TODO: Add logic to prevent duplicate payouts
        if (details?.effects?.status?.status === 'success') {
          const amount = extractAmount(details); // Create logic to extract SUI amount
          const userBankDetails = mapUser(details.sender); // map sender to NGN user
          await sendNGN(userBankDetails, amount);
        }
      }
    } catch (err) {
      console.error('SUI Monitor Error:', err);
    }
  }, 10000); // Poll every 10s
}

// Send NGN using Paystack
async function sendNGN({ account_number, bank_code }, amountNGN) {
  try {
    const response = await axios.post('https://api.paystack.co/transfer', {
      source: 'balance',
      reason: 'suiFI NGN payout',
      amount: amountNGN * 100, // Paystack uses kobo
      recipient: await createTransferRecipient(account_number, bank_code)
    }, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
      }
    });
    console.log('Payout sent:', response.data);
  } catch (error) {
    console.error('Paystack payout error:', error.response.data);
  }
}

async function createTransferRecipient(account_number, bank_code) {
  const res = await axios.post('https://api.paystack.co/transferrecipient', {
    type: 'nuban',
    name: 'suiFI User',
    account_number,
    bank_code,
    currency: 'NGN'
  }, {
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
    }
  });
  return res.data.data.recipient_code;
}

monitorSuiTransfers();

app.listen(PORT, () => {
  console.log(`suiFI backend running on http://localhost:${PORT}`);
});
