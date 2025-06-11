
import { TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react';

const WalletOverview = () => {
  const metrics = [
    {
      title: 'Net Worth',
      value: '$127,543.82',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign
    },
    {
      title: 'Total Supplied',
      value: '$89,234.56',
      change: '+8.2%',
      trend: 'up',
      icon: TrendingUp
    },
    {
      title: 'Total Borrowed',
      value: '$23,567.43',
      change: '-2.1%',
      trend: 'down',
      icon: TrendingDown
    },
    {
      title: 'Health Factor',
      value: '2.43',
      change: 'Safe',
      trend: 'up',
      icon: Percent
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <div key={index} className="metric-card">
          <div className="flex items-center justify-between mb-4">
            <metric.icon className="w-6 h-6 text-primary" />
            <span className={`text-sm font-medium ${
              metric.trend === 'up' ? 'text-primary' : 'text-red-400'
            }`}>
              {metric.change}
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-1">{metric.value}</h3>
            <p className="text-muted-foreground text-sm">{metric.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WalletOverview;
