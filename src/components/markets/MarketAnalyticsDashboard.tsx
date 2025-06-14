
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Users, DollarSign, Percent } from 'lucide-react';

const MarketAnalyticsDashboard = () => {
  const marketTrendsData = [
    { time: '00:00', totalSupply: 8.2, totalBorrow: 6.1, utilization: 74 },
    { time: '04:00', totalSupply: 8.5, totalBorrow: 6.3, utilization: 74 },
    { time: '08:00', totalSupply: 8.8, totalBorrow: 6.8, utilization: 77 },
    { time: '12:00', totalSupply: 9.1, totalBorrow: 7.2, utilization: 79 },
    { time: '16:00', totalSupply: 9.3, totalBorrow: 7.5, utilization: 81 },
    { time: '20:00', totalSupply: 9.0, totalBorrow: 7.1, utilization: 79 },
    { time: '24:00', totalSupply: 8.9, totalBorrow: 6.9, utilization: 78 }
  ];

  const assetDistribution = [
    { name: 'Stablecoins', value: 45, color: '#8884d8' },
    { name: 'Major Assets', value: 35, color: '#82ca9d' },
    { name: 'DeFi Tokens', value: 15, color: '#ffc658' },
    { name: 'Emerging', value: 5, color: '#ff7c7c' }
  ];

  const marketMetrics = [
    {
      title: '24h Volume',
      value: '$2.8B',
      change: '+12.3%',
      isPositive: true,
      icon: Activity
    },
    {
      title: 'Active Users',
      value: '45.2K',
      change: '+8.7%',
      isPositive: true,
      icon: Users
    },
    {
      title: 'Avg Utilization',
      value: '78.4%',
      change: '+2.1%',
      isPositive: true,
      icon: Percent
    },
    {
      title: 'Protocol TVL',
      value: '$12.4B',
      change: '+15.6%',
      isPositive: true,
      icon: DollarSign
    }
  ];

  return (
    <div className="space-y-6">
      {/* Market Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {marketMetrics.map((metric, index) => (
          <Card key={index} className="metric-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className="w-5 h-5 text-primary" />
                <div className={`flex items-center text-sm ${metric.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {metric.change}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold">{metric.value}</h3>
                <p className="text-sm text-muted-foreground">{metric.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Trends Chart */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>24h Market Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={marketTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="totalSupply" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Total Supply (B)"
                />
                <Line 
                  type="monotone" 
                  dataKey="totalBorrow" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  name="Total Borrow (B)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Asset Distribution Chart */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-primary" />
              <span>Asset Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assetDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {assetDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketAnalyticsDashboard;
