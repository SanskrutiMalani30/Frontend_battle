import { pricingConfig } from '../data/pricingConfig';

export interface CalculatedPrice {
  value: number;
  formatted: string;
  symbol: string;
  code: string;
}

export function calculatePrice(
  basePriceUSD: number,
  currencyCode: 'USD' | 'INR' | 'EUR',
  billingType: 'monthly' | 'annual'
): CalculatedPrice {
  const currency = pricingConfig.currencies[currencyCode];
  const billing = pricingConfig.billing[billingType];

  // Base Price * Currency multiplier * Regional tariff
  const baseLocalized = basePriceUSD * currency.multiplier * currency.regionalTariff;

  // Apply annual discount if billing type is annual
  let finalPrice = baseLocalized;
  if (billingType === 'annual') {
    finalPrice = baseLocalized * (1 - billing.discount);
  }

  // Round to nearest integer for clean display, except for decimals in EUR/USD if needed.
  // For SaaS premium feel, clean whole numbers are usually preferred (e.g. $29, €27, ₹1,999)
  const roundedPrice = Math.round(finalPrice);

  // Format with commas based on locale
  let formattedValue = '';
  if (currencyCode === 'INR') {
    // Indian formatting (e.g. 1,50,000)
    formattedValue = new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(roundedPrice);
  } else if (currencyCode === 'EUR') {
    // European formatting
    formattedValue = new Intl.NumberFormat('de-DE', {
      maximumFractionDigits: 0,
    }).format(roundedPrice);
  } else {
    // US formatting
    formattedValue = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(roundedPrice);
  }

  return {
    value: roundedPrice,
    symbol: currency.symbol,
    code: currencyCode,
    formatted: `${currency.symbol}${formattedValue}`,
  };
}
