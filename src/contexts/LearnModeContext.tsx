
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LearnModeData {
  portfolio: {
    netWorth: number;
    supplied: number;
    borrowed: number;
    healthFactor: number;
  };
  assets: Array<{
    symbol: string;
    name: string;
    balance: number;
    price: number;
    supplied: number;
    borrowed: number;
  }>;
  transactions: Array<{
    id: string;
    type: 'supply' | 'borrow' | 'repay' | 'withdraw';
    asset: string;
    amount: number;
    timestamp: Date;
  }>;
}

interface LearnModeContextType {
  isLearnMode: boolean;
  toggleLearnMode: () => void;
  learnModeData: LearnModeData;
  updateLearnModeData: (updates: Partial<LearnModeData>) => void;
  resetLearnModeData: () => void;
  tourStep: number;
  setTourStep: (step: number) => void;
  isTourActive: boolean;
  startTour: () => void;
  endTour: () => void;
  completedModules: string[];
  completeModule: (moduleId: string) => void;
}

const defaultLearnModeData: LearnModeData = {
  portfolio: {
    netWorth: 10000,
    supplied: 0,
    borrowed: 0,
    healthFactor: 0,
  },
  assets: [
    { symbol: 'ETH', name: 'Ethereum', balance: 3.0, price: 3200, supplied: 0, borrowed: 0 },
    { symbol: 'USDC', name: 'USD Coin', balance: 5000, price: 1, supplied: 0, borrowed: 0 },
    { symbol: 'BTC', name: 'Bitcoin', balance: 0.15, price: 65000, supplied: 0, borrowed: 0 },
  ],
  transactions: [],
};

const LearnModeContext = createContext<LearnModeContextType | undefined>(undefined);

export const LearnModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLearnMode, setIsLearnMode] = useState(false);
  const [learnModeData, setLearnModeData] = useState<LearnModeData>(defaultLearnModeData);
  const [tourStep, setTourStep] = useState(0);
  const [isTourActive, setIsTourActive] = useState(false);
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  const toggleLearnMode = () => {
    setIsLearnMode(!isLearnMode);
    if (!isLearnMode) {
      // Entering learn mode
      resetLearnModeData();
    }
  };

  const updateLearnModeData = (updates: Partial<LearnModeData>) => {
    setLearnModeData(prev => ({ ...prev, ...updates }));
  };

  const resetLearnModeData = () => {
    setLearnModeData(defaultLearnModeData);
  };

  const startTour = () => {
    setIsTourActive(true);
    setTourStep(0);
  };

  const endTour = () => {
    setIsTourActive(false);
    setTourStep(0);
  };

  const completeModule = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules(prev => [...prev, moduleId]);
    }
  };

  return (
    <LearnModeContext.Provider value={{
      isLearnMode,
      toggleLearnMode,
      learnModeData,
      updateLearnModeData,
      resetLearnModeData,
      tourStep,
      setTourStep,
      isTourActive,
      startTour,
      endTour,
      completedModules,
      completeModule,
    }}>
      {children}
    </LearnModeContext.Provider>
  );
};

export const useLearnMode = () => {
  const context = useContext(LearnModeContext);
  if (context === undefined) {
    throw new Error('useLearnMode must be used within a LearnModeProvider');
  }
  return context;
};
