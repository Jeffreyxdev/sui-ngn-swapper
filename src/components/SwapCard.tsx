
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Lock, ArrowDownUp, Coins, ChevronDown, ArrowRight } from "lucide-react";
import CurrencySelector from "./CurrencySelector";
import { cn } from "@/lib/utils";

// Define the Currency type to match CurrencySelector component
export type Currency = {
  id: string;
  name: string;
  code: string;
  icon?: React.ReactNode;
  flag?: string;
};

// Updated currency data with proper flags and icons
const cryptoCurrencies: Currency[] = [
  { 
    id: 'sui', 
    name: 'Sui', 
    code: 'SUI', 
    icon: <Coins className="text-blue-500" size={20} /> 
  },
];

const fiatCurrencies: Currency[] = [
  { 
    id: 'ngn', 
    name: 'Nigerian Naira', 
    code: 'NGN', 
    flag: '🇳🇬' 
  },
];

const SwapCard = () => {
  // State for form values
  const [fromCurrency, setFromCurrency] = useState<Currency>(cryptoCurrencies[0]);
  const [toCurrency, setToCurrency] = useState<Currency>(fiatCurrencies[0]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [balance, setBalance] = useState('0.5354');
  const [rate, setRate] = useState(750);
  const [isLoading, setIsLoading] = useState(false);

  // Update the toAmount when fromAmount changes based on rate
  useEffect(() => {
    if (fromAmount && !isNaN(parseFloat(fromAmount))) {
      const convertedAmount = (parseFloat(fromAmount) * rate).toFixed(2);
      setToAmount(convertedAmount);
    } else {
      setToAmount('');
    }
  }, [fromAmount, rate]);

  // Handler for from input change
  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setFromAmount(value);
    }
  };

  // Swap the currencies
  const handleSwapCurrencies = () => {
    // Since we're restricting to SUI -> NGN, we won't actually swap
    // But we'll show the animation for UX purposes
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  // Define the handler functions with proper typing
  const handleFromCurrencyChange = (currency: Currency) => {
    setFromCurrency(currency);
  };

  const handleToCurrencyChange = (currency: Currency) => {
    setToCurrency(currency);
  };

  return (
    <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-lg p-6 max-w-md w-full">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-1">Swap Crypto to Fiat</h3>
        <p className="text-gray-500 text-sm">Exchange cryptocurrencies for local currencies instantly</p>
      </div>
      
      {/* You Send Section */}
      <div className="space-y-5">
        <div className="bg-blue-50/70 backdrop-blur-sm rounded-2xl p-5">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-gray-600 font-medium">You send</label>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-[120px]">
              <div className="bg-blue-100 rounded-full p-1.5">
                {fromCurrency.icon}
              </div>
              <div className="flex items-center gap-1 font-medium">
                {fromCurrency.code}
                <ChevronDown size={16} className="text-gray-500" />
              </div>
            </div>
            
            <Input
              type="text"
              value={fromAmount}
              onChange={handleFromAmountChange}
              placeholder="0.00"
              className="text-2xl font-medium text-right border-none bg-transparent p-0 focus-visible:outline-none focus-visible:ring-0 w-auto max-w-[150px]"
            />
          </div>
          
          <div className="mt-2 text-right">
            <span className="text-xs text-gray-500">
              Balance: <span className="text-blue-600">{balance} {fromCurrency.code}</span>
            </span>
          </div>
        </div>
        
        {/* Arrow Button */}
        <div className="flex justify-center relative">
          <div className="absolute top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md">
            <ArrowDownUp size={18} className="text-blue-500" />
          </div>
        </div>
        
        {/* You Receive Section */}
        <div className="bg-gray-50/70 backdrop-blur-sm rounded-2xl p-5">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-gray-600 font-medium">You receive</label>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-[120px]">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-lg">{toCurrency.flag}</span>
              </div>
              <div className="flex items-center gap-1 font-medium">
                {toCurrency.code}
                <ChevronDown size={16} className="text-gray-500" />
              </div>
            </div>
            
            <Input
              type="text"
              value={toAmount}
              readOnly
              placeholder="0.00"
              className="text-2xl font-medium text-right border-none bg-transparent p-0 focus-visible:outline-none focus-visible:ring-0 w-auto max-w-[150px]"
            />
          </div>
          
          <div className="mt-2 text-right">
            <span className="text-xs text-gray-500">
              Estimated value
            </span>
          </div>
        </div>
      </div>
      
      {/* Swap Button */}
      <Button 
        className="w-full py-6 mt-6 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-base font-medium flex items-center justify-center gap-2"
        disabled={!fromAmount || isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="animate-spin mr-2" />
            Processing...
          </>
        ) : (
          <>
            Swap Now
            <ArrowRight size={18} />
          </>
        )}
      </Button>
    </div>
  );
};

export default SwapCard;
