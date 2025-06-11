
import { TrendingUp, DollarSign, Percent, Users } from 'lucide-react';

const MarketStats = () => {
  const stats = [
    {
      title: 'Total Market Size',
      value: '$12.4B',
      change: '+15.2%',
      icon: DollarSign
    },
    {
      title: 'Total Available',
      value: '$8.7B',
      change: '+8.9%',
      icon: TrendingUp
    },
    {
      title: 'Total Borrows',
      value: '$3.7B',
      change: '+12.4%',
      icon: Percent
    },
    {
      title: 'Active Users',
      value: '125K',
      change: '+24.1%',
      icon: Users
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

export default MarketStats;
