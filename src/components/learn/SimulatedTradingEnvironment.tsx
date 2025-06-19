
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useLearnMode } from '@/contexts/LearnModeContext';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Shield, 
  AlertTriangle,
  PlayCircle,
  RotateCcw,
  Trophy
} from 'lucide-react';

interface MarketScenario {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  volatility: 'low' | 'medium' | 'high';
  expectedOutcome: string;
}

interface SimulationState {
  currentScenario: MarketScenario | null;
  portfolio: {
    supplied: number;
    borrowed: number;
    netWorth: number;
    healthFactor: number;
  };
  isRunning: boolean;
  currentDay: number;
  totalDays: number;
  events: Array<{
    day: number;
    event: string;
    impact: 'positive' | 'negative' | 'neutral';
  }>;
}

const marketScenarios: MarketScenario[] = [
  {
    id: 'stable-market',
    name: 'Stable Market Conditions',
    description: 'Learn the basics of lending in a low-volatility environment. Perfect for understanding core concepts without market stress.',
    difficulty: 'beginner',
    duration: '30 days',
    volatility: 'low',
    expectedOutcome: 'Steady 4-6% APY with minimal risk'
  },
  {
    id: 'bull-market',
    name: 'Bull Market Rally',
    description: 'Experience a crypto bull run. Learn to manage leverage and optimize yields during rising prices.',
    difficulty: 'intermediate', 
    duration: '60 days',
    volatility: 'medium',
    expectedOutcome: 'High returns but increased liquidation risk'
  },
  {
    id: 'bear-market',
    name: 'Bear Market Crash',
    description: 'Navigate a 50% market crash. Learn risk management, liquidation protection, and crisis decision-making.',
    difficulty: 'advanced',
    duration: '90 days',
    volatility: 'high',
    expectedOutcome: 'Survival-focused with capital preservation'
  },
  {
    id: 'volatility-event',
    name: 'Flash Crash Event',
    description: 'Experience extreme volatility with liquidation cascades. Learn emergency protocols and risk mitigation.',
    difficulty: 'advanced',
    duration: '7 days',
    volatility: 'high',
    expectedOutcome: 'Stress-test your risk management skills'
  }
];

const SimulatedTradingEnvironment = () => {
  const { learnModeData, updateLearnModeData } = useLearnMode();
  const [simState, setSimState] = useState<SimulationState>({
    currentScenario: null,
    portfolio: {
      supplied: 5000,
      borrowed: 0,
      netWorth: 10000,
      healthFactor: 0
    },
    isRunning: false,
    currentDay: 0,
    totalDays: 30,
    events: []
  });

  const startScenario = (scenario: MarketScenario) => {
    setSimState(prev => ({
      ...prev,
      currentScenario: scenario,
      isRunning: true,
      currentDay: 0,
      totalDays: parseInt(scenario.duration.split(' ')[0]),
      events: []
    }));
  };

  const resetSimulation = () => {
    setSimState(prev => ({
      ...prev,
      currentScenario: null,
      isRunning: false,
      currentDay: 0,
      events: [],
      portfolio: {
        supplied: 5000,
        borrowed: 0,
        netWorth: 10000,
        healthFactor: 0
      }
    }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  const getVolatilityIcon = (volatility: string) => {
    switch (volatility) {
      case 'low': return <Shield className="w-4 h-4 text-green-400" />;
      case 'medium': return <TrendingUp className="w-4 h-4 text-yellow-400" />;
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default: return <TrendingUp className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card bg-gradient-to-r from-primary/5 to-blue-400/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 gradient-text">
            <PlayCircle className="w-6 h-6" />
            DeFi Trading Simulator
          </CardTitle>
          <p className="text-muted-foreground">
            Practice lending and borrowing strategies in realistic market conditions without real money at risk
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="scenarios" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="scenarios">Market Scenarios</TabsTrigger>
          <TabsTrigger value="simulation">Active Simulation</TabsTrigger>
          <TabsTrigger value="results">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="scenarios" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {marketScenarios.map((scenario) => (
              <Card key={scenario.id} className="glass-card hover:scale-105 transition-all">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">{scenario.name}</CardTitle>
                    <Badge className={getDifficultyColor(scenario.difficulty)}>
                      {scenario.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{scenario.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{scenario.duration}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Volatility:</span>
                    <div className="flex items-center gap-1">
                      {getVolatilityIcon(scenario.volatility)}
                      <span className="font-medium capitalize">{scenario.volatility}</span>
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <span className="text-muted-foreground">Expected:</span>
                    <p className="font-medium mt-1">{scenario.expectedOutcome}</p>
                  </div>
                  
                  <Button 
                    className="w-full btn-primary"
                    onClick={() => startScenario(scenario)}
                  >
                    Start Scenario
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="simulation" className="space-y-6">
          {simState.currentScenario ? (
            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{simState.currentScenario.name}</CardTitle>
                    <Button variant="outline" onClick={resetSimulation}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Day {simState.currentDay} of {simState.totalDays}</span>
                    <Progress value={(simState.currentDay / simState.totalDays) * 100} className="w-48" />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold">${simState.portfolio.supplied.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Supplied</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">${simState.portfolio.borrowed.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Borrowed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">${simState.portfolio.netWorth.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Net Worth</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-400">{simState.portfolio.healthFactor.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">Health Factor</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="glass-card">
              <CardContent className="p-8 text-center">
                <PlayCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No Active Simulation</h3>
                <p className="text-muted-foreground">Select a market scenario to begin your simulation</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Simulation Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">Complete a simulation to see your performance results</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SimulatedTradingEnvironment;
