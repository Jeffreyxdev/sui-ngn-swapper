
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Lock, ArrowDownUp } from "lucide-react";
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

// Sample currency data
const cryptoCurrencies: Currency[] = [
  { id: 'sui', name: 'Sui', code: 'SUI', flag: '🔷' },
];

const fiatCurrencies: Currency[] = [
  { id: 'ngn', name: 'Nigerian Naira', code: 'NGN', flag: '🇳🇬' },
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

  const inputAnimationClasses = "transition-all duration-300 ease-in-out transform hover:scale-[1.01] focus-within:scale-[1.01]";

  return (
    <div className="glass-panel rounded-2xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Swap</h3>
        <div className="flex items-center text-brand-primary">
          <Lock size={16} className="mr-1" />
          <span className="text-sm">Secure</span>
        </div>
      </div>
      
      <div className="space-y-5 relative">
        {/* From Currency Input */}
        <div className={cn("p-4 rounded-xl bg-white/70 backdrop-blur-md border border-gray-200/40 shadow-sm", inputAnimationClasses)}>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-gray-500 font-medium">From</label>
            <div className="text-sm text-gray-500">
              Balance: {balance} {fromCurrency.code}
            </div>
          </div>
          
          <div className="flex items-center">
            <Input
              type="text"
              value={fromAmount}
              onChange={handleFromAmountChange}
              placeholder="0.00"
              className="text-xl font-medium border-none bg-transparent p-0 focus-visible:outline-none focus-visible:ring-0 flex-1"
            />
            <CurrencySelector
              label=""
              selectedCurrency={fromCurrency}
              currencies={cryptoCurrencies}
              onCurrencyChange={handleFromCurrencyChange}
              className="min-w-[120px]"
            />
          </div>
        </div>
        
        {/* Swap Button */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <Button
            onClick={handleSwapCurrencies}
            size="sm"
            className="rounded-full bg-gray-50 text-gray-500 hover:text-brand-primary hover:bg-white border border-gray-200 shadow-md w-10 h-10 p-0 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <ArrowDownUp size={18} />
            )}
          </Button>
        </div>
        
        {/* To Currency Input */}
        <div className={cn("p-4 rounded-xl bg-white/70 backdrop-blur-md border border-gray-200/40 shadow-sm", inputAnimationClasses)}>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-gray-500 font-medium">To</label>
            <div className="text-sm text-gray-500">
              Rate: 1 {fromCurrency.code} = {rate} {toCurrency.code}
            </div>
          </div>
          
          <div className="flex items-center">
            <Input
              type="text"
              value={toAmount}
              readOnly
              placeholder="0.00"
              className="text-xl font-medium border-none bg-transparent p-0 focus-visible:outline-none focus-visible:ring-0 flex-1"
            />
            <CurrencySelector
              label=""
              selectedCurrency={toCurrency}
              currencies={fiatCurrencies}
              onCurrencyChange={handleToCurrencyChange}
              className="min-w-[120px]"
            />
          </div>
        </div>
      </div>
      
      <Button 
        className="w-full py-6 mt-6 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-xl text-base flex items-center justify-center gap-2"
        disabled={!fromAmount || isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="animate-spin mr-2" />
            Processing...
          </>
        ) : (
          <>
            <Lock size={18} className="mr-1" />
            Swap
          </>
        )}
      </Button>
      
      <div className="mt-4 text-xs text-center text-gray-500">
        By swapping, you agree to our <a href="#" className="text-brand-primary hover:underline">Terms of Service</a>
      </div>
    </div>
  );
};

export default SwapCard;
