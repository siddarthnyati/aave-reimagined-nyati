
import { Button } from '@/components/ui/button';
import { Plus, ArrowUpRight } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';

interface SuppliedAsset {
  symbol: string;
  name: string;
  icon: string;
  suppliedBalance: string;
  walletBalance: number;
  apy: number;
  value: string;
}

const SupplySection = () => {
  const { balance } = useWallet();

  const suppliedAssets: SuppliedAsset[] = [
    {
      symbol: 'USDC',
      name: 'USD Coin',
      icon: '💵',
      suppliedBalance: '12,500.00',
      walletBalance: balance.USDC || 0,
      apy: 8.25,
      value: '$12,500.00'
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      icon: '⟠',
      suppliedBalance: '4.25',
      walletBalance: balance.ETH || 0,
      apy: 4.15,
      value: '$13,600.00'
    }
  ];

  const availableAssets = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      icon: '₿',
      walletBalance: balance.BTC || 0,
      apy: 3.8,
      price: 65000
    },
    {
      symbol: 'LINK',
      name: 'Chainlink',
      icon: '🔗',
      walletBalance: balance.LINK || 0,
      apy: 9.2,
      price: 15
    },
    {
      symbol: 'UNI',
      name: 'Uniswap',
      icon: '🦄',
      walletBalance: balance.UNI || 0,
      apy: 12.5,
      price: 8
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

      {/* Supplied Assets */}
      <div className="space-y-4 mb-6">
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
              <div className="font-semibold">{asset.suppliedBalance} {asset.symbol}</div>
              <div className="text-sm text-muted-foreground">
                Wallet: {asset.walletBalance.toFixed(2)} {asset.symbol}
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-primary font-semibold">{asset.apy}% APY</div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors ml-auto" />
            </div>
          </div>
        ))}
      </div>

      {/* Available to Supply */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Available to Supply</h3>
        <div className="space-y-2">
          {availableAssets.map((asset, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
              <div className="flex items-center space-x-3">
                <span className="text-lg">{asset.icon}</span>
                <div>
                  <div className="font-medium text-sm">{asset.symbol}</div>
                  <div className="text-xs text-muted-foreground">{asset.name}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-semibold">
                  {asset.walletBalance.toFixed(asset.symbol === 'BTC' ? 3 : 0)} {asset.symbol}
                </div>
                <div className="text-xs text-muted-foreground">
                  ${(asset.walletBalance * asset.price).toLocaleString()}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-primary font-semibold">{asset.apy}% APY</div>
                <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  Supply
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {suppliedAssets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No assets supplied yet</p>
          <Button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Start Earning
          </Button>
        </div>
      )}
    </div>
  );
};

export default SupplySection;
