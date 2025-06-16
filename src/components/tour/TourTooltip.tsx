import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useTour } from '@/contexts/TourContext';
import { useLocation } from 'react-router-dom';
import { useWallet } from '@/contexts/WalletContext';

const TourTooltip = () => {
  const { isActive, currentStep, steps, nextStep, prevStep, skipTour } = useTour();
  const { isConnected } = useWallet();
  const location = useLocation();
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const currentStepData = steps[currentStep];

  useEffect(() => {
    if (!isActive || !currentStepData) return;

    // Check if step should be shown on current route
    if (currentStepData.showOnRoutes && !currentStepData.showOnRoutes.includes(location.pathname)) {
      nextStep();
      return;
    }

    // Check if step requires wallet connection
    if (currentStepData.requiresWallet && !isConnected) {
      nextStep();
      return;
    }

    const updatePosition = () => {
      const targetElement = document.querySelector(currentStepData.target);
      if (!targetElement || !tooltipRef.current) {
        setIsVisible(false);
        return;
      }

      const targetRect = targetElement.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const offset = 16;

      let top = 0;
      let left = 0;

      switch (currentStepData.position) {
        case 'top':
          top = targetRect.top - tooltipRect.height - offset;
          left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
          break;
        case 'bottom':
          top = targetRect.bottom + offset;
          left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
          break;
        case 'left':
          top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
          left = targetRect.left - tooltipRect.width - offset;
          break;
        case 'right':
          top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
          left = targetRect.right + offset;
          break;
      }

      // Keep tooltip within viewport
      const margin = 16;
      top = Math.max(margin, Math.min(top, window.innerHeight - tooltipRect.height - margin));
      left = Math.max(margin, Math.min(left, window.innerWidth - tooltipRect.width - margin));

      setPosition({ top, left });
      setIsVisible(true);

      // Highlight target element
      targetElement.classList.add('tour-highlight');
      
      // Scroll target into view if needed
      targetElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'center'
      });
    };

    // Wait for DOM updates
    const timer = setTimeout(updatePosition, 100);
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
      
      // Remove highlight from all elements
      document.querySelectorAll('.tour-highlight').forEach(el => {
        el.classList.remove('tour-highlight');
      });
    };
  }, [isActive, currentStep, currentStepData, location.pathname, isConnected, nextStep]);

  if (!isActive || !currentStepData || !isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/20 z-40 tour-overlay" />
      
      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="fixed z-50 tour-tooltip animate-in fade-in-0 zoom-in-95 duration-200"
        style={{ top: position.top, left: position.left }}
      >
        <Card className="w-80 shadow-2xl border-primary/20 bg-background/95 backdrop-blur-md">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">{currentStepData.title}</CardTitle>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 -mt-1"
                onClick={skipTour}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <Badge variant="outline" className="w-fit">
              Step {currentStep + 1} of {steps.length}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {currentStepData.content}
            </p>
            
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="w-3 h-3" />
                Previous
              </Button>
              
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={skipTour}
                  className="text-muted-foreground"
                >
                  Skip Tour
                </Button>
                <Button
                  size="sm"
                  onClick={nextStep}
                  className="flex items-center gap-1"
                >
                  {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                  {currentStep < steps.length - 1 && <ChevronRight className="w-3 h-3" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default TourTooltip;
