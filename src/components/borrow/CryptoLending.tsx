
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Zap, TrendingUp, Shield, Calculator, AlertTriangle } from 'lucide-react';

interface CryptoAsset {
  symbol: string;
  name: string;
  balance: number;
  price: number;
  ltv: number;
  supplyAPY: string;
  borrowAPY: string;
  icon: string;
}

const CryptoLending = () => {
  const { toast } = useToast();
  const [selectedAsset, setSelectedAsset] = useState<CryptoAsset | null>(null);
  const [amount, setAmount] = useState('');
  const [healthFactor, setHealthFactor] = useState(2.45);

  const assets: CryptoAsset[] = [
    { symbol: 'ETH', name: 'Ethereum', balance: 5.2, price: 3200, ltv: 80, supplyAPY: '3.2%', borrowAPY: '4.8%', icon: '🔷' },
    { symbol: 'BTC', name: 'Bitcoin', balance: 0.8, price: 65000, ltv: 75, supplyAPY: '2.8%', borrowAPY: '5.2%', icon: '₿' },
    { symbol: 'USDC', name: 'USD Coin', balance: 15000, price: 1, ltv: 90, supplyAPY: '4.5%', borrowAPY: '6.1%', icon: '💵' },
    { symbol: 'LINK', name: 'Chainlink', balance: 1200, price: 15, ltv: 70, supplyAPY: '2.1%', borrowAPY: '7.3%', icon: '🔗' },
    { symbol: 'UNI', name: 'Uniswap', balance: 800, price: 8, ltv: 65, supplyAPY: '1.8%', borrowAPY: '8.5%', icon: '🦄' },
    { symbol: 'AAVE', name: 'Aave', balance: 150, price: 120, ltv: 70, supplyAPY: '2.5%', borrowAPY: '6.8%', icon: '👻' }
  ];

  const handleSupply = (asset: CryptoAsset) => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to supply.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Supply Successful",
      description: `You supplied ${amount} ${asset.symbol} and can now borrow against it.`,
    });
    setAmount('');
  };

  const handleBorrow = (asset: CryptoAsset) => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to borrow.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Borrow Successful",
      description: `You borrowed ${amount} ${asset.symbol}. Monitor your health factor.`,
    });
    setAmount('');
  };

  const getHealthFactorColor = (factor: number) => {
    if (factor >= 2) return 'text-green-500';
    if (factor >= 1.5) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-8">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Net Worth</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">$142,340</p>
            <p className="text-sm text-muted-foreground">+$2,850 (2.04%)</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Supplied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$89,200</p>
            <p className="text-sm text-green-500">Earning 3.4% APY</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Borrowed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$35,600</p>
            <p className="text-sm text-orange-500">Paying 5.8% APY</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              Health Factor
              {healthFactor < 1.5 && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${getHealthFactorColor(healthFactor)}`}>
              {healthFactor.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground">
              {healthFactor >= 2 ? 'Safe' : healthFactor >= 1.5 ? 'Caution' : 'Risk'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Lending Interface */}
      <Tabs defaultValue="supply" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="supply">Supply</TabsTrigger>
          <TabsTrigger value="borrow">Borrow</TabsTrigger>
          <TabsTrigger value="flash">Flash Loans</TabsTrigger>
        </TabsList>

        <TabsContent value="supply" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Supply Assets</CardTitle>
              <CardDescription>
                Supply your crypto assets to earn yield and use them as collateral
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset</TableHead>
                    <TableHead>Wallet Balance</TableHead>
                    <TableHead>APY</TableHead>
                    <TableHead>Max LTV</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map((asset) => (
                    <TableRow key={asset.symbol}>
                      <TableCell className="flex items-center gap-2">
                        <span className="text-lg">{asset.icon}</span>
                        <div>
                          <p className="font-medium">{asset.symbol}</p>
                          <p className="text-sm text-muted-foreground">{asset.name}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{asset.balance} {asset.symbol}</p>
                          <p className="text-sm text-muted-foreground">
                            ${(asset.balance * asset.price).toLocaleString()}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-green-600">
                          {asset.supplyAPY}
                        </Badge>
                      </TableCell>
                      <TableCell>{asset.ltv}%</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="Amount"
                            className="w-20"
                            value={selectedAsset?.symbol === asset.symbol ? amount : ''}
                            onChange={(e) => {
                              setSelectedAsset(asset);
                              setAmount(e.target.value);
                            }}
                          />
                          <Button 
                            size="sm" 
                            onClick={() => handleSupply(asset)}
                            className="btn-primary"
                          >
                            Supply
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="borrow" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Borrow Assets</CardTitle>
              <CardDescription>
                Borrow against your supplied collateral
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset</TableHead>
                    <TableHead>Available to Borrow</TableHead>
                    <TableHead>APY</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map((asset) => (
                    <TableRow key={asset.symbol}>
                      <TableCell className="flex items-center gap-2">
                        <span className="text-lg">{asset.icon}</span>
                        <div>
                          <p className="font-medium">{asset.symbol}</p>
                          <p className="text-sm text-muted-foreground">{asset.name}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{(asset.balance * 0.6).toFixed(2)} {asset.symbol}</p>
                          <p className="text-sm text-muted-foreground">
                            ${((asset.balance * 0.6) * asset.price).toLocaleString()}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-orange-600">
                          {asset.borrowAPY}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="Amount"
                            className="w-20"
                            value={selectedAsset?.symbol === asset.symbol ? amount : ''}
                            onChange={(e) => {
                              setSelectedAsset(asset);
                              setAmount(e.target.value);
                            }}
                          />
                          <Button 
                            size="sm" 
                            onClick={() => handleBorrow(asset)}
                            variant="outline"
                          >
                            Borrow
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flash" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Flash Loans
              </CardTitle>
              <CardDescription>
                Borrow instantly without collateral for arbitrage and liquidations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="flashAmount">Amount</Label>
                    <Input id="flashAmount" placeholder="10000" />
                  </div>
                  <div>
                    <Label htmlFor="flashAsset">Asset</Label>
                    <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2">
                      <option>USDC</option>
                      <option>ETH</option>
                      <option>DAI</option>
                    </select>
                  </div>
                  <Button className="w-full btn-primary">
                    Execute Flash Loan
                  </Button>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Available Strategies</h4>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium">Arbitrage Opportunity</p>
                      <p className="text-sm text-muted-foreground">ETH price difference: 0.3%</p>
                      <p className="text-sm text-green-500">Potential profit: $150</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium">Liquidation Opportunity</p>
                      <p className="text-sm text-muted-foreground">Unhealthy position detected</p>
                      <p className="text-sm text-green-500">Potential profit: $280</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CryptoLending;
