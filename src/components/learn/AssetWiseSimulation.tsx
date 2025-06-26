
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign } from 'lucide-react';

interface AssetPosition {
  symbol: string;
  name: string;
  supplied: number;
  borrowed: number;
  supplyAPY: number;
  borrowAPY: number;
  price: number;
  liquidationPrice: number | null;
  healthFactor: number;
  ltv: number;
}

interface AssetWiseSimulationProps {
  positions: AssetPosition[];
  onSupply: (symbol: string, amount: number) => void;
  onBorrow: (symbol: string, amount: number) => void;
}

const AssetWiseSimulation = ({ positions, onSupply, onBorrow }: AssetWiseSimulationProps) => {
  const [selectedAsset, setSelectedAsset] = useState<string>('');

  const getHealthFactorColor = (factor: number) => {
    if (factor >= 2) return 'text-green-500';
    if (factor >= 1.5) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getRiskLevel = (ltv: number) => {
    if (ltv < 0.5) return { level: 'Low', color: 'bg-green-500/20 text-green-400' };
    if (ltv < 0.7) return { level: 'Medium', color: 'bg-yellow-500/20 text-yellow-400' };
    return { level: 'High', color: 'bg-red-500/20 text-red-400' };
  };

  return (
    <div className="space-y-4">
      {positions.map((position) => {
        const netEarnings = (position.supplied * position.supplyAPY / 100) - (position.borrowed * position.borrowAPY / 100);
        const risk = getRiskLevel(position.ltv);
        
        return (
          <Card key={position.symbol} className="glass-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {position.symbol[0]}
                  </div>
                  {position.name}
                </CardTitle>
                <Badge className={risk.color}>
                  {risk.level} Risk
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Supplied</p>
                  <p className="text-lg font-bold text-green-500">
                    {position.supplied.toFixed(4)} {position.symbol}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ${(position.supplied * position.price).toLocaleString()}
                  </p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Borrowed</p>
                  <p className="text-lg font-bold text-orange-500">
                    {position.borrowed.toFixed(4)} {position.symbol}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ${(position.borrowed * position.price).toLocaleString()}
                  </p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Net APY</p>
                  <p className={`text-lg font-bold ${netEarnings >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {netEarnings >= 0 ? '+' : ''}{(netEarnings / (position.supplied * position.price) * 100).toFixed(2)}%
                  </p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Health Factor</p>
                  <p className={`text-lg font-bold ${getHealthFactorColor(position.healthFactor)}`}>
                    {position.healthFactor > 0 ? position.healthFactor.toFixed(2) : '∞'}
                  </p>
                </div>
              </div>

              {position.borrowed > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Liquidation Risk</span>
                    <span className="text-sm font-medium">
                      LTV: {(position.ltv * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={position.ltv * 100} className="h-2" />
                  {position.liquidationPrice && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Liquidation at ${position.liquidationPrice.toFixed(2)}
                    </p>
                  )}
                </div>
              )}

              <div className="flex justify-between items-center pt-2 border-t">
                <div className="text-sm">
                  <span className="text-muted-foreground">Annual Earnings: </span>
                  <span className={`font-medium ${netEarnings >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    ${netEarnings.toFixed(2)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setSelectedAsset(position.symbol)}
                  >
                    Manage Position
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AssetWiseSimulation;
