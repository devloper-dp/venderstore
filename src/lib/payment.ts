// Mock payment implementation for client-side only
export const processPayment = async (amount: number) => {
  return new Promise((resolve) => {
    // Simulate payment processing delay
    setTimeout(() => {
      resolve({
        success: true,
        transactionId: Math.random().toString(36).substr(2, 9),
        amount: amount,
        timestamp: new Date().toISOString()
      });
    }, 1500);
  });
};