import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp, Zap, Target, DollarSign, Clock, AlertCircle, CheckCircle } from 'lucide-react';

interface PortfolioItem {
  symbol: string;
  name: string;
  current: number;
  target: number;
  value: number;
  change: number;
}

const AIStrategiesSection = () => {
  const { toast } = useToast();
  const [showRebalanceModal, setShowRebalanceModal] = useState(false);
  const [isRebalancing, setIsRebalancing] = useState(false);

  const portfolioData: PortfolioItem[] = [
    { symbol: 'BTC', name: 'Bitcoin', current: 45, target: 40, value: 45000, change: -5 },
    { symbol: 'ETH', name: 'Ethereum', current: 25, target: 30, value: 25000, change: 5 },
    { symbol: 'USDC', name: 'USD Coin', current: 15, target: 15, value: 15000, change: 0 },
    { symbol: 'SOL', name: 'Solana', current: 10, target: 10, value: 10000, change: 0 },
    { symbol: 'LINK', name: 'Chainlink', current: 5, target: 5, value: 5000, change: 0 }
  ];

  const totalValue = portfolioData.reduce((sum, item) => sum + item.value, 0);
  const estimatedCost = 45.50;
  const estimatedTime = '2-5 minutes';
  const projectedYieldChange = '+0.3%';

  const handleRebalance = () => {
    setShowRebalanceModal(true);
  };

  const handleActivateRebalance = async () => {
    setIsRebalancing(true);
    
    // Simulate rebalancing process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsRebalancing(false);
    setShowRebalanceModal(false);
    
    toast({
      title: "Portfolio Rebalanced Successfully",
      description: "Your portfolio has been optimized according to your target allocation.",
    });
  };

  const getProgressColor = (change: number) => {
    if (change === 0) return 'bg-green-500';
    return Math.abs(change) > 3 ? 'bg-red-500' : 'bg-yellow-500';
  };

  return (
    <div className="space-y-8">
      {/* AI Strategies Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Active Strategies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">3</p>
            <p className="text-sm text-muted-foreground">Running optimizations</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Total Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">$2,340</p>
            <p className="text-sm text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Performance Boost</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">+12.4%</p>
            <p className="text-sm text-muted-foreground">vs manual trading</p>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Rebalancing Tool */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Portfolio Rebalancing
              </CardTitle>
              <CardDescription>
                AI-powered portfolio optimization based on your risk profile and market conditions
              </CardDescription>
            </div>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
              <AlertCircle className="w-3 h-3 mr-1" />
              Rebalance Recommended
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {portfolioData.map((item) => (
              <div key={item.symbol} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {item.symbol[0]}
                    </div>
                    <div>
                      <p className="font-medium">{item.symbol}</p>
                      <p className="text-sm text-muted-foreground">{item.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${item.value.toLocaleString()}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{item.current}% → {item.target}%</span>
                      {item.change !== 0 && (
                        <Badge variant={item.change > 0 ? "default" : "secondary"} className="text-xs">
                          {item.change > 0 ? '+' : ''}{item.change}%
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={item.current} 
                    className="flex-1 h-2" 
                  />
                  <span className="text-xs text-muted-foreground w-12">{item.current}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="space-y-1">
              <p className="text-sm font-medium">Rebalancing Impact</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Cost: ${estimatedCost}</span>
                <span>Time: {estimatedTime}</span>
                <span className="text-green-600">Yield: {projectedYieldChange}</span>
              </div>
            </div>
            <Button onClick={handleRebalance} className="btn-primary">
              <Target className="w-4 h-4 mr-2" />
              Rebalance Portfolio
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Rebalance Confirmation Modal */}
      <Dialog open={showRebalanceModal} onOpenChange={setShowRebalanceModal}>
        <DialogContent className="glass-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Confirm Portfolio Rebalancing
            </DialogTitle>
            <DialogDescription>
              Review the proposed changes before activating the rebalancing strategy.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-semibold">Proposed Changes:</h4>
              {portfolioData.filter(item => item.change !== 0).map((item) => (
                <div key={item.symbol} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.symbol}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.current}% → {item.target}%
                    </span>
                  </div>
                  <Badge variant={item.change > 0 ? "default" : "secondary"}>
                    {item.change > 0 ? 'Buy' : 'Sell'} ${Math.abs(item.change * totalValue / 100).toLocaleString()}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="text-center">
                <DollarSign className="w-6 h-6 mx-auto mb-1 text-muted-foreground" />
                <p className="text-sm font-medium">Estimated Cost</p>
                <p className="text-lg font-bold">${estimatedCost}</p>
              </div>
              <div className="text-center">
                <Clock className="w-6 h-6 mx-auto mb-1 text-muted-foreground" />
                <p className="text-sm font-medium">Time to Complete</p>
                <p className="text-lg font-bold">{estimatedTime}</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-6 h-6 mx-auto mb-1 text-green-500" />
                <p className="text-sm font-medium">Yield Impact</p>
                <p className="text-lg font-bold text-green-600">{projectedYieldChange}</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowRebalanceModal(false)}
              disabled={isRebalancing}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleActivateRebalance}
              disabled={isRebalancing}
              className="btn-primary"
            >
              {isRebalancing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Rebalancing...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Activate Rebalancing
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Other AI Strategy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Yield Optimization
            </CardTitle>
            <CardDescription>
              Automatically move funds to highest yielding protocols
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current APY</p>
                <p className="text-2xl font-bold text-green-600">8.4%</p>
              </div>
              <Badge className="bg-green-100 text-green-700">
                <CheckCircle className="w-3 h-3 mr-1" />
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Smart Liquidation Protection
            </CardTitle>
            <CardDescription>
              AI monitors and protects against liquidation risks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Health Factor</p>
                <p className="text-2xl font-bold text-blue-600">2.4</p>
              </div>
              <Badge className="bg-blue-100 text-blue-700">
                <CheckCircle className="w-3 h-3 mr-1" />
                Protected
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIStrategiesSection;
