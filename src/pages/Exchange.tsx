// src/Exchange.js or App.js
import React, { useState } from 'react';
import {
  SuiClientProvider,
  WalletProvider,
  ConnectButton,
  useWallet,
} from '@mysten/dapp-kit';
import { createNetworkConfig, SuiClient } from '@mysten/dapp-kit';
import axios from 'axios';

// 🔧 Setup network config
const { networkConfig } = createNetworkConfig({
  testnet: { url: 'https://fullnode.testnet.sui.io/' },
});
const suiClient = new SuiClient({ url: networkConfig.testnet.url });

const Swap = () => {
  const {
    connected,
    address,
    signAndExecuteTransactionBlock,
  } = useWallet();

  const [amount, setAmount] = useState('');
  const [bankDetails, setBankDetails] = useState({ account_number: '', bank_code: '' });
  const [status, setStatus] = useState('Not started');

  const handleSwap = async () => {
    if (!connected) return alert('Connect your wallet first');
    setStatus('Sending SUI...');

    try {
      // Sample transfer transaction
      const tx = {
        kind: 'paySui',
        data: {
          inputCoins: [],
          recipients: [process.env.REACT_APP_RECEIVER_ADDRESS],
          amounts: [parseInt(amount)],
        },
      };

      const result = await signAndExecuteTransactionBlock({
        transactionBlock: tx,
        options: { showEffects: true, showObjectChanges: true },
      });

      setStatus('SUI Sent. Waiting for NGN payout...');

      await axios.post('http://localhost:3000/api/map', {
        wallet: address,
        account_number: bankDetails.account_number,
        bank_code: bankDetails.bank_code,
        txnHash: result.digest,
        amount,
      });

      setStatus('NGN payout processing...');
    } catch (err) {
      console.error(err);
      setStatus('Error during swap');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">suiFI Swap</h1>
      <ConnectButton />
      {connected && (
        <>
          <div className="my-4">
            <label>SUI Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full text-black p-2 rounded"
            />
          </div>
          <div className="my-4">
            <label>Account Number</label>
            <input
              type="text"
              value={bankDetails.account_number}
              onChange={(e) =>
                setBankDetails({ ...bankDetails, account_number: e.target.value })
              }
              className="w-full text-black p-2 rounded"
            />
          </div>
          <div className="my-4">
            <label>Bank Code</label>
            <input
              type="text"
              value={bankDetails.bank_code}
              onChange={(e) =>
                setBankDetails({ ...bankDetails, bank_code: e.target.value })
              }
              className="w-full text-black p-2 rounded"
            />
          </div>
          <button
            onClick={handleSwap}
            className="bg-purple-600 py-2 px-4 rounded text-white"
          >
            Swap
          </button>
          <p className="mt-4">{status}</p>
        </>
      )}
    </div>
  );
};

const Exchange = () => {
  return (
    <SuiClientProvider
      networks={networkConfig}
      defaultNetwork="testnet"
      client={suiClient}
    >
      <WalletProvider autoConnect>
        <Swap />
      </WalletProvider>
    </SuiClientProvider>
  );
};

export default Exchange;
