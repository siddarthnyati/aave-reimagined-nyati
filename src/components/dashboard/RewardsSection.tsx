
import { Coins, Gift, CreditCard, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const RewardsSection = () => {
  const rewardHistory = [
    {
      date: "2024-06-10",
      source: "Amazon Purchase",
      amount: "125.50",
      ghoEarned: "2.51",
      rate: "2%"
    },
    {
      date: "2024-06-09",
      source: "Lending Rewards",
      amount: "500.00",
      ghoEarned: "15.00",
      rate: "3% APY"
    },
    {
      date: "2024-06-08",
      source: "Walmart Purchase",
      amount: "89.99",
      ghoEarned: "1.80",
      rate: "2%"
    },
    {
      date: "2024-06-07",
      source: "Apple Store",
      amount: "999.00",
      ghoEarned: "14.99",
      rate: "1.5%"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Coins className="w-5 h-5 text-primary" />
              Total GHO Earned
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
            <p className="text-2xl font-bold">84.30</p>
            <p className="text-sm text-green-500">+23% vs last month</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Gift className="w-5 h-5 text-primary" />
              Available to Claim
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">156.42</p>
            <Button size="sm" className="mt-2 w-full">Claim Rewards</Button>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Avg. Cashback Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">2.1%</p>
            <p className="text-sm text-muted-foreground">Across all purchases</p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Recent Rewards</CardTitle>
          <CardDescription>
            Track your GHO token earnings from purchases and lending
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rewardHistory.map((reward, index) => (
              <div key={index} className="flex items-center justify-between border border-border rounded-lg p-4">
                <div className="space-y-1">
                  <p className="font-medium">{reward.source}</p>
                  <p className="text-sm text-muted-foreground">{reward.date}</p>
                </div>
                
                <div className="text-right space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">${reward.amount}</span>
                    <Badge variant="secondary">{reward.rate}</Badge>
                  </div>
                  <p className="font-semibold text-primary">+{reward.ghoEarned} GHO</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Button variant="outline">View All Rewards</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RewardsSection;
