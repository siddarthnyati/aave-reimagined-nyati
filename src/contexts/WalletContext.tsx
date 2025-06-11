
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface WalletContextType {
  isConnected: boolean;
  walletAddress: string | null;
  balance: Record<string, number>;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance] = useState({
    ETH: 12.5,
    USDC: 25000,
    BTC: 0.8,
    LINK: 500,
    UNI: 1200,
    AAVE: 45
  });
  const { toast } = useToast();

  const connectWallet = async () => {
    // Simulate wallet connection
    const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
    setWalletAddress(mockAddress);
    setIsConnected(true);
    
    toast({
      title: "Wallet Connected!",
      description: `Connected to ${mockAddress.slice(0, 6)}...${mockAddress.slice(-4)}`,
    });
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress(null);
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  return (
    <WalletContext.Provider value={{
      isConnected,
      walletAddress,
      balance,
      connectWallet,
      disconnectWallet
    }}>
      {children}
    </WalletContext.Provider>
  );
};
