const DEFAULT_CURRENCY = "KES";

export const formatCurrency = (amount: number, currency?: string) => {
  try {
    // Try to use the user's locale and preferred currency
    const userLocale = navigator.language;
    const userCurrency = currency || DEFAULT_CURRENCY;
    
    return new Intl.NumberFormat(userLocale, {
      style: 'currency',
      currency: userCurrency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch (error) {
    // Fallback to basic KES formatting if Intl.NumberFormat fails
    console.error('Error formatting currency:', error);
    return `KES ${amount.toLocaleString()}`;
  }
};