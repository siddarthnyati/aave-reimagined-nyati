import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useLearnMode } from '@/contexts/LearnModeContext';
import AssetWiseSimulation from './AssetWiseSimulation';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Shield, 
  AlertTriangle,
  PlayCircle,
  RotateCcw,
  Trophy,
  Activity,
  BarChart3,
  Pause,
  Play
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

const enhancedMarketScenarios = [
  ...marketScenarios,
  {
    id: 'defi-hack',
    name: 'Protocol Hack Event',
    description: 'Experience a major DeFi protocol hack and learn crisis management. Practice emergency procedures and fund protection.',
    difficulty: 'advanced' as const,
    duration: '14 days',
    volatility: 'high' as const,
    expectedOutcome: 'Learn protocol risk management and emergency responses'
  },
  {
    id: 'interest-shock',
    name: 'Interest Rate Shock',
    description: 'Navigate sudden interest rate changes affecting lending protocols. Learn to adapt to changing yield environments.',
    difficulty: 'intermediate' as const,
    duration: '45 days',
    volatility: 'medium' as const,
    expectedOutcome: 'Understand interest rate risk and adaptation strategies'
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

  const [isSimulationActive, setIsSimulationActive] = useState(false);

  // Enhanced asset positions for detailed simulation
  const [assetPositions, setAssetPositions] = useState([
    {
      symbol: 'ETH',
      name: 'Ethereum',
      supplied: 2.5,
      borrowed: 0,
      supplyAPY: 3.2,
      borrowAPY: 5.8,
      price: 2000,
      liquidationPrice: null,
      healthFactor: 0,
      ltv: 0
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      supplied: 5000,
      borrowed: 0,
      supplyAPY: 4.1,
      borrowAPY: 6.2,
      price: 1,
      liquidationPrice: null,
      healthFactor: 0,
      ltv: 0
    },
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      supplied: 0,
      borrowed: 0.1,
      supplyAPY: 2.8,
      borrowAPY: 4.9,
      price: 35000,
      liquidationPrice: 28000,
      healthFactor: 2.1,
      ltv: 0.6
    }
  ]);

  // Simulation engine - runs the active simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isSimulationActive && simState.currentScenario) {
      interval = setInterval(() => {
        setSimState(prev => {
          if (prev.currentDay >= prev.totalDays) {
            setIsSimulationActive(false);
            return prev;
          }

          const newDay = prev.currentDay + 1;
          const newEvents = [...prev.events];
          
          // Generate market events based on scenario
          if (Math.random() < 0.3) { // 30% chance of event each day
            const eventTypes = getEventTypesForScenario(prev.currentScenario!);
            const randomEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)];
            newEvents.push({
              day: newDay,
              event: randomEvent.description,
              impact: randomEvent.impact
            });

            // Update asset prices based on event
            updateAssetPricesForEvent(randomEvent);
          }

          // Update portfolio values
          const newPortfolio = calculatePortfolioValue();

          return {
            ...prev,
            currentDay: newDay,
            events: newEvents,
            portfolio: newPortfolio
          };
        });
      }, 2000); // Advance one day every 2 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSimulationActive, simState.currentScenario]);

  const getEventTypesForScenario = (scenario: MarketScenario) => {
    const eventMap = {
      'stable-market': [
        { description: 'Minor market adjustment (-2%)', impact: 'neutral' as const },
        { description: 'Positive DeFi news (+1%)', impact: 'positive' as const },
        { description: 'Normal trading volume', impact: 'neutral' as const }
      ],
      'bull-market': [
        { description: 'Major rally (+15%)', impact: 'positive' as const },
        { description: 'Institutional buying surge (+8%)', impact: 'positive' as const },
        { description: 'New ATH reached (+20%)', impact: 'positive' as const },
        { description: 'Small correction (-5%)', impact: 'negative' as const }
      ],
      'bear-market': [
        { description: 'Market crash (-25%)', impact: 'negative' as const },
        { description: 'Liquidation cascade (-15%)', impact: 'negative' as const },
        { description: 'Fear selling continues (-10%)', impact: 'negative' as const },
        { description: 'Dead cat bounce (+5%)', impact: 'positive' as const }
      ],
      'volatility-event': [
        { description: 'Flash crash (-40%)', impact: 'negative' as const },
        { description: 'Massive liquidations (-30%)', impact: 'negative' as const },
        { description: 'Recovery attempt (+15%)', impact: 'positive' as const }
      ],
      'defi-hack': [
        { description: 'Protocol exploit discovered', impact: 'negative' as const },
        { description: 'Emergency withdrawal activated', impact: 'negative' as const },
        { description: 'Governance vote for compensation', impact: 'neutral' as const }
      ],
      'interest-shock': [
        { description: 'Interest rates spike (+3%)', impact: 'negative' as const },
        { description: 'Borrowing costs increase', impact: 'negative' as const },
        { description: 'Lending yields improve', impact: 'positive' as const }
      ]
    };
    
    return eventMap[scenario.id as keyof typeof eventMap] || eventMap['stable-market'];
  };

  const updateAssetPricesForEvent = (event: any) => {
    setAssetPositions(prev => prev.map(asset => {
      let priceChange = 0;
      if (event.impact === 'positive') {
        priceChange = 0.02 + Math.random() * 0.08; // 2-10% increase
      } else if (event.impact === 'negative') {
        priceChange = -(0.05 + Math.random() * 0.15); // 5-20% decrease
      } else {
        priceChange = (Math.random() - 0.5) * 0.04; // -2% to +2%
      }

      return {
        ...asset,
        price: asset.price * (1 + priceChange)
      };
    }));
  };

  const calculatePortfolioValue = () => {
    const totalSupplied = assetPositions.reduce((sum, asset) => 
      sum + (asset.supplied * asset.price), 0
    );
    const totalBorrowed = assetPositions.reduce((sum, asset) => 
      sum + (asset.borrowed * asset.price), 0
    );
    
    return {
      supplied: totalSupplied,
      borrowed: totalBorrowed,
      netWorth: totalSupplied - totalBorrowed,
      healthFactor: totalBorrowed > 0 ? totalSupplied / totalBorrowed : 0
    };
  };

  const startScenario = (scenario: MarketScenario) => {
    setSimState(prev => ({
      ...prev,
      currentScenario: scenario,
      isRunning: true,
      currentDay: 0,
      totalDays: parseInt(scenario.duration.split(' ')[0]),
      events: [],
      portfolio: calculatePortfolioValue()
    }));
    setIsSimulationActive(true);
  };

  const pauseResumeSimulation = () => {
    setIsSimulationActive(!isSimulationActive);
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
    setIsSimulationActive(false);
  };

  const handleAssetSupply = (symbol: string, amount: number) => {
    setAssetPositions(prev => prev.map(asset => 
      asset.symbol === symbol 
        ? { ...asset, supplied: asset.supplied + amount }
        : asset
    ));
  };

  const handleAssetBorrow = (symbol: string, amount: number) => {
    setAssetPositions(prev => prev.map(asset => 
      asset.symbol === symbol 
        ? { ...asset, borrowed: asset.borrowed + amount }
        : asset
    ));
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
            Enhanced DeFi Trading Simulator
          </CardTitle>
          <p className="text-muted-foreground">
            Practice advanced lending and borrowing strategies with detailed asset-wise tracking and realistic market scenarios
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="scenarios" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="scenarios">Market Scenarios</TabsTrigger>
          <TabsTrigger value="simulation">
            Active Simulation
            {isSimulationActive && <Badge className="ml-2 bg-green-500 animate-pulse">LIVE</Badge>}
          </TabsTrigger>
          <TabsTrigger value="assets">Asset Details</TabsTrigger>
          <TabsTrigger value="performance">Performance Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="scenarios" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enhancedMarketScenarios.map((scenario) => (
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
                    disabled={isSimulationActive}
                  >
                    {isSimulationActive ? 'Simulation Running...' : 'Start Scenario'}
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
                    <CardTitle className="flex items-center gap-2">
                      {simState.currentScenario.name}
                      {isSimulationActive && <Badge className="bg-green-500 animate-pulse">LIVE</Badge>}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        onClick={pauseResumeSimulation}
                        disabled={simState.currentDay >= simState.totalDays}
                      >
                        {isSimulationActive ? (
                          <>
                            <Pause className="w-4 h-4 mr-2" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Resume
                          </>
                        )}
                      </Button>
                      <Button variant="outline" onClick={resetSimulation}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Day {simState.currentDay} of {simState.totalDays}</span>
                    <Progress value={(simState.currentDay / simState.totalDays) * 100} className="w-48" />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-500">${simState.portfolio.supplied.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Supplied</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-500">${simState.portfolio.borrowed.toLocaleString()}</p>
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

                  {/* Real-time Events */}
                  {simState.events.length > 0 && (
                    <Card className="bg-muted/20">
                      <CardHeader>
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Activity className="w-4 h-4" />
                          Market Events
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {simState.events.slice(-5).reverse().map((event, index) => (
                            <div key={index} className="flex justify-between items-center text-sm p-2 rounded bg-background/50">
                              <span>Day {event.day}: {event.event}</span>
                              <Badge variant={event.impact === 'positive' ? 'default' : event.impact === 'negative' ? 'destructive' : 'secondary'}>
                                {event.impact}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {simState.currentDay >= simState.totalDays && (
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="pt-6 text-center">
                        <Trophy className="w-12 h-12 mx-auto mb-2 text-green-600" />
                        <h3 className="text-lg font-semibold text-green-800">Simulation Complete!</h3>
                        <p className="text-green-700">Check the Performance tab for detailed results</p>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="glass-card">
              <CardContent className="p-8 text-center">
                <PlayCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No Active Simulation</h3>
                <p className="text-muted-foreground">Select a market scenario to begin your detailed simulation</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="assets" className="space-y-6">
          <AssetWiseSimulation 
            positions={assetPositions}
            onSupply={handleAssetSupply}
            onBorrow={handleAssetBorrow}
          />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Performance Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-500">
                    {simState.portfolio.netWorth > 10000 ? '+' : ''}
                    {((simState.portfolio.netWorth - 10000) / 10000 * 100).toFixed(1)}%
                  </p>
                  <p className="text-sm text-muted-foreground">Total Return</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-500">
                    {simState.portfolio.healthFactor > 0 ? simState.portfolio.healthFactor.toFixed(2) : '∞'}
                  </p>
                  <p className="text-sm text-muted-foreground">Current Health Factor</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-500">{simState.events.length}</p>
                  <p className="text-sm text-muted-foreground">Market Events</p>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <h4 className="font-semibold">Asset Performance Breakdown</h4>
                {assetPositions.map((asset) => {
                  const netReturn = (asset.supplied * asset.supplyAPY) - (asset.borrowed * asset.borrowAPY);
                  const totalValue = (asset.supplied - asset.borrowed) * asset.price;
                  return (
                    <div key={asset.symbol} className="flex justify-between items-center p-3 bg-muted/20 rounded">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {asset.symbol[0]}
                        </div>
                        <span className="font-medium">{asset.symbol}</span>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${totalValue >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          ${totalValue.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ${asset.price.toFixed(2)} per token
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SimulatedTradingEnvironment;
