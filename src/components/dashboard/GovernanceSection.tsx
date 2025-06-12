
import { Vote, Users, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const GovernanceSection = () => {
  const proposals = [
    {
      id: 1,
      title: "Increase Lending Pool Rewards",
      description: "Proposal to increase rewards for ETH lending pool by 15%",
      status: "Active",
      votes: 2847,
      timeLeft: "3 days",
      support: 78
    },
    {
      id: 2,
      title: "Add Support for ARB Token",
      description: "Add Arbitrum token as collateral for borrowing",
      status: "Passed",
      votes: 3924,
      timeLeft: "Ended",
      support: 92
    },
    {
      id: 3,
      title: "Update Risk Parameters",
      description: "Adjust liquidation thresholds for volatile assets",
      status: "Active",
      votes: 1856,
      timeLeft: "5 days",
      support: 65
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Vote className="w-5 h-5 text-primary" />
              Active Proposals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">15</p>
            <p className="text-sm text-muted-foreground">+3 this week</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Your Voting Power
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12.5K</p>
            <p className="text-sm text-muted-foreground">DFL Tokens</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              Participation Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">89%</p>
            <p className="text-sm text-green-500">+5% vs last month</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Total Voting Power
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">3.2M</p>
            <p className="text-sm text-muted-foreground">DFL Tokens</p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Recent Proposals</CardTitle>
          <CardDescription>
            Vote on proposals to shape the future of DeFiLend
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <div key={proposal.id} className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{proposal.title}</h3>
                    <p className="text-sm text-muted-foreground">{proposal.description}</p>
                  </div>
                  <Badge variant={proposal.status === 'Active' ? 'default' : 'secondary'}>
                    {proposal.status}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{proposal.votes.toLocaleString()} votes</span>
                    <span>{proposal.support}% support</span>
                    <span>{proposal.timeLeft}</span>
                  </div>
                  
                  {proposal.status === 'Active' && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Against</Button>
                      <Button size="sm">For</Button>
                    </div>
                  )}
                </div>
                
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${proposal.support}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GovernanceSection;
