
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLearnMode } from '@/contexts/LearnModeContext';
import { X, ChevronLeft, ChevronRight, BookOpen, Target, Lightbulb } from 'lucide-react';

interface TourStep {
  id: string;
  title: string;
  content: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  category: 'basics' | 'portfolio' | 'lending' | 'risk';
}

const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to DeFi Learning Mode!',
    content: 'This is a safe simulation environment where you can learn DeFi lending without any real money at risk. Think of it like paper trading for crypto!',
    target: 'learn-mode-banner',
    position: 'bottom',
    category: 'basics'
  },
  {
    id: 'portfolio',
    title: 'Your Virtual Portfolio',
    content: 'This shows your simulated assets. You start with $10,000 worth of crypto including ETH, USDC, and Bitcoin to practice with.',
    target: 'portfolio-cards',
    position: 'bottom',
    category: 'portfolio'
  },
  {
    id: 'supply-concept',
    title: 'Supplying = Depositing',
    content: 'Supplying crypto is like putting money in a high-yield savings account. You earn interest (APY) while your assets can be used as collateral.',
    target: 'supply-section',
    position: 'right',
    category: 'lending'
  },
  {
    id: 'borrow-concept',
    title: 'Borrowing = Taking a Loan',
    content: 'Borrowing lets you take out loans against your supplied assets. This is useful for leveraging positions or accessing liquidity without selling.',
    target: 'borrow-section',
    position: 'left',
    category: 'lending'
  },
  {
    id: 'health-factor',
    title: 'Health Factor = Your Safety Score',
    content: 'This measures how safe your borrowing position is. Above 2.0 is safe, below 1.0 means liquidation risk. Think of it like your credit utilization ratio.',
    target: 'health-factor',
    position: 'bottom',
    category: 'risk'
  }
];

const TourGuide = () => {
  const { tourStep, setTourStep, isTourActive, endTour } = useLearnMode();
  const [currentStep, setCurrentStep] = useState<TourStep | null>(null);

  useEffect(() => {
    if (isTourActive && tourStep < tourSteps.length) {
      setCurrentStep(tourSteps[tourStep]);
    } else {
      setCurrentStep(null);
    }
  }, [tourStep, isTourActive]);

  const nextStep = () => {
    if (tourStep < tourSteps.length - 1) {
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
      case 'basics': return <BookOpen className="w-4 h-4" />;
      case 'portfolio': return <Target className="w-4 h-4" />;
      case 'lending': return <Lightbulb className="w-4 h-4" />;
      case 'risk': return <Target className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  if (!isTourActive || !currentStep) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" />
      
      {/* Tour Card */}
      <Card className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-51 w-96 glass-card border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                {getCategoryIcon(currentStep.category)}
                Step {tourStep + 1} of {tourSteps.length}
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
              {tourSteps.map((_, index) => (
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
              {tourStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
              {tourStep < tourSteps.length - 1 && <ChevronRight className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TourGuide;
