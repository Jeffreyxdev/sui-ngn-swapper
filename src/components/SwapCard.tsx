
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDown, CircleCheck, Info, Wallet } from "lucide-react";
import CurrencySelector from "./CurrencySelector";
import { cn } from "@/lib/utils";

// Sample currency data
const cryptoCurrencies = [
  { id: 'sui', name: 'Sui', code: 'SUI', flag: '🔷' },
];

const fiatCurrencies = [
  { id: 'ngn', name: 'Nigerian Naira', code: 'NGN', flag: '🇳🇬' },
];

const SwapCard = () => {
  // State for form values
  const [fromCurrency, setFromCurrency] = useState(cryptoCurrencies[0]);
  const [toCurrency, setToCurrency] = useState(fiatCurrencies[0]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [balance, setBalance] = useState('0.5354');
  const [isLoading, setIsLoading] = useState(false);
  const [rate, setRate] = useState(1528250); // Sample rate: 1 SUI = 1,528,250 NGN

  // Calculate the opposite value when an amount changes
  useEffect(() => {
    if (fromAmount) {
      const calculatedToAmount = (parseFloat(fromAmount) * rate).toFixed(2);
      setToAmount(calculatedToAmount);
    } else {
      setToAmount('');
    }
  }, [fromAmount, rate]);

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) { // Allow empty or numeric with decimal
      setFromAmount(value);
    }
  };

  const handleSwap = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Show success message or update UI
    }, 1500);
  };

  const inputAnimationClasses = "transition-all duration-300 ease-in-out transform hover:scale-[1.01] focus-within:scale-[1.01]";

  return (
    <div className="card-panel bg-white/90 backdrop-blur-md max-w-md w-full mx-auto animate-fade-in shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Swap</h3>
        <div className="text-sm text-gray-500 flex items-center">
          <Wallet size={16} className="mr-1" />
          <span>Balance: {balance} SUI</span>
        </div>
      </div>

      <div className="space-y-6">
        {/* From Currency Section */}
        <div className={cn("rounded-xl border border-gray-200 p-4", inputAnimationClasses)}>
          <label className="block text-sm font-medium text-gray-500 mb-2">You send</label>
          <div className="flex items-center">
            <Input
              type="text"
              value={fromAmount}
              onChange={handleFromAmountChange}
              placeholder="0.00"
              className="text-2xl font-medium bg-transparent border-none focus-visible:ring-0 p-0 h-auto placeholder:text-gray-300"
            />
            <CurrencySelector
              label=""
              selectedCurrency={fromCurrency}
              currencies={cryptoCurrencies}
              onCurrencyChange={setFromCurrency}
              className="min-w-[120px]"
            />
          </div>
          <div className="flex justify-end mt-2">
            <button 
              className="text-xs text-brand-primary hover:text-brand-primary/80 transition-colors"
              onClick={() => setFromAmount(balance)}
            >
              MAX
            </button>
          </div>
        </div>

        {/* Swap Direction Indicator */}
        <div className="relative flex justify-center">
          <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 bg-white rounded-full p-2 shadow-md">
            <ArrowDown size={20} className="text-gray-500" />
          </div>
          <div className="w-full border-t border-gray-100 mt-3"></div>
        </div>

        {/* To Currency Section */}
        <div className={cn("rounded-xl border border-gray-200 p-4", inputAnimationClasses)}>
          <label className="block text-sm font-medium text-gray-500 mb-2">You receive</label>
          <div className="flex items-center">
            <Input
              type="text"
              value={toAmount}
              readOnly
              placeholder="0.00"
              className="text-2xl font-medium bg-transparent border-none focus-visible:ring-0 p-0 h-auto placeholder:text-gray-300"
            />
            <CurrencySelector
              label=""
              selectedCurrency={toCurrency}
              currencies={fiatCurrencies}
              onCurrencyChange={setToCurrency}
              className="min-w-[120px]"
            />
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Estimated value
          </div>
        </div>

        {/* Exchange Rate */}
        <div className="flex justify-between text-sm text-gray-500 px-1">
          <span>Exchange Rate</span>
          <span className="font-medium">1 SUI ≈ {rate.toLocaleString()} NGN</span>
        </div>

        {/* Action Button */}
        <Button 
          onClick={handleSwap}
          disabled={!fromAmount || isLoading || parseFloat(fromAmount) <= 0}
          className="w-full py-6 bg-brand-primary hover:bg-brand-primary/90 text-white text-lg font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            <span>Swap Now</span>
          )}
        </Button>

        {/* Additional Information */}
        <div className="flex items-start space-x-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
          <Info size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
          <div>
            By completing this transaction, you agree to SUIFI.NG's terms of service and privacy policy. Rates may fluctuate during transaction processing.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapCard;
