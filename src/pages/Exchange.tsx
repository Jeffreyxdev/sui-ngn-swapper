import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toB64 } from '@mysten/bcs';
import { Loader2, ArrowDownUp, ArrowRight } from "lucide-react";
import { WalletProvider, useWallet, ConnectButton } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { SuiClient } from '@mysten/sui.js/client';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import ParticlesBackground from '@/components/ParticlesBackground';
import { db } from './Firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Buffer } from 'buffer'; // Import Buffer for base64 encoding

// Initialize SuiClient manually since @suiet/wallet-kit doesn't provide SuiClientProvider
const suiClient = new SuiClient({ url: 'https://fullnode.testnet.sui.io/' });

export type Currency = {
  id: string;
  name: string;
  code: string;
  icon?: React.ReactNode;
  flag?: string;
};

const fiatCurrencies: Currency[] = [
  { 
    id: 'ngn', 
    name: 'Nigerian Naira', 
    code: 'NGN', 
    flag: 'https://flagcdn.com/w80/ng.png' 
  },
];

const cryptoCurrencies: Currency[] = [
  { 
    id: 'sui', 
    name: 'Sui', 
    code: 'SUI', 
    icon: 'https://cryptologos.cc/logos/sui-sui-logo.svg' 
  },
];

const Swap = () => {
  const wallet = useWallet();
  const connected = wallet.connected;
  const address = wallet.account?.address;

  const [fromCurrency] = useState(cryptoCurrencies[0]);
  const [toCurrency, setToCurrency] = useState(fiatCurrencies[0]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [suiBalance, setSuiBalance] = useState<number | null>(null);
  const [rate, setRate] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [nairaVault, setNairaVault] = useState(0);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  // Debug: Log wallet info
  useEffect(() => {
    console.log("Wallet:", wallet);
  }, [wallet]);

  // Debug: Log environment variable
  useEffect(() => {
    console.log("VITE_RECEIVER_ADDRESS:", import.meta.env.VITE_RECEIVER_ADDRESS);
  }, []);

  // Fetch Naira Vault balance from Firebase when wallet connects
  useEffect(() => {
    const fetchVaultBalance = async () => {
      if (!connected || !address) {
        setNairaVault(0);
        return;
      }

      try {
        const vaultRef = doc(db, 'nairaVaults', address.toLowerCase());
        const vaultDoc = await getDoc(vaultRef);

        if (vaultDoc.exists()) {
          setNairaVault(vaultDoc.data().balance || 0);
        } else {
          // Initialize vault for new user
          await setDoc(vaultRef, { balance: 0 });
          setNairaVault(0);
        }
      } catch (err) {
        console.error("Failed to fetch Naira Vault balance:", err);
        setError('Failed to fetch vault balance.');
      }
    };

    fetchVaultBalance();
  }, [connected, address]);

  // Fetch SUI balance when wallet is connected
  useEffect(() => {
    const fetchBalance = async () => {
      if (!connected || !address) {
        setSuiBalance(null);
        return;
      }

      try {
        const coins = await suiClient.getBalance({
          owner: address,
          coinType: '0x2::sui::SUI',
        });

        const balanceInSui = parseInt(coins.totalBalance) / 1_000_000_000;
        setSuiBalance(balanceInSui);
      } catch (err) {
        console.error("Failed to fetch SUI balance:", err);
        setSuiBalance(null);
        setError('Failed to fetch balance. Please try again.');
      }
    };

    fetchBalance();
  }, [connected, address]);

  // Update toAmount based on fromAmount and rate
  useEffect(() => {
    if (fromAmount && !isNaN(parseFloat(fromAmount))) {
      const amount = parseFloat(fromAmount);
      const converted = amount * rate;
      setToAmount(converted.toFixed(2));

      if (suiBalance !== null && amount > suiBalance) {
        setError(`Insufficient SUI balance. You have ${suiBalance.toFixed(2)} SUI.`);
      } else {
        setError('');
      }
    } else {
      setToAmount('');
      setError('');
    }
  }, [fromAmount, rate, suiBalance]);

  // Fetch SUI price in NGN
  useEffect(() => {
    const fetchSuiPrice = async () => {
      try {
        const res = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
          params: {
            ids: 'sui',
            vs_currencies: 'ngn',
          },
        });

        const marketPrice = res.data.sui.ngn;
        const adjustedPrice = marketPrice * 0.94; // Adjust for 6% fee
        setRate(adjustedPrice);
      } catch (err) {
        console.error("Failed to fetch SUI price:", err);
      }
    };

    fetchSuiPrice();
    const interval = setInterval(fetchSuiPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setFromAmount(val);
    }
  };

  const handleSwap = async () => {
    if (!connected) return alert("Connect your wallet first");
    if (!fromAmount) return alert("Enter an amount to swap");

    const amount = parseFloat(fromAmount);
    if (suiBalance !== null && amount > suiBalance) {
      setError(`Insufficient SUI balance. You have ${suiBalance.toFixed(2)} SUI.`);
      return;
    }

    if (!import.meta.env.VITE_RECEIVER_ADDRESS) {
      setError("Receiver address is not configured. Please contact support.");
      return;
    }

    if (!wallet.account || !wallet.account.address) {
      setError("Wallet account or address not found. Please reconnect your wallet.");
      return;
    }

    const senderAddress = wallet.account.address;
    console.log("Sender address:", senderAddress);

    setIsLoading(true);
    setStatus('Sending SUI...');
    setError('');

    try {
      const tx = new TransactionBlock();
      const amountInMist = Math.floor(amount * 1_000_000_000);
      
      const [coin] = tx.splitCoins(tx.gas, [tx.pure(amountInMist)]);
      tx.transferObjects([coin], tx.pure(import.meta.env.VITE_RECEIVER_ADDRESS));
      tx.setGasBudget(1000000000); // 1 SUI in MIST for gas

      // Explicitly set the sender on the TransactionBlock
      tx.setSender(senderAddress);
      console.log("Transaction sender set to:", senderAddress);

      // Build the transaction as raw bytes (Uint8Array)
      const txBytes = await tx.build({
        client: suiClient,
        protocolConfig: undefined,
        onlyTransactionKind: false,
      });
      console.log("Transaction bytes:", txBytes);

      // Convert the raw bytes to base64 using Buffer
      const txBase64 = Buffer.from(txBytes).toString('base64');
      console.log("Transaction base64:", txBase64);

      // Sign and execute the transaction with the base64 string
      const result = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: txBase64,
        account: wallet.account,
        chain: 'sui:testnet',
        options: {
          showEffects: true,
          showObjectChanges: true,
        },
      });
      console.log("Transaction result:", result);

      if (result.effects?.status?.status !== 'success') {
        throw new Error('Transaction failed: ' + (result.effects?.status?.error || 'Unknown error'));
      }

      setStatus('Awaiting NGN credit...');
      await axios.post('http://localhost:3000/api/map', {
        wallet: address,
        txnHash: result.digest,
        amount: fromAmount,
      });

      // Fetch updated vault balance
      const vaultRef = doc(db, 'nairaVaults', address.toLowerCase());
      const vaultDoc = await getDoc(vaultRef);
      if (vaultDoc.exists()) {
        setNairaVault(vaultDoc.data().balance || 0);
      }

      setStatus('Swap successful');
    } catch (err) {
      console.error("Swap failed - Full error:", err);
      setStatus('Swap failed');
      setError(err.message || 'An error occurred during the swap. Check the console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="overflow-hidden">
      <Navbar />
      <ParticlesBackground />

      {/* Floating wallet container with Connect + Disconnect */}
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-white border border-gray-200 shadow-lg rounded-full px-4 py-2 flex items-center gap-3">
          {connected ? (
            <>
              <span className="text-sm text-gray-700">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => wallet.disconnect()}
              >
                Disconnect
              </Button>
            </>
          ) : (
            <ConnectButton
              connectText="Connect Wallet"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full text-sm"
            />
          )}
        </div>
      </div>

      <div className="p-6 mx-auto text-black rounded-lg mt-7 shadow-lg max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 mt-10">suiFI Swap</h1>

        {connected ? (
          <>
            <div className="space-y-5">
              {/* You Send */}
              <div className="bg-blue-50 p-5 rounded-2xl">
                <label className="text-sm text-gray-600">You Send</label>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <img src="https://cryptologos.cc/logos/sui-sui-logo.svg" alt="sui" className="w-5 h-5" />
                    <span className="font-medium">{fromCurrency.code}</span>
                  </div>
                  <Input
                    value={fromAmount}
                    onChange={handleFromAmountChange}
                    placeholder="0.00"
                    className="text-right text-xl border-none bg-transparent"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Balance: {suiBalance !== null ? `${suiBalance.toFixed(2)} SUI` : 'Loading...'}
                </p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <ArrowDownUp size={20} className="text-blue-400" />
              </div>

              {/* You Receive */}
              <div className="bg-gray-100 p-5 rounded-2xl">
                <label className="text-sm text-gray-600">You Receive</label>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <img src="https://flagcdn.com/w40/ng.png" alt="ngn" className="w-5 h-5 rounded-full" />
                    <span className="font-medium">{toCurrency.code}</span>
                  </div>
                  <Input
                    value={toAmount}
                    readOnly
                    placeholder="0.00"
                    className="text-right text-xl border-none bg-transparent"
                  />
                </div>
              </div>
              <span className="text-xs text-gray-500">
                Estimated value
                <br />
                <span className="text-[10px] text-gray-400">(Rate includes 6% fee)</span>
              </span>
            </div>

            {error && (
              <p className="mt-2 text-sm text-red-500 text-center">{error}</p>
            )}

            <Button
              onClick={handleSwap}
              className="w-full py-5 mt-6 bg-blue-500 text-white rounded-xl font-medium"
              disabled={isLoading || !fromAmount || !!error}
            >
              {isLoading ? (
                <><Loader2 size={16} className="animate-spin mr-2" /> Swapping...</>
              ) : (
                <>Swap Now <ArrowRight size={16} /></>
              )}
            </Button>

            <p className="mt-4 text-center text-sm text-gray-500">{status}</p>

            <div className="mt-10 bg-green-50 p-5 rounded-xl shadow-inner text-left">
              <h2 className="text-lg font-bold mb-2">💰 Naira Vault</h2>
              <p className="text-2xl font-semibold text-green-600">₦{nairaVault.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">Available for withdrawal</p>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Please connect your wallet to start swapping.</p>
        )}
      </div>

      {/* Custom Styling for ConnectButton Modal */}
      <style jsx global>{`
        .connect-modal {
          position: fixed !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          background: white !important;
          border-radius: 16px !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
          padding: 24px !important;
          width: 90% !important;
          max-width: 400px !important;
          z-index: 1000 !important;
        }
        .connect-modal ul {
          list-style: none !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        .connect-modal li {
          display: flex !important;
          align-items: center !important;
          gap: 12px !important;
          padding: 12px !important;
          border-bottom: 1px solid #eee !important;
          cursor: pointer !important;
          transition: background 0.2s !important;
        }
        .connect-modal li:last-child {
          border-bottom: none !important;
        }
        .connect-modal li:hover {
          background: #f5f5f5 !important;
        }
        .connect-modal img {
          width: 24px !important;
          height: 24px !important;
          border-radius: 4px !important;
        }
        .connect-modal span {
          font-size: 16px !important;
          font-weight: 500 !important;
          color: #333 !important;
        }
        .connect-modal .wallet-info {
          margin-top: 20px !important;
          padding-top: 16px !important;
          border-top: 1px solid #eee !important;
        }
        .connect-modal .wallet-info h3 {
          font-size: 14px !important;
          font-weight: 600 !important;
          color: #555 !important;
          margin-bottom: 8px !important;
        }
        .connect-modal .wallet-info p {
          font-size: 12px !important;
          color: #666 !important;
          line-height: 1.5 !important;
        }
        .connect-modal-backdrop {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          background: rgba(0, 0, 0, 0.5) !important;
          z-index: 999 !important;
        }
      `}</style>
    </div>
  );
};

const Exchange = () => {
  return (
    <WalletProvider>
      <Swap />
    </WalletProvider>
  );
};

export default Exchange;