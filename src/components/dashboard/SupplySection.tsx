
import { Button } from '@/components/ui/button';
import { Plus, ArrowUpRight } from 'lucide-react';

interface SuppliedAsset {
  symbol: string;
  name: string;
  icon: string;
  balance: string;
  apy: number;
  value: string;
}

const SupplySection = () => {
  const suppliedAssets: SuppliedAsset[] = [
    {
      symbol: 'ETH',
      name: 'Ethereum',
      icon: '🔷',
      balance: '12.5',
      apy: 4.25,
      value: '$23,456.78'
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      icon: '💵',
      balance: '45,678.90',
      apy: 8.45,
      value: '$45,678.90'
    },
    {
      symbol: 'LINK',
      name: 'Chainlink',
      icon: '🔗',
      balance: '1,234.56',
      apy: 12.35,
      value: '$20,098.88'
    }
  ];

  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Your Supplies</h2>
        <Button className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Supply
        </Button>
      </div>

      <div className="space-y-4">
        {suppliedAssets.map((asset, index) => (
          <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{asset.icon}</span>
              <div>
                <div className="font-semibold">{asset.symbol}</div>
                <div className="text-sm text-muted-foreground">{asset.name}</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-semibold">{asset.balance} {asset.symbol}</div>
              <div className="text-sm text-muted-foreground">{asset.value}</div>
            </div>
            
            <div className="text-right">
              <div className="text-primary font-semibold">{asset.apy}% APY</div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors ml-auto" />
            </div>
          </div>
        ))}
      </div>

      {suppliedAssets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No assets supplied yet</p>
          <Button className="btn-secondary">
            <Plus className="w-4 h-4 mr-2" />
            Start Earning
          </Button>
        </div>
      )}
    </div>
  );
};

export default SupplySection;
