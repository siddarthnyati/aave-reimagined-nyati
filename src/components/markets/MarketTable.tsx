
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MarketAsset {
  symbol: string;
  name: string;
  icon: string;
  totalSupply: string;
  supplyAPY: number;
  totalBorrow: string;
  borrowAPY: number;
  liquidity: string;
  price: string;
  priceChange: number;
  utilization: number;
}

const MarketTable = () => {
  const assets: MarketAsset[] = [
    {
      symbol: 'ETH',
      name: 'Ethereum',
      icon: '🔷',
      totalSupply: '$1.2B',
      supplyAPY: 4.25,
      totalBorrow: '$892M',
      borrowAPY: 6.75,
      liquidity: '$308M',
      price: '$1,650.42',
      priceChange: 2.5,
      utilization: 74.3
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      icon: '💵',
      totalSupply: '$2.1B',
      supplyAPY: 8.45,
      totalBorrow: '$1.8B',
      borrowAPY: 12.15,
      liquidity: '$300M',
      price: '$1.00',
      priceChange: 0.1,
      utilization: 85.7
    },
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      icon: '₿',
      totalSupply: '$856M',
      supplyAPY: 3.15,
      totalBorrow: '$645M',
      borrowAPY: 5.25,
      liquidity: '$211M',
      price: '$34,257.89',
      priceChange: -1.2,
      utilization: 75.4
    },
    {
      symbol: 'LINK',
      name: 'Chainlink',
      icon: '🔗',
      totalSupply: '$245M',
      supplyAPY: 12.35,
      totalBorrow: '$189M',
      borrowAPY: 18.45,
      liquidity: '$56M',
      price: '$16.25',
      priceChange: 5.8,
      utilization: 77.1
    },
    {
      symbol: 'UNI',
      name: 'Uniswap',
      icon: '🦄',
      totalSupply: '$156M',
      supplyAPY: 15.25,
      totalBorrow: '$98M',
      borrowAPY: 22.75,
      liquidity: '$58M',
      price: '$8.94',
      priceChange: -3.4,
      utilization: 62.8
    }
  ];

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="text-left p-6 font-semibold">Asset</th>
              <th className="text-left p-6 font-semibold">Price</th>
              <th className="text-left p-6 font-semibold">Total Supply</th>
              <th className="text-left p-6 font-semibold">Supply APY</th>
              <th className="text-left p-6 font-semibold">Total Borrow</th>
              <th className="text-left p-6 font-semibold">Borrow APY</th>
              <th className="text-left p-6 font-semibold">Utilization</th>
              <th className="text-left p-6 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, index) => (
              <tr key={asset.symbol} className="border-b border-white/5 hover:bg-white/5 transition-colors">
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
                  <div>
                    <div className="font-medium">{asset.price}</div>
                    <div className={`text-sm flex items-center ${asset.priceChange >= 0 ? 'text-primary' : 'text-red-400'}`}>
                      {asset.priceChange >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                      {Math.abs(asset.priceChange)}%
                    </div>
                  </div>
                </td>
                <td className="p-6 font-medium">{asset.totalSupply}</td>
                <td className="p-6">
                  <span className="text-primary font-semibold text-lg">{asset.supplyAPY}%</span>
                </td>
                <td className="p-6 font-medium">{asset.totalBorrow}</td>
                <td className="p-6">
                  <span className="text-orange-400 font-semibold text-lg">{asset.borrowAPY}%</span>
                </td>
                <td className="p-6">
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${asset.utilization}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{asset.utilization}%</div>
                </td>
                <td className="p-6">
                  <div className="flex space-x-2">
                    <Button size="sm" className="btn-primary">
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                      Supply
                    </Button>
                    <Button size="sm" className="btn-secondary">
                      <ArrowDownRight className="w-3 h-3 mr-1" />
                      Borrow
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden p-4 space-y-4">
        {assets.map((asset, index) => (
          <div key={asset.symbol} className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{asset.icon}</span>
                <div>
                  <div className="font-semibold">{asset.symbol}</div>
                  <div className="text-sm text-muted-foreground">{asset.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{asset.price}</div>
                <div className={`text-sm flex items-center ${asset.priceChange >= 0 ? 'text-primary' : 'text-red-400'}`}>
                  {asset.priceChange >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {Math.abs(asset.priceChange)}%
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Supply APY</div>
                <div className="text-primary font-semibold">{asset.supplyAPY}%</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Borrow APY</div>
                <div className="text-orange-400 font-semibold">{asset.borrowAPY}%</div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button size="sm" className="btn-primary flex-1">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                Supply
              </Button>
              <Button size="sm" className="btn-secondary flex-1">
                <ArrowDownRight className="w-3 h-3 mr-1" />
                Borrow
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketTable;
