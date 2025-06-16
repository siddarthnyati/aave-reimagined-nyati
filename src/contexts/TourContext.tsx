
import React, { createContext, useContext, useState, useEffect } from 'react';

interface TourStep {
  id: string;
  title: string;
  content: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  showOnRoutes?: string[];
  requiresWallet?: boolean;
}

interface TourContextType {
  isActive: boolean;
  currentStep: number;
  steps: TourStep[];
  startTour: () => void;
  endTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  skipTour: () => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to DeFiLend',
    content: 'Your comprehensive DeFi lending and borrowing platform. Let us show you around!',
    target: '[data-tour="logo"]',
    position: 'bottom'
  },
  {
    id: 'connect-wallet',
    title: 'Connect Your Wallet',
    content: 'First, connect your wallet to access all DeFi features and manage your portfolio.',
    target: '[data-tour="connect-wallet"]',
    position: 'bottom'
  },
  {
    id: 'dashboard',
    title: 'Your Command Center',
    content: 'The Dashboard is your central hub for monitoring all DeFi activities and portfolio performance.',
    target: '[data-tour="dashboard-link"]',
    position: 'bottom'
  },
  {
    id: 'portfolio-overview',
    title: 'Portfolio Overview',
    content: 'Monitor your net worth, active positions, and TrustGraph score at a glance.',
    target: '[data-tour="portfolio-cards"]',
    position: 'bottom',
    showOnRoutes: ['/dashboard'],
    requiresWallet: true
  },
  {
    id: 'ai-strategies',
    title: '🤖 AI-Powered Strategies',
    content: 'Let our AI optimize your lending and borrowing automatically for maximum yield.',
    target: '[data-tour="ai-strategies-tab"]',
    position: 'bottom',
    showOnRoutes: ['/dashboard'],
    requiresWallet: true
  },
  {
    id: 'rebalancing-interface',
    title: 'Smart Rebalancing',
    content: 'Set up automated portfolio rebalancing based on your risk tolerance and yield goals.',
    target: '[data-tour="rebalancing-section"]',
    position: 'top',
    showOnRoutes: ['/dashboard'],
    requiresWallet: true
  },
  {
    id: 'ai-assistant',
    title: 'AI Lending Assistant',
    content: 'Chat with our AI assistant for personalized guidance and real-time strategy suggestions.',
    target: '[data-tour="ai-assistant"]',
    position: 'left'
  }
];

export const TourProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenTour, setHasSeenTour] = useState(false);

  useEffect(() => {
    const tourCompleted = localStorage.getItem('defilend-tour-completed');
    if (tourCompleted) {
      setHasSeenTour(true);
    } else {
      // Auto-start tour for first-time visitors after a short delay
      const timer = setTimeout(() => {
        if (!hasSeenTour) {
          startTour();
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasSeenTour]);

  const startTour = () => {
    setIsActive(true);
    setCurrentStep(0);
  };

  const endTour = () => {
    setIsActive(false);
    setCurrentStep(0);
    localStorage.setItem('defilend-tour-completed', 'true');
    setHasSeenTour(true);
  };

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      endTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipTour = () => {
    endTour();
  };

  return (
    <TourContext.Provider
      value={{
        isActive,
        currentStep,
        steps: tourSteps,
        startTour,
        endTour,
        nextStep,
        prevStep,
        skipTour
      }}
    >
      {children}
    </TourContext.Provider>
  );
};

export const useTour = () => {
  const context = useContext(TourContext);
  if (context === undefined) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};
