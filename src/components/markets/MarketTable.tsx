
import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  symbol: string;
  category: string;
  icon: string;
  supplyAPY: string;
  borrowAPY: string;
  totalSupply: string;
  totalBorrow: string;
  price: string;
  change24h: number;
  liquidity: string;
}

interface MarketTableProps {
  activeCategory: string;
  searchTerm: string;
}

const MarketTable = ({ activeCategory, searchTerm }: MarketTableProps) => {
  const [sortBy, setSortBy] = useState('supplyAPY');

  const allAssets: Asset[] = [
    // Stablecoins
    { id: '1', name: 'USD Coin', symbol: 'USDC', category: 'stablecoins', icon: '💎', supplyAPY: '4.2%', borrowAPY: '6.8%', totalSupply: '$2.1B', totalBorrow: '$1.8B', price: '$1.00', change24h: 0.01, liquidity: '$45M' },
    { id: '2', name: 'Tether', symbol: 'USDT', category: 'stablecoins', icon: '💰', supplyAPY: '3.8%', borrowAPY: '6.2%', totalSupply: '$1.9B', totalBorrow: '$1.6B', price: '$1.00', change24h: -0.02, liquidity: '$38M' },
    { id: '3', name: 'Dai', symbol: 'DAI', category: 'stablecoins', icon: '🟡', supplyAPY: '4.5%', borrowAPY: '7.1%', totalSupply: '$890M', totalBorrow: '$720M', price: '$1.00', change24h: 0.03, liquidity: '$22M' },
    { id: '4', name: 'Frax', symbol: 'FRAX', category: 'stablecoins', icon: '❄️', supplyAPY: '5.2%', borrowAPY: '8.3%', totalSupply: '$456M', totalBorrow: '$380M', price: '$1.00', change24h: 0.05, liquidity: '$18M' },
    
    // Major
    { id: '5', name: 'Bitcoin', symbol: 'BTC', category: 'major', icon: '₿', supplyAPY: '2.1%', borrowAPY: '4.8%', totalSupply: '$8.2B', totalBorrow: '$6.1B', price: '$43,250', change24h: 2.3, liquidity: '$120M' },
    { id: '6', name: 'Ethereum', symbol: 'ETH', category: 'major', icon: '⟠', supplyAPY: '3.2%', borrowAPY: '5.9%', totalSupply: '$6.8B', totalBorrow: '$5.2B', price: '$2,680', change24h: 1.8, liquidity: '$95M' },
    { id: '7', name: 'Solana', symbol: 'SOL', category: 'major', icon: '◎', supplyAPY: '4.8%', borrowAPY: '8.2%', totalSupply: '$2.1B', totalBorrow: '$1.6B', price: '$98.50', change24h: 5.2, liquidity: '$42M' },
    { id: '8', name: 'XRP', symbol: 'XRP', category: 'major', icon: '⚡', supplyAPY: '3.5%', borrowAPY: '6.8%', totalSupply: '$1.8B', totalBorrow: '$1.3B', price: '$0.58', change24h: -1.2, liquidity: '$35M' },
    { id: '9', name: 'Cardano', symbol: 'ADA', category: 'major', icon: '🔷', supplyAPY: '4.1%', borrowAPY: '7.5%', totalSupply: '$1.2B', totalBorrow: '$890M', price: '$0.42', change24h: 3.1, liquidity: '$28M' },
    
    // DeFi
    { id: '10', name: 'Uniswap', symbol: 'UNI', category: 'defi', icon: '🦄', supplyAPY: '6.8%', borrowAPY: '12.5%', totalSupply: '$680M', totalBorrow: '$520M', price: '$8.20', change24h: 4.5, liquidity: '$25M' },
    { id: '11', name: 'Aave', symbol: 'AAVE', category: 'defi', icon: '👻', supplyAPY: '7.2%', borrowAPY: '13.8%', totalSupply: '$590M', totalBorrow: '$450M', price: '$95.40', change24h: 6.2, liquidity: '$22M' },
    { id: '12', name: 'SushiSwap', symbol: 'SUSHI', category: 'defi', icon: '🍣', supplyAPY: '8.5%', borrowAPY: '15.2%', totalSupply: '$320M', totalBorrow: '$240M', price: '$1.85', change24h: -2.1, liquidity: '$15M' },
    { id: '13', name: 'Compound', symbol: 'COMP', category: 'defi', icon: '🏛️', supplyAPY: '5.9%', borrowAPY: '11.3%', totalSupply: '$280M', totalBorrow: '$210M', price: '$58.70', change24h: 1.8, liquidity: '$12M' },
    
    // Emerging
    { id: '14', name: 'Dogecoin', symbol: 'DOGE', category: 'emerging', icon: '🐕', supplyAPY: '8.2%', borrowAPY: '16.5%', totalSupply: '$180M', totalBorrow: '$120M', price: '$0.085', change24h: 12.3, liquidity: '$8M' },
    { id: '15', name: 'Shiba Inu', symbol: 'SHIB', category: 'emerging', icon: '🐶', supplyAPY: '9.8%', borrowAPY: '18.2%', totalSupply: '$120M', totalBorrow: '$85M', price: '$0.000009', change24h: 8.7, liquidity: '$6M' },
    { id: '16', name: 'ApeCoin', symbol: 'APE', category: 'emerging', icon: '🐒', supplyAPY: '11.5%', borrowAPY: '22.8%', totalSupply: '$95M', totalBorrow: '$68M', price: '$1.25', change24h: -5.2, liquidity: '$5M' },
    { id: '17', name: 'Lido DAO', symbol: 'LDO', category: 'emerging', icon: '🏺', supplyAPY: '7.8%', borrowAPY: '14.5%', totalSupply: '$150M', totalBorrow: '$110M', price: '$2.45', change24h: 3.8, liquidity: '$7M' }
  ];

  const filteredAssets = useMemo(() => {
    let filtered = allAssets;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(asset => asset.category === activeCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(asset => 
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [activeCategory, searchTerm]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssets.map((asset) => (
          <Card key={asset.id} className="asset-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{asset.icon}</span>
                  <div>
                    <h3 className="font-semibold">{asset.symbol}</h3>
                    <p className="text-sm text-muted-foreground">{asset.name}</p>
                  </div>
                </div>
                <Badge variant={asset.category === 'stablecoins' ? 'default' : 'secondary'}>
                  {asset.category}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Price</span>
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold">{asset.price}</span>
                    {asset.change24h > 0 ? (
                      <TrendingUp className="w-3 h-3 text-green-500" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-500" />
                    )}
                    <span className={`text-xs ${asset.change24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {asset.change24h > 0 ? '+' : ''}{asset.change24h}%
                    </span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Supply APY</span>
                  <span className="font-semibold text-primary">{asset.supplyAPY}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Borrow APY</span>
                  <span className="font-semibold">{asset.borrowAPY}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Liquidity</span>
                  <span className="font-semibold">{asset.liquidity}</span>
                </div>
              </div>

              <div className="flex space-x-2 mt-4">
                <Button size="sm" className="btn-primary flex-1">
                  Supply
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Borrow
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MarketTable;
