
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp, DollarSign, Users, Clock, Unlink, CheckCircle2, Star, ArrowUpRight } from 'lucide-react';

interface LendingOpportunity {
  id: string;
  borrower: string;
  borrowerRating: string;
  amount: number;
  collateralSymbol: string;
  collateralValue: number;
  ltv: number;
  interestRate: number;
  term: string;
  riskLevel: string;
  status: 'available' | 'funded' | 'pending';
}

interface StockLendingProps {
  brokerage?: string;
  onDisconnect?: () => void;
}

const StockLending = ({ brokerage = 'Demo Brokerage', onDisconnect }: StockLendingProps) => {
  const { toast } = useToast();
  const [lendingOpportunities] = useState<LendingOpportunity[]>([
    {
      id: '1',
      borrower: 'Tech Investor',
      borrowerRating: 'AA',
      amount: 50000,
      collateralSymbol: 'AAPL',
      collateralValue: 75000,
      ltv: 67,
      interestRate: 5.2,
      term: '6 months',
      riskLevel: 'Low',
      status: 'available'
    },
    {
      id: '2',
      borrower: 'Growth Capital',
      borrowerRating: 'A+',
      amount: 125000,
      collateralSymbol: 'MSFT',
      collateralValue: 180000,
      ltv: 69,
      interestRate: 5.8,
      term: '12 months',
      riskLevel: 'Low',
      status: 'available'
    },
    {
      id: '3',
      borrower: 'Venture Fund',
      borrowerRating: 'A',
      amount: 75000,
      collateralSymbol: 'GOOGL',
      collateralValue: 115000,
      ltv: 65,
      interestRate: 6.1,
      term: '9 months',
      riskLevel: 'Medium',
      status: 'available'
    },
    {
      id: '4',
      borrower: 'Hedge Fund',
      borrowerRating: 'AA+',
      amount: 200000,
      collateralSymbol: 'SPY',
      collateralValue: 285000,
      ltv: 70,
      interestRate: 4.9,
      term: '18 months',
      riskLevel: 'Low',
      status: 'available'
    }
  ]);

  const [availableBalance] = useState(350000);
  const [activeLending] = useState(125000);
  const [totalInterestEarned] = useState(8250);

  const handleLend = (opportunity: LendingOpportunity) => {
    toast({
      title: "Lending Request Submitted",
      description: `Your lending offer of $${opportunity.amount.toLocaleString()} has been submitted.`,
    });
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'High': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRatingColor = (rating: string) => {
    if (rating.includes('AA')) return 'bg-green-100 text-green-800';
    if (rating.includes('A')) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-8">
      {/* Lending Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Available Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">${availableBalance.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Ready to lend</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Active Lending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">${activeLending.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Currently earning</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Interest Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">${totalInterestEarned.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">This year</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Avg. Yield</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">5.4%</p>
            <p className="text-sm text-muted-foreground">APY</p>
          </CardContent>
        </Card>
      </div>

      {/* Connected Brokerage Info */}
      {onDisconnect && (
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold">{brokerage[0]}</span>
                </div>
                <div>
                  <p className="font-semibold">Connected to {brokerage}</p>
                  <p className="text-sm text-muted-foreground">Funding source verified</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Connected
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onDisconnect}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Unlink className="w-4 h-4 mr-2" />
                  Disconnect
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lending Opportunities */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Available Lending Opportunities
          </CardTitle>
          <CardDescription>
            Lend to vetted borrowers with stock-backed collateral
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Borrower</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Collateral</TableHead>
                <TableHead>LTV</TableHead>
                <TableHead>Interest Rate</TableHead>
                <TableHead>Term</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lendingOpportunities.map((opportunity) => (
                <TableRow key={opportunity.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {opportunity.borrower[0]}
                      </div>
                      <span className="font-medium">{opportunity.borrower}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getRatingColor(opportunity.borrowerRating)} border-0`}>
                      <Star className="w-3 h-3 mr-1" />
                      {opportunity.borrowerRating}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold">
                    ${opportunity.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{opportunity.collateralSymbol}</p>
                      <p className="text-sm text-muted-foreground">
                        ${opportunity.collateralValue.toLocaleString()}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{opportunity.ltv}%</TableCell>
                  <TableCell className="font-semibold text-green-600">
                    {opportunity.interestRate}% APR
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      {opportunity.term}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getRiskColor(opportunity.riskLevel)} border-0`}>
                      {opportunity.riskLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      className="btn-primary"
                      onClick={() => handleLend(opportunity)}
                    >
                      Lend
                      <ArrowUpRight className="w-3 h-3 ml-1" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Lending Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Competitive Returns</h3>
            <p className="text-sm text-muted-foreground">
              Earn 4-8% APR on your lending with stock-backed security
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Verified Borrowers</h3>
            <p className="text-sm text-muted-foreground">
              All borrowers are KYC verified with credit ratings
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Diversified Risk</h3>
            <p className="text-sm text-muted-foreground">
              Spread lending across multiple borrowers and collateral types
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StockLending;
