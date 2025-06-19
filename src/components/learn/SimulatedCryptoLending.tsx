
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useLearnMode } from '@/contexts/LearnModeContext';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp, AlertTriangle, Lightbulb, DollarSign } from 'lucide-react';

const SimulatedCryptoLending = () => {
  const { learnModeData, updateLearnModeData, completeModule } = useLearnMode();
  const { toast } = useToast();
  const [selectedAsset, setSelectedAsset] = useState<string>('');
  const [amount, setAmount] = useState('');
  const [showExplanation, setShowExplanation] = useState<string>('');

  const handleSupply = (assetSymbol: string, supplyAmount: number) => {
    const asset = learnModeData.assets.find(a => a.symbol === assetSymbol);
    if (!asset || supplyAmount > asset.balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough of this asset to supply.",
        variant: "destructive"
      });
      return;
    }

    // Update the asset
    const updatedAssets = learnModeData.assets.map(a => 
      a.symbol === assetSymbol 
        ? { ...a, balance: a.balance - supplyAmount, supplied: a.supplied + supplyAmount }
        : a
    );

    // Update portfolio
    const suppliedValue = supplyAmount * asset.price;
    const updatedPortfolio = {
      ...learnModeData.portfolio,
      supplied: learnModeData.portfolio.supplied + suppliedValue,
    };

    // Add transaction
    const newTransaction = {
      id: Date.now().toString(),
      type: 'supply' as const,
      asset: assetSymbol,
      amount: supplyAmount,
      timestamp: new Date(),
    };

    updateLearnModeData({
      assets: updatedAssets,
      portfolio: updatedPortfolio,
      transactions: [...learnModeData.transactions, newTransaction],
    });

    toast({
      title: "🎉 Supply Successful!",
      description: `You supplied ${supplyAmount} ${assetSymbol} and are now earning interest! This is like a high-yield savings account.`,
    });

    completeModule('first-supply');
    setAmount('');
  };

  const handleBorrow = (assetSymbol: string, borrowAmount: number) => {
    const asset = learnModeData.assets.find(a => a.symbol === assetSymbol);
    if (!asset) return;

    // Simple collateral check - need at least 150% collateral
    const borrowValue = borrowAmount * asset.price;
    const maxBorrowValue = learnModeData.portfolio.supplied * 0.67; // 67% LTV

    if (borrowValue > maxBorrowValue) {
      toast({
        title: "Insufficient Collateral",
        description: `You can only borrow up to $${maxBorrowValue.toFixed(2)} with your current supplies.`,
        variant: "destructive"
      });
      return;
    }

    // Update the asset
    const updatedAssets = learnModeData.assets.map(a => 
      a.symbol === assetSymbol 
        ? { ...a, balance: a.balance + borrowAmount, borrowed: a.borrowed + borrowAmount }
        : a
    );

    // Update portfolio
    const updatedPortfolio = {
      ...learnModeData.portfolio,
      borrowed: learnModeData.portfolio.borrowed + borrowValue,
      healthFactor: maxBorrowValue > 0 ? (learnModeData.portfolio.supplied * 0.8) / (learnModeData.portfolio.borrowed + borrowValue) : 0,
    };

    // Add transaction
    const newTransaction = {
      id: Date.now().toString(),
      type: 'borrow' as const,
      asset: assetSymbol,
      amount: borrowAmount,
      timestamp: new Date(),
    };

    updateLearnModeData({
      assets: updatedAssets,
      portfolio: updatedPortfolio,
      transactions: [...learnModeData.transactions, newTransaction],
    });

    toast({
      title: "💰 Borrow Successful!",
      description: `You borrowed ${borrowAmount} ${assetSymbol}. Watch your health factor!`,
    });

    completeModule('first-borrow');
    setAmount('');
  };

  const getHealthFactorColor = (factor: number) => {
    if (factor >= 2) return 'text-green-500';
    if (factor >= 1.5) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getExplanation = (type: string) => {
    const explanations = {
      supply: "Supplying is like depositing money in a high-yield savings account. Your crypto earns interest and can be used as collateral for borrowing. You can withdraw anytime (unless it's being used as collateral).",
      borrow: "Borrowing lets you take loans against your supplied assets. It's useful for leveraging positions or accessing liquidity without selling your crypto. You pay interest on borrowed amounts.",
      health: "Health Factor measures how safe your borrowing position is. It's calculated as: (Collateral Value × Liquidation Threshold) ÷ Borrowed Value. Above 2.0 is safe, below 1.0 means liquidation risk.",
      apy: "APY (Annual Percentage Yield) shows how much you earn or pay per year. Supply APY is what you earn, Borrow APY is what you pay. Rates change based on supply and demand."
    };
    return explanations[type as keyof typeof explanations] || '';
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card" data-tour="health-factor">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              Health Factor
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0"
                onClick={() => setShowExplanation(showExplanation === 'health' ? '' : 'health')}
              >
                <Lightbulb className="w-3 h-3" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-xl font-bold ${getHealthFactorColor(learnModeData.portfolio.healthFactor)}`}>
              {learnModeData.portfolio.healthFactor > 0 ? learnModeData.portfolio.healthFactor.toFixed(2) : '∞'}
            </p>
            <p className="text-xs text-muted-foreground">
              {learnModeData.portfolio.healthFactor >= 2 ? 'Safe' : 
               learnModeData.portfolio.healthFactor >= 1.5 ? 'Caution' : 
               learnModeData.portfolio.healthFactor > 0 ? 'Risk' : 'No Debt'}
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Net Worth</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-primary">
              ${(learnModeData.assets.reduce((sum, asset) => sum + (asset.balance * asset.price), 0)).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Virtual Portfolio</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Supplied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-green-500">
              ${learnModeData.portfolio.supplied.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Earning Interest</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Borrowed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-orange-500">
              ${learnModeData.portfolio.borrowed.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Paying Interest</p>
          </CardContent>
        </Card>
      </div>

      {/* Explanation Panel */}
      {showExplanation && (
        <Card className="glass-card border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold text-primary mb-2">Learn More</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {getExplanation(showExplanation)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Assets Table */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Your Virtual Assets
          </CardTitle>
          <CardDescription>
            Practice supplying and borrowing with these simulated assets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {learnModeData.assets.map((asset) => (
              <div key={asset.symbol} className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-semibold">{asset.symbol}</p>
                    <p className="text-sm text-muted-foreground">{asset.name}</p>
                  </div>
                  <div className="text-sm">
                    <p>Balance: <span className="font-medium">{asset.balance.toFixed(4)}</span></p>
                    <p>Supplied: <span className="font-medium text-green-500">{asset.supplied.toFixed(4)}</span></p>
                    <p>Borrowed: <span className="font-medium text-orange-500">{asset.borrowed.toFixed(4)}</span></p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Amount"
                    className="w-24"
                    value={selectedAsset === asset.symbol ? amount : ''}
                    onChange={(e) => {
                      setSelectedAsset(asset.symbol);
                      setAmount(e.target.value);
                    }}
                  />
                  <Button
                    size="sm"
                    onClick={() => handleSupply(asset.symbol, parseFloat(amount) || 0)}
                    className="btn-primary"
                    disabled={!amount || parseFloat(amount) <= 0}
                  >
                    Supply
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBorrow(asset.symbol, parseFloat(amount) || 0)}
                    disabled={!amount || parseFloat(amount) <= 0 || learnModeData.portfolio.supplied === 0}
                  >
                    Borrow
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* TradFi Comparison */}
      <Card className="glass-card border-blue-500/30 bg-blue-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-500 mb-2">Traditional Finance Comparison</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">DeFi Supply = Bank Deposit</p>
                  <p className="text-muted-foreground">Earn interest on your crypto assets</p>
                </div>
                <div>
                  <p className="font-medium">DeFi Borrow = Credit Line</p>
                  <p className="text-muted-foreground">Take loans against your assets</p>
                </div>
                <div>
                  <p className="font-medium">Health Factor = Credit Score</p>
                  <p className="text-muted-foreground">Measures your borrowing safety</p>
                </div>
                <div>
                  <p className="font-medium">APY = Interest Rate</p>
                  <p className="text-muted-foreground">Higher rates = higher returns/costs</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimulatedCryptoLending;
