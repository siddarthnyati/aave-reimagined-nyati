
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins, CreditCard, TrendingUp, Gift } from 'lucide-react';

const RewardsOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Coins className="w-5 h-5 text-primary" />
            GHO Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">1,247.85</p>
          <p className="text-sm text-muted-foreground">≈ $1,247.85 USD</p>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">$2,340</p>
          <p className="text-sm text-green-500">+$375 vs last month</p>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Avg. Cashback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">2.1%</p>
          <p className="text-sm text-muted-foreground">Across all purchases</p>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Gift className="w-5 h-5 text-primary" />
            Pending Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">46.82</p>
          <p className="text-sm text-muted-foreground">GHO to claim</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RewardsOverview;
