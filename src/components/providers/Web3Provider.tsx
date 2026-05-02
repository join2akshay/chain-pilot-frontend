import { ReactNode, useEffect } from 'react';
import { createAppKit, useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { networks, projectId, metadata, ethersAdapter } from '../../../config/walletconnect';
import { walletStorage } from '@/lib/walletStorage';

// Initialize AppKit ONCE at module load (not in component)
createAppKit({
  adapters: [ethersAdapter],
  networks,
  metadata,
  projectId,
  themeMode: 'light',
  features: {
    analytics: true,
  },
  themeVariables: {
    '--w3m-accent': '#000000',
  },
});

interface Web3ProviderProps {
  children: ReactNode;
}

/**
 * Web3Provider - Wraps entire app with AppKit context
 * Should be placed at root level (__root.tsx)
 * Ensures wallet connection persists across routes and page refreshes
 */
export function Web3Provider({ children }: Web3ProviderProps) {
  const { isConnected, address } = useAppKitAccount();

  // Check and restore connection on mount
  useEffect(() => {
    if (isConnected && address) {
      console.log('Web3 Provider: Wallet already connected', address);
      // Save wallet address for API token refresh
      walletStorage.setAddress(address);
    } else {
      // Check if there was a previous connection
      const lastAddress = localStorage.getItem('lastConnectedAddress');
      if (lastAddress) {
        console.log('Web3 Provider: Previous wallet connection found:', lastAddress);
      }
    }
  }, [isConnected, address]);

  return <>{children}</>;
}

/**
 * Export AppKit hooks for use throughout the app
 * This ensures all components use the same AppKit instance
 */
export { useAppKit, useAppKitAccount };
export type { useAppKitAccount };
