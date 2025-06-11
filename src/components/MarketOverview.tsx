
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Asset {
  symbol: string;
  name: string;
  icon: string;
  supplyAPY: number;
  borrowAPY: number;
  totalSupply: string;
  totalBorrow: string;
  trend: 'up' | 'down';
}

const assets: Asset[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    icon: '🔷',
    supplyAPY: 4.25,
    borrowAPY: 6.75,
    totalSupply: '$1.2B',
    totalBorrow: '$892M',
    trend: 'up'
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    icon: '₿',
    supplyAPY: 3.15,
    borrowAPY: 5.25,
    totalSupply: '$856M',
    totalBorrow: '$645M',
    trend: 'up'
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    icon: '💵',
    supplyAPY: 8.45,
    borrowAPY: 12.15,
    totalSupply: '$2.1B',
    totalBorrow: '$1.8B',
    trend: 'down'
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    icon: '💰',
    supplyAPY: 7.85,
    borrowAPY: 11.25,
    totalSupply: '$1.9B',
    totalBorrow: '$1.5B',
    trend: 'up'
  },
  {
    symbol: 'LINK',
    name: 'Chainlink',
    icon: '🔗',
    supplyAPY: 12.35,
    borrowAPY: 18.45,
    totalSupply: '$245M',
    totalBorrow: '$189M',
    trend: 'up'
  },
  {
    symbol: 'UNI',
    name: 'Uniswap',
    icon: '🦄',
    supplyAPY: 15.25,
    borrowAPY: 22.75,
    totalSupply: '$156M',
    totalBorrow: '$98M',
    trend: 'down'
  }
];

const MarketOverview = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-black/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Live Markets</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time lending and borrowing rates across major crypto assets
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="text-left p-6 font-semibold">Asset</th>
                  <th className="text-left p-6 font-semibold">Supply APY</th>
                  <th className="text-left p-6 font-semibold">Borrow APY</th>
                  <th className="text-left p-6 font-semibold">Total Supply</th>
                  <th className="text-left p-6 font-semibold">Total Borrow</th>
                  <th className="text-left p-6 font-semibold">Trend</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset, index) => (
                  <tr key={asset.symbol} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="p-6">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{asset.icon}</span>
                        <div>
                          <div className="font-semibold">{asset.symbol}</div>
                          <div className="text-sm text-muted-foreground">{asset.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="text-primary font-semibold text-lg">{asset.supplyAPY}%</span>
                    </td>
                    <td className="p-6">
                      <span className="text-orange-400 font-semibold text-lg">{asset.borrowAPY}%</span>
                    </td>
                    <td className="p-6 font-medium">{asset.totalSupply}</td>
                    <td className="p-6 font-medium">{asset.totalBorrow}</td>
                    <td className="p-6">
                      {asset.trend === 'up' ? (
                        <TrendingUp className="w-5 h-5 text-primary" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-400" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden grid gap-4">
          {assets.map((asset, index) => (
            <div key={asset.symbol} className="asset-card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{asset.icon}</span>
                  <div>
                    <div className="font-semibold">{asset.symbol}</div>
                    <div className="text-sm text-muted-foreground">{asset.name}</div>
                  </div>
                </div>
                {asset.trend === 'up' ? (
                  <TrendingUp className="w-5 h-5 text-primary" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-400" />
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Supply APY</div>
                  <div className="text-primary font-semibold text-lg">{asset.supplyAPY}%</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Borrow APY</div>
                  <div className="text-orange-400 font-semibold text-lg">{asset.borrowAPY}%</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Total Supply</div>
                  <div className="font-medium">{asset.totalSupply}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Total Borrow</div>
                  <div className="font-medium">{asset.totalBorrow}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketOverview;
