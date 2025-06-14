import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, TrendingUp, Info, ExternalLink } from 'lucide-react';
import { getTrustGraphGrade, getTrustGraphColor, getTrustGraphTier } from '@/lib/trustgraph';
import { useNavigate } from 'react-router-dom';

interface TrustGraphScoreProps {
  score: number;
  showDetails?: boolean;
  size?: 'compact' | 'full';
  onClick?: () => void;
}

const TrustGraphScore = ({ score, showDetails = false, size = 'compact', onClick }: TrustGraphScoreProps) => {
  const grade = getTrustGraphGrade(score);
  const tier = getTrustGraphTier(score);
  const color = getTrustGraphColor(score);
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Navigate to dashboard with analytics tab and trustgraph focus
      navigate('/dashboard?tab=analytics&focus=trustgraph');
    }
  };

  if (size === 'compact') {
    return (
      <div 
        className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={handleClick}
      >
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-primary" />
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">{score}</span>
              <Badge className={`${color} border-0`}>{grade}</Badge>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">TrustGraph Score</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="glass-card cursor-pointer hover:scale-105 transition-transform" onClick={handleClick}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-6 h-6 text-primary" />
          <span>TrustGraph Score</span>
          <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto" />
        </CardTitle>
        <CardDescription>Your DeFi creditworthiness based on on-chain activity</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">{score}</div>
          <Badge className={`${color} border-0 text-lg px-3 py-1`}>{grade}</Badge>
          <p className="text-muted-foreground mt-2">{tier}</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Score Range</span>
            <span>300 - 850</span>
          </div>
          <Progress value={(score - 300) / 550 * 100} className="h-2" />
        </div>

        {showDetails && (
          <div className="space-y-3 pt-4 border-t border-border">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <Info className="w-4 h-4" />
              Score Factors
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Transaction History</span>
                <span className="text-green-600 dark:text-green-400">Excellent (25%)</span>
              </div>
              <div className="flex justify-between">
                <span>Protocol Interaction</span>
                <span className="text-green-600 dark:text-green-400">Very Good (20%)</span>
              </div>
              <div className="flex justify-between">
                <span>Liquidity Provision</span>
                <span className="text-yellow-600 dark:text-yellow-400">Good (15%)</span>
              </div>
              <div className="flex justify-between">
                <span>Loan Repayment</span>
                <span className="text-green-600 dark:text-green-400">Excellent (20%)</span>
              </div>
              <div className="flex justify-between">
                <span>Governance Participation</span>
                <span className="text-yellow-600 dark:text-yellow-400">Fair (10%)</span>
              </div>
              <div className="flex justify-between">
                <span>Time in Ecosystem</span>
                <span className="text-green-600 dark:text-green-400">Very Good (10%)</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrustGraphScore;
