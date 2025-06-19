
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { TrendingUp, Zap, Target, Award, ExternalLink } from 'lucide-react';
import ConnectedPlatforms from './ConnectedPlatforms';
import RecentRewardsFeed from './RecentRewardsFeed';
import AaveRecommendations from './AaveRecommendations';

const RewardsAggregator = () => {
  return (
    <div className="space-y-8">
      {/* Total Rewards Summary */}
      <Card className="glass-card bg-gradient-to-br from-primary/5 to-blue-400/5 border-primary/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-outfit gradient-text flex items-center gap-2">
            <Award className="w-6 h-6" />
            Total Rewards Synced
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-4xl font-bold gradient-text">$237.52</p>
              <p className="text-muted-foreground">Across 3 connected platforms</p>
            </div>
            <div className="text-right">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mb-2">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12.3% this month
              </Badge>
            </div>
          </div>

          {/* Auto-convert Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/50">
            <div>
              <h4 className="font-medium">Auto-convert & deposit future rewards</h4>
              <p className="text-sm text-muted-foreground">Automatically optimize new rewards for maximum yield</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Aave Optimization Recommendations */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-outfit">
            <Target className="w-5 h-5 text-primary" />
            Optimization Recommendations
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Earn up to <span className="text-green-400 font-semibold">6.2% APY</span> if supplied to Aave Vault
          </p>
        </CardHeader>
        <CardContent>
          <AaveRecommendations />
        </CardContent>
      </Card>

      {/* Connected Platforms & Recent Rewards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="font-outfit">Connected Platforms</CardTitle>
          </CardHeader>
          <CardContent>
            <ConnectedPlatforms />
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="font-outfit">Recent Reward Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentRewardsFeed />
          </CardContent>
        </Card>
      </div>

      {/* Gamification Section */}
      <Card className="glass-card bg-gradient-to-r from-purple-500/5 to-pink-500/5 border-purple-500/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">You earned 2 Boost Credits!</h3>
                <p className="text-sm text-muted-foreground">For converting BTC rewards to optimized yields</p>
              </div>
            </div>
            <Button variant="outline" className="btn-secondary">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Achievements
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RewardsAggregator;
