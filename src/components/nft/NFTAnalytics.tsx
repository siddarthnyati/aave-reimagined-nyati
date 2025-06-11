
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, AlertTriangle } from 'lucide-react';

const NFTAnalytics = () => {
  return (
    <div className="space-y-4 mt-4">
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardContent className="p-4">
            <h4 className="font-semibold mb-2">Price Performance</h4>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-500">+15.3% vs floor price</span>
            </div>
            <div className="flex items-center gap-2 text-sm mt-1">
              <span className="text-muted-foreground">Last sale: 14.2 ETH (2 days ago)</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h4 className="font-semibold mb-2">Loan Risk Assessment</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Liquidity Score</span>
                <span className="text-sm font-semibold text-green-500">8.2/10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Collection Health</span>
                <span className="text-sm font-semibold text-green-500">Strong</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Default Risk</span>
                <span className="text-sm font-semibold text-yellow-500">Low-Medium</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h4 className="font-semibold mb-2 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Risk Factors
            </h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Collection floor price volatility: Medium</li>
              <li>• Previous default in loan history</li>
              <li>• Trait rarity could affect liquidity</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NFTAnalytics;
