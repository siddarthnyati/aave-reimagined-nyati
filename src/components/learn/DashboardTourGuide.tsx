
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLearnMode } from '@/contexts/LearnModeContext';
import { X, ChevronLeft, ChevronRight, Wallet, TrendingUp, Shield, Target } from 'lucide-react';

interface TourStep {
  id: string;
  title: string;
  content: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  category: 'portfolio' | 'lending' | 'risk' | 'analytics';
}

const dashboardTourSteps: TourStep[] = [
  {
    id: 'portfolio-overview',
    title: 'Your DeFi Portfolio Hub',
    content: 'This is your financial command center. Like a traditional investment dashboard, but for decentralized finance. Track your total worth, active positions, and performance all in one place.',
    target: 'portfolio-overview',
    position: 'bottom',
    category: 'portfolio'
  },
  {
    id: 'supply-section',
    title: 'Supply = High-Yield Savings',
    content: 'Supplying crypto is like putting money in a high-yield savings account. You earn interest (APY) and your assets become collateral you can borrow against - without losing ownership.',
    target: 'supply-section',
    position: 'right',
    category: 'lending'
  },
  {
    id: 'borrow-section',
    title: 'Borrowing = Smart Leverage',
    content: 'Borrowing lets you access liquidity without selling your assets. Think of it like a home equity loan - you use your crypto as collateral to borrow other assets.',
    target: 'borrow-section',
    position: 'left',
    category: 'lending'
  },
  {
    id: 'health-factor',
    title: 'Health Factor = Your Safety Score',
    content: 'This is your liquidation protection score. Above 2.0 is safe, below 1.5 is risky, and below 1.0 means automatic liquidation. It\'s like your debt-to-equity ratio in traditional finance.',
    target: 'health-factor',
    position: 'bottom',
    category: 'risk'
  },
  {
    id: 'transaction-history',
    title: 'Your DeFi Activity Feed',
    content: 'Track all your lending, borrowing, and reward transactions. Every action is recorded on-chain and visible here for complete transparency.',
    target: 'transaction-history',
    position: 'top',
    category: 'analytics'
  }
];

const DashboardTourGuide = () => {
  const { tourStep, setTourStep, isTourActive, endTour } = useLearnMode();
  const [currentStep, setCurrentStep] = useState<TourStep | null>(null);

  useEffect(() => {
    if (isTourActive && tourStep < dashboardTourSteps.length) {
      setCurrentStep(dashboardTourSteps[tourStep]);
    } else {
      setCurrentStep(null);
    }
  }, [tourStep, isTourActive]);

  const nextStep = () => {
    if (tourStep < dashboardTourSteps.length - 1) {
      setTourStep(tourStep + 1);
    } else {
      endTour();
    }
  };

  const prevStep = () => {
    if (tourStep > 0) {
      setTourStep(tourStep - 1);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'portfolio': return <Wallet className="w-4 h-4" />;
      case 'lending': return <TrendingUp className="w-4 h-4" />;
      case 'risk': return <Shield className="w-4 h-4" />;
      case 'analytics': return <Target className="w-4 h-4" />;
      default: return <Wallet className="w-4 h-4" />;
    }
  };

  if (!isTourActive || !currentStep) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" />
      
      <Card className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[101] w-96 max-w-[90vw] glass-card border-primary/30 shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                {getCategoryIcon(currentStep.category)}
                Step {tourStep + 1} of {dashboardTourSteps.length}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={endTour}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <h3 className="text-lg font-semibold mb-3 text-foreground">
            {currentStep.title}
          </h3>
          
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {currentStep.content}
          </p>

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={tourStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="flex gap-1">
              {dashboardTourSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === tourStep ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextStep}
              className="btn-primary flex items-center gap-2"
            >
              {tourStep === dashboardTourSteps.length - 1 ? 'Finish' : 'Next'}
              {tourStep < dashboardTourSteps.length - 1 && <ChevronRight className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardTourGuide;
