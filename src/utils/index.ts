// Utility functions and helpers
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString();
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Add more utility functions as needed
export {};
