
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp, TrendingDown, DollarSign, PieChart, AlertTriangle, Target, Unlink, CheckCircle2, AlertCircle } from 'lucide-react';

interface Stock {
  symbol: string;
  name: string;
  shares: number;
  price: number;
  dayChange: number;
  marketValue: number;
  riskRating: string;
  ltv: number;
  maxLoan: number;
  sector: string;
  selected: boolean;
}

interface StockBorrowingProps {
  brokerage: string;
  onDisconnect: () => void;
}

const StockBorrowing = ({ brokerage, onDisconnect }: StockBorrowingProps) => {
  const { toast } = useToast();
  const [loanAmount, setLoanAmount] = useState('');
  const [validationError, setValidationError] = useState('');
  const [stocks, setStocks] = useState<Stock[]>([
    { symbol: 'AAPL', name: 'Apple Inc.', shares: 50, price: 182.52, dayChange: 2.14, marketValue: 9126, riskRating: 'A+', ltv: 70, maxLoan: 6388, sector: 'Technology', selected: false },
    { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 30, price: 378.85, dayChange: -1.23, marketValue: 11366, riskRating: 'A+', ltv: 70, maxLoan: 7956, sector: 'Technology', selected: false },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 25, price: 138.21, dayChange: 0.89, marketValue: 3455, riskRating: 'A', ltv: 65, maxLoan: 2246, sector: 'Technology', selected: false },
    { symbol: 'TSLA', name: 'Tesla Inc.', shares: 15, price: 248.42, dayChange: -4.67, marketValue: 3726, riskRating: 'B+', ltv: 50, maxLoan: 1863, sector: 'Consumer Cyclical', selected: false },
    { symbol: 'SPY', name: 'SPDR S&P 500 ETF', shares: 80, price: 445.32, dayChange: 1.05, marketValue: 35626, riskRating: 'A+', ltv: 80, maxLoan: 28501, sector: 'ETF', selected: false },
    { symbol: 'QQQ', name: 'Invesco QQQ ETF', shares: 40, price: 385.67, dayChange: 0.73, marketValue: 15427, riskRating: 'A+', ltv: 75, maxLoan: 11570, sector: 'ETF', selected: false },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', shares: 20, price: 875.23, dayChange: 5.12, marketValue: 17505, riskRating: 'A-', ltv: 60, maxLoan: 10503, sector: 'Technology', selected: false },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', shares: 12, price: 142.81, dayChange: -0.95, marketValue: 1714, riskRating: 'A', ltv: 65, maxLoan: 1114, sector: 'Consumer Cyclical', selected: false }
  ]);

  const totalPortfolioValue = stocks.reduce((sum, stock) => sum + stock.marketValue, 0);
  const selectedValue = stocks.filter(s => s.selected).reduce((sum, stock) => sum + stock.marketValue, 0);
  const maxLoanAmount = stocks.filter(s => s.selected).reduce((sum, stock) => sum + stock.maxLoan, 0);
  const selectedCount = stocks.filter(s => s.selected).length;

  const handleStockSelect = (symbol: string, checked: boolean) => {
    setStocks(prev => prev.map(stock => 
      stock.symbol === symbol ? { ...stock, selected: checked } : stock
    ));
  };

  const handleSelectAll = () => {
    const allSelected = stocks.every(stock => stock.selected);
    setStocks(prev => prev.map(stock => ({ ...stock, selected: !allSelected })));
  };

  const handleLoanAmountChange = (value: string) => {
    setLoanAmount(value);
    const amount = parseFloat(value);
    
    if (value && amount > maxLoanAmount) {
      setValidationError(`Amount exceeds maximum loan of $${maxLoanAmount.toLocaleString()}`);
    } else if (value && amount <= 0) {
      setValidationError('Amount must be greater than 0');
    } else {
      setValidationError('');
    }
  };

  const handleRequestLoan = () => {
    if (!loanAmount || parseFloat(loanAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid loan amount.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Loan Request Submitted",
      description: `Your loan request for $${parseFloat(loanAmount).toLocaleString()} has been submitted for approval.`,
    });
    setLoanAmount('');
  };

  const getRiskColor = (rating: string) => {
    switch (rating) {
      case 'A+': return 'bg-green-100 text-green-800';
      case 'A': return 'bg-green-100 text-green-700';
      case 'A-': return 'bg-blue-100 text-blue-700';
      case 'B+': return 'bg-yellow-100 text-yellow-700';
      case 'B': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const isLoanAmountValid = !validationError && loanAmount && parseFloat(loanAmount) > 0;
  const allSelected = stocks.every(stock => stock.selected);

  return (
    <div className="space-y-8">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Portfolio Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">${totalPortfolioValue.toLocaleString()}</p>
            <p className="text-sm text-green-500">+$3,240 (3.2%) today</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Selected Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${selectedValue.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">{selectedCount} positions</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Max Loan Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">${maxLoanAmount.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Available to borrow</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Interest Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">4.8%</p>
            <p className="text-sm text-muted-foreground">APR</p>
          </CardContent>
        </Card>
      </div>

      {/* Connected Brokerage Info */}
      <Card className="glass-card">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold">{brokerage[0]}</span>
              </div>
              <div>
                <p className="font-semibold">Connected to {brokerage}</p>
                <p className="text-sm text-muted-foreground">Last sync: Just now</p>
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

      {/* Stock Portfolio Table */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your Stock Portfolio</CardTitle>
              <CardDescription>
                Select stocks to use as collateral for your loan
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              onClick={handleSelectAll}
              className="text-sm"
            >
              {allSelected ? 'Deselect All' : 'Select All'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Select</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Shares</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Day Change</TableHead>
                <TableHead>Market Value</TableHead>
                <TableHead>Risk Rating</TableHead>
                <TableHead>Max LTV</TableHead>
                <TableHead>Max Loan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stocks.map((stock) => (
                <TableRow 
                  key={stock.symbol} 
                  className={stock.selected ? 'bg-blue-50 border-blue-200' : 'hover:bg-muted/50'}
                >
                  <TableCell>
                    <Checkbox
                      checked={stock.selected}
                      onCheckedChange={(checked) => handleStockSelect(stock.symbol, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                        {stock.symbol[0]}
                      </div>
                      <div>
                        <p className="font-medium">{stock.symbol}</p>
                        <p className="text-sm text-muted-foreground">{stock.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{stock.shares}</TableCell>
                  <TableCell>${stock.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className={`flex items-center gap-1 ${stock.dayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.dayChange >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {stock.dayChange >= 0 ? '+' : ''}{stock.dayChange.toFixed(2)}%
                    </div>
                  </TableCell>
                  <TableCell>${stock.marketValue.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={`${getRiskColor(stock.riskRating)} border-0`}>
                      {stock.riskRating}
                    </Badge>
                  </TableCell>
                  <TableCell>{stock.ltv}%</TableCell>
                  <TableCell className="font-medium text-green-600">
                    ${stock.maxLoan.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Loan Request Section */}
      {selectedCount > 0 && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Request Loan
            </CardTitle>
            <CardDescription>
              Borrow against your selected stock collateral
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="loanAmount">Loan Amount (USD)</Label>
                  <div className="relative">
                    <Input
                      id="loanAmount"
                      type="number"
                      placeholder="10000"
                      value={loanAmount}
                      onChange={(e) => handleLoanAmountChange(e.target.value)}
                      className={validationError ? 'border-red-500 focus:border-red-500' : ''}
                    />
                    {validationError && (
                      <div className="absolute right-2 top-2">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      </div>
                    )}
                  </div>
                  {validationError ? (
                    <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {validationError}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">
                      Maximum: ${maxLoanAmount.toLocaleString()}
                    </p>
                  )}
                </div>
                <Button 
                  className="w-full btn-primary"
                  onClick={handleRequestLoan}
                  disabled={!isLoanAmountValid}
                >
                  Request Loan
                </Button>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">Loan Terms</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Interest Rate:</span>
                    <span className="font-medium">4.8% APR</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Collateral Value:</span>
                    <span className="font-medium">${selectedValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Loan-to-Value:</span>
                    <span className="font-medium">
                      {loanAmount ? ((parseFloat(loanAmount) / selectedValue) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Payment:</span>
                    <span className="font-medium">
                      ${loanAmount ? ((parseFloat(loanAmount) * 0.048) / 12).toFixed(0) : 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StockBorrowing;
