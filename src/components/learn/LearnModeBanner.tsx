
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLearnMode } from '@/contexts/LearnModeContext';
import { GraduationCap, Play, RotateCcw, Trophy } from 'lucide-react';

const LearnModeBanner = () => {
  const { 
    isLearnMode, 
    toggleLearnMode, 
    startTour, 
    resetLearnModeData, 
    completedModules 
  } = useLearnMode();

  if (!isLearnMode) return null;

  const progressPercentage = (completedModules.length / 5) * 100;

  return (
    <Card className="mb-6 glass-card border-primary/30 bg-gradient-to-r from-primary/10 to-green-500/10" data-tour="learn-mode-banner">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-semibold text-primary">Learn Mode Active</h3>
                <p className="text-sm text-muted-foreground">
                  Practice DeFi lending with virtual assets - no real money at risk!
                </p>
              </div>
            </div>
            
            {completedModules.length > 0 && (
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-600">
                  {completedModules.length}/5 Modules
                </Badge>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={startTour}
              className="flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Start Tour
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={resetLearnModeData}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={toggleLearnMode}
            >
              Exit Learn Mode
            </Button>
          </div>
        </div>

        {progressPercentage > 0 && (
          <div className="mt-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Learning Progress</span>
              <span className="text-primary font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-muted/30 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary to-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LearnModeBanner;
