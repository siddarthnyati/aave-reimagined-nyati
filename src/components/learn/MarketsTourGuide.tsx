
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLearnMode } from '@/contexts/LearnModeContext';
import { X, ChevronLeft, ChevronRight, TrendingUp, DollarSign, BarChart3, AlertTriangle } from 'lucide-react';

interface TourStep {
  id: string;
  title: string;
  content: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  category: 'basics' | 'rates' | 'analytics' | 'risk';
}

const marketsTourSteps: TourStep[] = [
  {
    id: 'market-overview',
    title: 'Understanding Market Overview',
    content: 'This shows key market metrics: Total Market Size, Available Liquidity, Total Borrows, and Active Users. These numbers help you understand market health and opportunities.',
    target: 'market-stats',
    position: 'bottom',
    category: 'basics'
  },
  {
    id: 'supply-apy',
    title: 'Supply APY - Your Earning Rate',
    content: 'Supply APY is the annual percentage yield you earn by depositing (supplying) your crypto. Higher APY means more earnings, but consider the underlying risks.',
    target: 'market-table',
    position: 'top',
    category: 'rates'
  },
  {
    id: 'borrow-apy',
    title: 'Borrow APY - Your Interest Cost',
    content: 'Borrow APY is what you pay annually to borrow crypto. This rate changes based on supply and demand. Always ensure you can afford the interest payments.',
    target: 'market-table',
    position: 'top',
    category: 'rates'
  },
  {
    id: 'market-filters',
    title: 'Filter by Asset Type',
    content: 'Use filters to find specific types of assets: Stablecoins (low risk), Major coins (BTC, ETH), DeFi tokens, or Emerging assets. Each category has different risk profiles.',
    target: 'market-filters',
    position: 'bottom',
    category: 'basics'
  },
  {
    id: 'market-analytics',
    title: 'Market Analytics & Trends',
    content: 'Analytics help you understand market trends, utilization rates, and historical performance. Use this data to make informed lending and borrowing decisions.',
    target: 'market-analytics',
    position: 'bottom',
    category: 'analytics'
  },
  {
    id: 'flash-news',
    title: 'Stay Updated with Flash News',
    content: 'Real-time market updates, rate changes, and protocol news. Staying informed helps you react quickly to market opportunities and risks.',
    target: 'flash-news',
    position: 'left',
    category: 'risk'
  }
];

const MarketsTourGuide = () => {
  const { tourStep, setTourStep, isTourActive, endTour } = useLearnMode();
  const [currentStep, setCurrentStep] = useState<TourStep | null>(null);

  useEffect(() => {
    if (isTourActive && tourStep < marketsTourSteps.length) {
      setCurrentStep(marketsTourSteps[tourStep]);
    } else {
      setCurrentStep(null);
    }
  }, [tourStep, isTourActive]);

  const nextStep = () => {
    if (tourStep < marketsTourSteps.length - 1) {
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
      case 'basics': return <TrendingUp className="w-4 h-4" />;
      case 'rates': return <DollarSign className="w-4 h-4" />;
      case 'analytics': return <BarChart3 className="w-4 h-4" />;
      case 'risk': return <AlertTriangle className="w-4 h-4" />;
      default: return <TrendingUp className="w-4 h-4" />;
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
                Markets Step {tourStep + 1} of {marketsTourSteps.length}
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
              {marketsTourSteps.map((_, index) => (
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
              {tourStep === marketsTourSteps.length - 1 ? 'Finish' : 'Next'}
              {tourStep < marketsTourSteps.length - 1 && <ChevronRight className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default MarketsTourGuide;
