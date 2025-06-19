
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

const RecentRewardsFeed = () => {
  const recentRewards = [
    {
      id: 1,
      source: 'Coinbase Card',
      logo: 'CB',
      logoColor: 'bg-blue-600 text-white',
      amount: '$12.45',
      token: 'BTC',
      rawAmount: '0.0003 BTC',
      timestamp: '2 hours ago',
      category: 'Dining'
    },
    {
      id: 2,
      source: 'Crypto.com Card',
      logo: 'CDC',
      logoColor: 'bg-indigo-600 text-white',
      amount: '$8.21',
      token: 'CRO',
      rawAmount: '156 CRO',
      timestamp: '5 hours ago',
      category: 'Gas'
    },
    {
      id: 3,
      source: 'Binance Card',
      logo: 'BNB',
      logoColor: 'bg-yellow-500 text-black',
      amount: '$15.67',
      token: 'BNB',
      rawAmount: '0.045 BNB',
      timestamp: '1 day ago',
      category: 'Shopping'
    },
    {
      id: 4,
      source: 'Coinbase Card',
      logo: 'CB',
      logoColor: 'bg-blue-600 text-white',
      amount: '$6.32',
      token: 'BTC',
      rawAmount: '0.00018 BTC',
      timestamp: '2 days ago',
      category: 'Entertainment'
    },
    {
      id: 5,
      source: 'Crypto.com Card',
      logo: 'CDC',
      logoColor: 'bg-indigo-600 text-white',
      amount: '$22.11',
      token: 'CRO',
      rawAmount: '420 CRO',
      timestamp: '3 days ago',
      category: 'Travel'
    }
  ];

  return (
    <div className="space-y-3">
      {recentRewards.map((reward) => (
        <div key={reward.id} className="flex items-center justify-between p-3 rounded-lg bg-background/30 border border-border/30 hover:bg-background/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full ${reward.logoColor} flex items-center justify-center text-xs font-bold`}>
              {reward.logo}
            </div>
            <div>
              <p className="font-medium text-sm">{reward.source}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {reward.timestamp}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-sm">{reward.amount}</p>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {reward.token}
              </Badge>
              <span className="text-xs text-muted-foreground">{reward.category}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentRewardsFeed;
