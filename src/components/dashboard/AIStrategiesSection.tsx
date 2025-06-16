
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useWallet } from '@/contexts/WalletContext';
import { 
  Bot, 
  TrendingUp, 
  Shield, 
  Zap, 
  Target,
  BarChart3,
  Settings,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AIStrategiesSection = () => {
  const { balance } = useWallet();
  const { toast } = useToast();
  const [activeStrategies, setActiveStrategies] = useState<string[]>([]);

  const strategies = [
    {
      id: 'conservative',
      name: 'Conservative Rebalancing',
      description: 'Low-risk strategy focusing on stable yields',
      allocation: { USDC: 50, DAI: 30, ETH: 20 },
      apy: '5.2%',
      risk: 'Low',
      active: activeStrategies.includes('conservative')
    },
    {
      id: 'balanced',
      name: 'Balanced Growth',
      description: 'Moderate risk with optimized yield opportunities',
      allocation: { ETH: 40, USDC: 35, BTC: 15, LINK: 10 },
      apy: '8.7%',
      risk: 'Medium',
      active: activeStrategies.includes('balanced')
    },
    {
      id: 'aggressive',
      name: 'Aggressive Yield',
      description: 'High-yield farming with dynamic rebalancing',
      allocation: { ETH: 35, UNI: 25, AAVE: 20, LINK: 20 },
      apy: '12.4%',
      risk: 'High',
      active: activeStrategies.includes('aggressive')
    }
  ];

  const automationFeatures = [
    {
      name: 'Auto Supply',
      description: 'Automatically supply idle assets to highest yield pools',
      enabled: true,
      savings: '+$2,340'
    },
    {
      name: 'Smart Rebalancing',
      description: 'Rebalance portfolio when allocation drifts >5%',
      enabled: true,
      savings: '+$1,890'
    },
    {
      name: 'Liquidation Protection',
      description: 'Auto-repay loans when health factor drops below 1.5',
      enabled: true,
      savings: 'Risk Protected'
    },
    {
      name: 'Yield Optimization',
      description: 'Move funds to better opportunities across protocols',
      enabled: false,
      savings: 'Potential +$980'
    }
  ];

  const toggleStrategy = (strategyId: string) => {
    if (activeStrategies.includes(strategyId)) {
      setActiveStrategies(prev => prev.filter(id => id !== strategyId));
      toast({
        title: "Strategy Disabled",
        description: `${strategies.find(s => s.id === strategyId)?.name} has been disabled.`,
      });
    } else {
      setActiveStrategies(prev => [...prev, strategyId]);
      toast({
        title: "Strategy Activated",
        description: `${strategies.find(s => s.id === strategyId)?.name} is now active.`,
      });
    }
  };

  const currentAllocation = {
    ETH: 35,
    USDC: 40,
    BTC: 15,
    LINK: 10
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            AI Strategies
          </h2>
          <p className="text-muted-foreground">
            Automated portfolio management and yield optimization
          </p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Active Strategies: {activeStrategies.length}
        </Badge>
      </div>

      <Tabs defaultValue="rebalancing" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="rebalancing">Rebalancing</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="rebalancing" className="space-y-6">
          {/* Current vs Target Allocation */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Portfolio Allocation
              </CardTitle>
              <CardDescription>
                Current allocation vs recommended targets
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(currentAllocation).map(([asset, percentage]) => (
                <div key={asset} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{asset}</span>
                    <span>{percentage}%</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              ))}
              <Button className="w-full mt-4">
                <RefreshCw className="w-4 h-4 mr-2" />
                Rebalance Now
              </Button>
            </CardContent>
          </Card>

          {/* Strategy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {strategies.map((strategy) => (
              <Card key={strategy.id} className={`glass-card ${strategy.active ? 'ring-2 ring-primary' : ''}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{strategy.name}</CardTitle>
                      <CardDescription>{strategy.description}</CardDescription>
                    </div>
                    <Badge variant={strategy.risk === 'Low' ? 'secondary' : strategy.risk === 'Medium' ? 'default' : 'destructive'}>
                      {strategy.risk}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Expected APY</span>
                    <span className="font-bold text-green-600">{strategy.apy}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Target Allocation</h4>
                    {Object.entries(strategy.allocation).map(([asset, percentage]) => (
                      <div key={asset} className="flex justify-between text-xs">
                        <span>{asset}</span>
                        <span>{percentage}%</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    onClick={() => toggleStrategy(strategy.id)}
                    variant={strategy.active ? 'destructive' : 'default'}
                    className="w-full"
                  >
                    {strategy.active ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Stop Strategy
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Activate Strategy
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {automationFeatures.map((feature, index) => (
              <Card key={index} className="glass-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{feature.name}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </div>
                    <Badge variant={feature.enabled ? 'default' : 'secondary'}>
                      {feature.enabled ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Impact</span>
                    <span className={`font-bold ${feature.savings.includes('+') ? 'text-green-600' : 'text-blue-600'}`}>
                      {feature.savings}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total AI Savings</span>
                  <span className="font-bold text-green-600">+$12,450</span>
                </div>
                <div className="flex justify-between">
                  <span>Gas Optimized</span>
                  <span className="font-bold text-blue-600">-$340</span>
                </div>
                <div className="flex justify-between">
                  <span>Risk Mitigated</span>
                  <span className="font-bold text-orange-600">$8,900</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Risk Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Portfolio Health</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">Excellent</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Liquidation Risk</span>
                  <Badge variant="secondary">Low</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Diversification Score</span>
                  <span className="font-bold">8.7/10</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                AI Strategy Settings
              </CardTitle>
              <CardDescription>
                Configure your automated trading preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Rebalancing Threshold</label>
                <div className="text-sm text-muted-foreground">Trigger rebalancing when allocation drifts by:</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">3%</Button>
                  <Button variant="default" size="sm">5%</Button>
                  <Button variant="outline" size="sm">10%</Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Risk Tolerance</label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Conservative</Button>
                  <Button variant="default" size="sm">Moderate</Button>
                  <Button variant="outline" size="sm">Aggressive</Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Gas Price Limit</label>
                <div className="text-sm text-muted-foreground">Only execute transactions below:</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">20 Gwei</Button>
                  <Button variant="default" size="sm">30 Gwei</Button>
                  <Button variant="outline" size="sm">50 Gwei</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIStrategiesSection;
