
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLearnMode } from '@/contexts/LearnModeContext';
import { X, ChevronLeft, ChevronRight, CreditCard, Target, ShoppingBag, Zap } from 'lucide-react';

interface TourStep {
  id: string;
  title: string;
  content: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  category: 'rewards' | 'optimization' | 'shopping' | 'strategy';
}

const creditCardTourSteps: TourStep[] = [
  {
    id: 'rewards-aggregator',
    title: 'Your Crypto Rewards Control Center',
    content: 'This aggregates rewards from all your crypto credit cards (Coinbase, Crypto.com, Binance, etc.) in one place. Think of it as your crypto cashback dashboard.',
    target: 'rewards-aggregator',
    position: 'bottom',
    category: 'rewards'
  },
  {
    id: 'optimization-recommendations',
    title: 'AI-Powered Yield Optimization',
    content: 'Instead of letting rewards sit idle, our AI suggests the best DeFi strategies to maximize your earnings. Convert scattered rewards into optimized yield-generating positions.',
    target: 'optimization-recommendations',
    position: 'bottom',
    category: 'optimization'
  },
  {
    id: 'shopping-tabs',
    title: 'Earn While You Spend',
    content: 'Shop at partner merchants and earn additional crypto rewards on top of your credit card cashback. It\'s like stacking cashback programs for maximum rewards.',
    target: 'shopping-tabs',
    position: 'top',
    category: 'shopping'
  },
  {
    id: 'featured-promotion',
    title: 'Exclusive Crypto Cardholder Perks',
    content: 'Access special promotions and bonuses exclusive to crypto credit card users. These limited-time offers can significantly boost your reward earnings.',
    target: 'featured-promotion',
    position: 'bottom',
    category: 'strategy'
  }
];

const CreditCardTourGuide = () => {
  const { tourStep, setTourStep, isTourActive, endTour } = useLearnMode();
  const [currentStep, setCurrentStep] = useState<TourStep | null>(null);

  useEffect(() => {
    if (isTourActive && tourStep < creditCardTourSteps.length) {
      setCurrentStep(creditCardTourSteps[tourStep]);
    } else {
      setCurrentStep(null);
    }
  }, [tourStep, isTourActive]);

  const nextStep = () => {
    if (tourStep < creditCardTourSteps.length - 1) {
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
      case 'rewards': return <CreditCard className="w-4 h-4" />;
      case 'optimization': return <Target className="w-4 h-4" />;
      case 'shopping': return <ShoppingBag className="w-4 h-4" />;
      case 'strategy': return <Zap className="w-4 h-4" />;
      default: return <CreditCard className="w-4 h-4" />;
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
                Step {tourStep + 1} of {creditCardTourSteps.length}
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
              {creditCardTourSteps.map((_, index) => (
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
              {tourStep === creditCardTourSteps.length - 1 ? 'Finish' : 'Next'}
              {tourStep < creditCardTourSteps.length - 1 && <ChevronRight className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CreditCardTourGuide;
