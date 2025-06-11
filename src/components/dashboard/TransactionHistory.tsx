
import { ArrowUpRight, ArrowDownRight, Clock, ExternalLink } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'supply' | 'withdraw' | 'borrow' | 'repay';
  asset: string;
  amount: string;
  value: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  txHash: string;
}

const TransactionHistory = () => {
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'supply',
      asset: 'ETH',
      amount: '2.5',
      value: '$4,125.50',
      timestamp: '2 hours ago',
      status: 'completed',
      txHash: '0x1234...abcd'
    },
    {
      id: '2',
      type: 'borrow',
      asset: 'USDT',
      amount: '5,000',
      value: '$5,000.00',
      timestamp: '1 day ago',
      status: 'completed',
      txHash: '0x5678...efgh'
    },
    {
      id: '3',
      type: 'withdraw',
      asset: 'USDC',
      amount: '10,000',
      value: '$10,000.00',
      timestamp: '3 days ago',
      status: 'completed',
      txHash: '0x9012...ijkl'
    },
    {
      id: '4',
      type: 'repay',
      asset: 'BTC',
      amount: '0.1',
      value: '$3,426.97',
      timestamp: '1 week ago',
      status: 'completed',
      txHash: '0x3456...mnop'
    }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'supply':
      case 'withdraw':
        return ArrowUpRight;
      case 'borrow':
      case 'repay':
        return ArrowDownRight;
      default:
        return Clock;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'supply':
        return 'text-primary';
      case 'withdraw':
        return 'text-blue-400';
      case 'borrow':
        return 'text-orange-400';
      case 'repay':
        return 'text-purple-400';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Recent Transactions</h2>
        <button className="text-primary hover:text-primary/80 transition-colors text-sm font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {transactions.map((tx) => {
          const Icon = getTransactionIcon(tx.type);
          return (
            <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center ${getTransactionColor(tx.type)}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold capitalize">{tx.type} {tx.asset}</div>
                  <div className="text-sm text-muted-foreground">{tx.timestamp}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-semibold">{tx.amount} {tx.asset}</div>
                <div className="text-sm text-muted-foreground">{tx.value}</div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  tx.status === 'completed' ? 'bg-primary/20 text-primary' :
                  tx.status === 'pending' ? 'bg-orange-400/20 text-orange-400' :
                  'bg-red-400/20 text-red-400'
                }`}>
                  {tx.status}
                </span>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionHistory;
