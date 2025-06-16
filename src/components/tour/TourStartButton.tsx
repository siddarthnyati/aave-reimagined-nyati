
import React from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import { useTour } from '@/contexts/TourContext';

const TourStartButton = () => {
  const { startTour } = useTour();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={startTour}
      className="text-muted-foreground hover:text-primary"
      title="Take a tour of DeFiLend"
    >
      <HelpCircle className="w-4 h-4 mr-1" />
      Tour
    </Button>
  );
};

export default TourStartButton;
