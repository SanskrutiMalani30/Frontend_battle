'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type CurrencyType = 'USD' | 'INR' | 'EUR';
type BillingType = 'monthly' | 'annual';

interface PricingContextProps {
  currency: CurrencyType;
  setCurrency: (currency: CurrencyType) => void;
  billing: BillingType;
  setBilling: (billing: BillingType) => void;
}

const PricingContext = createContext<PricingContextProps | undefined>(undefined);

export const PricingProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrencyState] = useState<CurrencyType>('USD');
  const [billing, setBillingState] = useState<BillingType>('monthly');

  const setCurrency = (curr: CurrencyType) => {
    setCurrencyState(curr);
  };

  const setBilling = (bill: BillingType) => {
    setBillingState(bill);
  };

  return (
    <PricingContext.Provider value={{ currency, setCurrency, billing, setBilling }}>
      {children}
    </PricingContext.Provider>
  );
};

export const usePricing = () => {
  const context = useContext(PricingContext);
  if (!context) {
    throw new Error('usePricing must be used within a PricingProvider');
  }
  return context;
};
