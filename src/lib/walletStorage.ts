/**
 * Wallet storage utility
 * Saves wallet address to localStorage when user connects
 */

export const walletStorage = {
  /**
   * Save wallet address to localStorage
   */
  setAddress: (address: string) => {
    localStorage.setItem('walletAddress', address);
  },

  /**
   * Get stored wallet address
   */
  getAddress: (): string | null => {
    return localStorage.getItem('walletAddress');
  },

  /**
   * Clear wallet address
   */
  clearAddress: () => {
    localStorage.removeItem('walletAddress');
  },

  /**
   * Save tokens
   */
  setTokens: (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  },

  /**
   * Get tokens
   */
  getTokens: () => ({
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
  }),

  /**
   * Clear all wallet-related data
   */
  clear: () => {
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('lastConnectedAddress');
  },
};
