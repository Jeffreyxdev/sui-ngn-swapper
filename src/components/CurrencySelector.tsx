
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type Currency = {
  id: string;
  name: string;
  code: string;
  icon?: React.ReactNode;
  flag?: string;
};

interface CurrencySelectorProps {
  label: string;
  selectedCurrency: Currency;
  currencies: Currency[];
  onCurrencyChange: (currency: Currency) => void;
  isDisabled?: boolean;
  className?: string;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  label,
  selectedCurrency,
  currencies,
  onCurrencyChange,
  isDisabled = false,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    if (!isDisabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleCurrencySelect = (currency: Currency) => {
    onCurrencyChange(currency);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      {label && <label className="block text-sm font-medium text-gray-500 mb-1">{label}</label>}
      <Button
        type="button"
        onClick={toggleDropdown}
        className={cn(
          "w-full flex items-center justify-between px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl text-left hover:border-brand-primary/40 transition-all duration-300",
          isDisabled && "opacity-70 cursor-not-allowed hover:border-gray-200",
          "focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
        )}
        variant="ghost"
        disabled={isDisabled}
      >
        <div className="flex items-center">
          {selectedCurrency.flag && (
            <span className="mr-2 text-xl">{selectedCurrency.flag}</span>
          )}
          {selectedCurrency.icon && (
            <div className="mr-2">{selectedCurrency.icon}</div>
          )}
          <span className="font-medium">{selectedCurrency.code}</span>
        </div>
        <ChevronDown 
          size={18} 
          className={cn(
            "text-gray-500 transition-transform duration-300", 
            isOpen ? "rotate-180" : "rotate-0"
          )} 
        />
      </Button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-xl bg-white shadow-lg border border-gray-200 max-h-60 overflow-auto animate-fade-in">
          <div className="p-2">
            {currencies.map((currency) => (
              <div
                key={currency.id}
                onClick={() => handleCurrencySelect(currency)}
                className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
              >
                {currency.flag && (
                  <span className="mr-2 text-xl">{currency.flag}</span>
                )}
                {currency.icon && (
                  <div className="mr-2">{currency.icon}</div>
                )}
                <div>
                  <div className="font-medium">{currency.code}</div>
                  <div className="text-sm text-gray-500">{currency.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
