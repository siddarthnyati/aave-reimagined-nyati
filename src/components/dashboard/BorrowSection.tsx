
import { Button } from '@/components/ui/button';
import { Plus, ArrowDownRight } from 'lucide-react';

interface BorrowedAsset {
  symbol: string;
  name: string;
  icon: string;
  balance: string;
  apy: number;
  value: string;
}

const BorrowSection = () => {
  const borrowedAssets: BorrowedAsset[] = [
    {
      symbol: 'USDT',
      name: 'Tether',
      icon: '💰',
      balance: '15,000.00',
      apy: 11.25,
      value: '$15,000.00'
    },
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      icon: '₿',
      balance: '0.25',
      apy: 5.25,
      value: '$8,567.43'
    }
  ];

  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Your Borrows</h2>
        <Button className="btn-secondary">
          <Plus className="w-4 h-4 mr-2" />
          Borrow
        </Button>
      </div>

      <div className="space-y-4">
        {borrowedAssets.map((asset, index) => (
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
              <div className="text-orange-400 font-semibold">{asset.apy}% APY</div>
              <ArrowDownRight className="w-4 h-4 text-muted-foreground group-hover:text-orange-400 transition-colors ml-auto" />
            </div>
          </div>
        ))}
      </div>

      {borrowedAssets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No outstanding borrows</p>
          <Button className="btn-secondary">
            <Plus className="w-4 h-4 mr-2" />
            Start Borrowing
          </Button>
        </div>
      )}
    </div>
  );
};

export default BorrowSection;
