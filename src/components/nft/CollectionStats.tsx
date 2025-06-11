
import { TrendingUp, DollarSign, Package, Clock } from 'lucide-react';

const CollectionStats = () => {
  const stats = [
    {
      title: 'Total NFT Value',
      value: '$234,567',
      change: '+18.5%',
      icon: DollarSign
    },
    {
      title: 'Active Loans',
      value: '12',
      change: '+3',
      icon: TrendingUp
    },
    {
      title: 'Collections',
      value: '8',
      change: '+2',
      icon: Package
    },
    {
      title: 'Avg. Loan Duration',
      value: '45 days',
      change: '-5 days',
      icon: Clock
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="metric-card">
          <div className="flex items-center justify-between mb-4">
            <stat.icon className="w-6 h-6 text-primary" />
            <span className="text-sm font-medium text-primary">{stat.change}</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
            <p className="text-muted-foreground text-sm">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollectionStats;
