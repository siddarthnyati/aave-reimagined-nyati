
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp, AlertTriangle, Info } from 'lucide-react';

const FlashNews = () => {
  const newsItems = [
    {
      id: 1,
      type: 'price-alert',
      title: 'ETH Supply APY Increased',
      description: 'Ethereum supply rates increased to 4.8% due to high borrowing demand',
      time: '2 minutes ago',
      severity: 'info',
      icon: TrendingUp
    },
    {
      id: 2,
      type: 'market-update',
      title: 'New USDC Lending Pool',
      description: 'Enhanced USDC pool launched with competitive 8.2% APY rates',
      time: '15 minutes ago',
      severity: 'success',
      icon: Info
    },
    {
      id: 3,
      type: 'risk-alert',
      title: 'High Utilization Warning',
      description: 'LINK market showing 95% utilization - consider supply opportunities',
      time: '1 hour ago',
      severity: 'warning',
      icon: AlertTriangle
    },
    {
      id: 4,
      type: 'protocol-update',
      title: 'Protocol Upgrade Complete',
      description: 'Enhanced liquidation mechanics now live, improving market stability',
      time: '3 hours ago',
      severity: 'info',
      icon: Info
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'success': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'warning': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'info': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-primary" />
          <span>Market Flash News</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {newsItems.map((item) => (
          <div key={item.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
            <div className={`p-2 rounded-full ${getSeverityColor(item.severity)}`}>
              <item.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">{item.title}</h4>
                <Badge variant="outline" className="text-xs">
                  {item.type}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <p className="text-xs text-muted-foreground flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {item.time}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default FlashNews;
