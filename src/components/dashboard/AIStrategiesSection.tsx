
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp, Zap, Target, CheckCircle, ArrowRight, Bot, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIStrategiesSection = () => {
  const { toast } = useToast();

  const activeStrategies = [
    {
      name: 'Auto Supply',
      description: 'Automatically supply idle assets to highest yield pools',
      enabled: true,
      savings: '+$2,340',
      lastExecution: '2 hours ago',
      status: 'Active',
      performance: '+8.4% APY'
    },
    {
      name: 'Smart Rebalancing',
      description: 'Rebalance portfolio when allocation drifts beyond threshold',
      enabled: true,
      savings: '+$1,890',
      lastExecution: '1 day ago',
      status: 'Active',
      performance: 'Portfolio optimized'
    },
    {
      name: 'Liquidation Protection',
      description: 'Auto-repay loans when health factor approaches danger zone',
      enabled: true,
      savings: 'Risk Protected',
      lastExecution: 'Never triggered',
      status: 'Monitoring',
      performance: 'Health Factor: 2.8'
    }
  ];

  return (
    <div className="space-y-6">
      {/* AI Strategies Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Active Strategies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">3</p>
            <p className="text-sm text-muted-foreground">Running optimizations</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Total Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">$4,230</p>
            <p className="text-sm text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Performance Boost</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">+12.4%</p>
            <p className="text-sm text-muted-foreground">vs manual trading</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Strategies List */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Active AI Strategies
              </CardTitle>
              <CardDescription>
                Currently running automated optimizations
              </CardDescription>
            </div>
            <Link to="/ai-strategies">
              <Button variant="outline" className="flex items-center gap-2">
                Manage Strategies
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeStrategies.map((strategy, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{strategy.name}</h4>
                    <Badge variant="default" className="text-xs">
                      {strategy.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{strategy.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-green-600">{strategy.savings}</div>
                <div className="text-xs text-muted-foreground">{strategy.lastExecution}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Insights Card */}
      <Card className="glass-card bg-gradient-to-r from-gray-900 to-gray-800 border-green-800">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <Bot className="w-6 h-6 text-green-400" />
            <h3 className="text-lg font-semibold text-white">AI Portfolio Insights</h3>
          </div>
          <p className="text-sm text-gray-300 mb-4">
            Your portfolio is performing 12.4% better than manual management. AI has saved you $4,230 this month through optimized rebalancing and yield farming strategies.
          </p>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Next optimization in 2 hours when gas prices drop
            </div>
            <Link to="/ai-strategies">
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Target className="w-4 h-4 mr-2" />
                View Rebalancing Tool
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIStrategiesSection;
