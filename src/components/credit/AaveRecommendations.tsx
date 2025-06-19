
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, ArrowRight, Zap, Shield } from 'lucide-react';

const AaveRecommendations = () => {
  const recommendations = [
    {
      token: 'BTC',
      amount: '$142.85',
      rawAmount: '0.0048 BTC',
      strategy: 'Convert to WBTC & Supply to Aave',
      apy: '4.2%',
      risk: 'Low',
      potential: '$6.01/year',
      icon: '₿',
      color: 'text-orange-400',
      source: 'CB',
      sourceColor: 'bg-blue-600 text-white',
      sourcePlatform: 'Coinbase Card'
    },
    {
      token: 'CRO',
      amount: '$67.23',
      rawAmount: '1,247 CRO',
      strategy: 'Convert to USDC & Supply',
      apy: '6.2%',
      risk: 'Low',
      potential: '$4.17/year',
      icon: '💎',
      color: 'text-blue-400',
      source: 'CDC',
      sourceColor: 'bg-indigo-600 text-white',
      sourcePlatform: 'Crypto.com Card'
    },
    {
      token: 'BNB',
      amount: '$27.44',
      rawAmount: '0.089 BNB',
      strategy: 'Supply to Liquidity Pool',
      apy: '8.1%',
      risk: 'Medium',
      potential: '$2.22/year',
      icon: '🟡',
      color: 'text-yellow-400',
      source: 'BNB',
      sourceColor: 'bg-yellow-500 text-black',
      sourcePlatform: 'Binance Card'
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'High': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-4">
      {recommendations.map((rec) => (
        <Card key={rec.token} className="bg-gradient-to-r from-background/50 to-background/30 border-border/50 hover:border-primary/30 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`text-2xl ${rec.color}`}>{rec.icon}</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{rec.amount} <span className="text-sm text-muted-foreground">({rec.rawAmount})</span></h4>
                    <div className={`w-6 h-6 rounded ${rec.sourceColor} flex items-center justify-center text-xs font-bold`} title={`Source: ${rec.sourcePlatform}`}>
                      {rec.source}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{rec.strategy}</p>
                  <p className="text-xs text-muted-foreground">Source: {rec.sourcePlatform}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {rec.apy} APY
                  </Badge>
                  <Badge variant="outline" className={getRiskColor(rec.risk)}>
                    <Shield className="w-3 h-3 mr-1" />
                    {rec.risk}
                  </Badge>
                </div>
                <p className="text-xs text-green-400 font-medium">+{rec.potential} potential</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button size="sm" className="btn-primary">
                  <Zap className="w-3 h-3 mr-1" />
                  Auto-Optimize
                </Button>
                <Button size="sm" variant="outline" className="btn-secondary">
                  Manual
                </Button>
              </div>
              <Button size="sm" variant="ghost" className="text-primary hover:text-primary/80">
                Details <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/5 to-blue-400/5 border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold">Total Optimization Potential</h4>
            <p className="text-sm text-muted-foreground">If all recommendations are followed</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold gradient-text">+$12.40/year</p>
            <p className="text-sm text-green-400">5.2% average APY</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AaveRecommendations;
