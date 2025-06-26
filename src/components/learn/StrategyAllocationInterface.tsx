
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useWallet } from '@/contexts/WalletContext';
import { useToast } from '@/hooks/use-toast';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Play, Pause, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';

interface StrategyAllocationProps {
  strategyName: string;
  strategyDescription: string;
  isActive: boolean;
  onToggle: (active: boolean, allocation: number) => void;
}

const StrategyAllocationInterface = ({ 
  strategyName, 
  strategyDescription, 
  isActive, 
  onToggle 
}: StrategyAllocationProps) => {
  const { balance } = useWallet();
  const { toast } = useToast();
  const [showAllocationDialog, setShowAllocationDialog] = useState(false);
  const [allocation, setAllocation] = useState([50]);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPortfolioValue = Object.entries(balance).reduce((sum, [symbol, amount]) => {
    const prices = { ETH: 2000, USDC: 1, BTC: 35000, LINK: 15, UNI: 8, AAVE: 80 };
    return sum + (amount * (prices[symbol as keyof typeof prices] || 1));
  }, 0);

  const allocatedValue = totalPortfolioValue * (allocation[0] / 100);
  const estimatedAPY = 8.4;
  const estimatedYearlyReturn = allocatedValue * (estimatedAPY / 100);

  const pieData = [
    { name: 'Allocated to Strategy', value: allocation[0], color: '#3b82f6' },
    { name: 'Remaining Portfolio', value: 100 - allocation[0], color: '#6b7280' }
  ];

  const assetAllocation = Object.entries(balance).map(([symbol, amount]) => {
    const prices = { ETH: 2000, USDC: 1, BTC: 35000, LINK: 15, UNI: 8, AAVE: 80 };
    const value = amount * (prices[symbol as keyof typeof prices] || 1);
    const allocatedAmount = (value / totalPortfolioValue) * (allocation[0] / 100) * amount;
    
    return {
      symbol,
      totalAmount: amount,
      allocatedAmount,
      allocatedValue: allocatedAmount * (prices[symbol as keyof typeof prices] || 1),
      percentage: (value / totalPortfolioValue) * 100
    };
  }).filter(asset => asset.allocatedAmount > 0);

  const handleActivate = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setShowAllocationDialog(false);
    onToggle(true, allocation[0]);
    
    toast({
      title: "🎉 Strategy Activated!",
      description: `${strategyName} is now managing ${allocation[0]}% of your portfolio (${allocatedValue.toLocaleString()} USDC equivalent)`,
    });
  };

  const handleDeactivate = () => {
    onToggle(false, 0);
    toast({
      title: "Strategy Paused",
      description: `${strategyName} has been deactivated and will stop managing your assets.`,
    });
  };

  const getStrategyImplications = () => {
    const implications = [
      `This strategy will automatically supply ${allocation[0]}% of your portfolio to lending pools`,
      `Your assets will be rebalanced across multiple DeFi protocols for optimal yield`,
      `Expected annual return: $${estimatedYearlyReturn.toFixed(0)} (${estimatedAPY}% APY)`,
      `Strategy will monitor and adjust positions based on market conditions`,
      `You can pause or adjust allocation at any time`
    ];
    return implications;
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{strategyName}</h3>
          <p className="text-sm text-muted-foreground mb-2">{strategyDescription}</p>
          {isActive && (
            <Badge variant="default" className="bg-green-500/20 text-green-400">
              Active - {allocation[0]}% Allocated
            </Badge>
          )}
        </div>
        
        <Button
          onClick={isActive ? handleDeactivate : () => setShowAllocationDialog(true)}
          variant={isActive ? "destructive" : "default"}
          className="flex items-center gap-2"
        >
          {isActive ? (
            <>
              <Pause className="w-4 h-4" />
              Pause Strategy
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Activate Strategy
            </>
          )}
        </Button>
      </div>

      <Dialog open={showAllocationDialog} onOpenChange={setShowAllocationDialog}>
        <DialogContent className="glass-card max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Configure {strategyName}
            </DialogTitle>
            <DialogDescription>
              Set your portfolio allocation and review strategy implications
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Allocation Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Portfolio Allocation</label>
                <span className="text-2xl font-bold text-primary">{allocation[0]}%</span>
              </div>
              <Slider
                value={allocation}
                onValueChange={setAllocation}
                max={100}
                min={10}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Conservative (10%)</span>
                <span>Moderate (50%)</span>
                <span>Aggressive (100%)</span>
              </div>
            </div>

            {/* Portfolio Visualization */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Allocation Breakdown</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div>
                <h4 className="font-medium mb-3">Asset Allocation</h4>
                <div className="space-y-2">
                  {assetAllocation.map((asset) => (
                    <div key={asset.symbol} className="flex justify-between items-center p-2 bg-muted/20 rounded">
                      <span className="font-medium">{asset.symbol}</span>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {asset.allocatedAmount.toFixed(4)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ${asset.allocatedValue.toFixed(0)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Strategy Implications */}
            <Card className="border-blue-500/30 bg-blue-500/5">
              <CardContent className="p-4">
                <h4 className="font-medium text-blue-500 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Strategy Implications
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {getStrategyImplications().map((implication, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      {implication}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Expected Returns */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-muted/20 rounded-lg">
              <div className="text-center">
                <DollarSign className="w-6 h-6 mx-auto mb-1 text-green-500" />
                <p className="text-sm font-medium">Allocated Value</p>
                <p className="text-lg font-bold">${allocatedValue.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-6 h-6 mx-auto mb-1 text-blue-500" />
                <p className="text-sm font-medium">Expected APY</p>
                <p className="text-lg font-bold text-blue-500">{estimatedAPY}%</p>
              </div>
              <div className="text-center">
                <DollarSign className="w-6 h-6 mx-auto mb-1 text-green-500" />
                <p className="text-sm font-medium">Yearly Return</p>
                <p className="text-lg font-bold text-green-500">${estimatedYearlyReturn.toFixed(0)}</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowAllocationDialog(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleActivate}
              disabled={isProcessing}
              className="btn-primary"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Activating...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Activate Strategy
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StrategyAllocationInterface;
