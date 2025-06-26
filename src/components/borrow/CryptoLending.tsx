import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import InsuranceModal from './InsuranceModal';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Shield, 
  AlertTriangle,
  Info,
  Zap,
  Target
} from 'lucide-react';

interface Asset {
  symbol: string;
  name: string;
  supplyAPY: number;
  borrowAPY: number;
  collateralFactor: number;
  liquidationThreshold: number;
  availableSupply: number;
  availableBorrow: number;
  riskScore: number;
}

const supplyAssets: Asset[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    supplyAPY: 4.25,
    borrowAPY: 6.80,
    collateralFactor: 80,
    liquidationThreshold: 85,
    availableSupply: 5240,
    availableBorrow: 3800,
    riskScore: 6.5
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    supplyAPY: 5.12,
    borrowAPY: 7.50,
    collateralFactor: 90,
    liquidationThreshold: 95,
    availableSupply: 8760,
    availableBorrow: 6500,
    riskScore: 5.8
  },
  {
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    supplyAPY: 3.80,
    borrowAPY: 6.20,
    collateralFactor: 75,
    liquidationThreshold: 80,
    availableSupply: 2890,
    availableBorrow: 1900,
    riskScore: 7.2
  },
  {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    supplyAPY: 4.80,
    borrowAPY: 7.20,
    collateralFactor: 85,
    liquidationThreshold: 90,
    availableSupply: 6320,
    availableBorrow: 4500,
    riskScore: 6.1
  }
];

const borrowAssets: Asset[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    supplyAPY: 4.25,
    borrowAPY: 6.80,
    collateralFactor: 80,
    liquidationThreshold: 85,
    availableSupply: 5240,
    availableBorrow: 3800,
    riskScore: 6.5
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    supplyAPY: 5.12,
    borrowAPY: 7.50,
    collateralFactor: 90,
    liquidationThreshold: 95,
    availableSupply: 8760,
    availableBorrow: 6500,
    riskScore: 5.8
  },
  {
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    supplyAPY: 3.80,
    borrowAPY: 6.20,
    collateralFactor: 75,
    liquidationThreshold: 80,
    availableSupply: 2890,
    availableBorrow: 1900,
    riskScore: 7.2
  }
];

const userPositions = [
  {
    symbol: 'ETH',
    supplied: 5.2,
    borrowed: 2.1,
    netAPY: 5.1
  },
  {
    symbol: 'USDC',
    supplied: 10000,
    borrowed: 3500,
    netAPY: 4.8
  }
];

const CryptoLending = () => {
  const { toast } = useToast();
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState<'supply' | 'borrow'>('supply');
  const [showInsurance, setShowInsurance] = useState(false);
  const [borrowAmount, setBorrowAmount] = useState(0);

  const getRiskLevel = (score: number) => {
    if (score < 6) return { level: 'Low', color: 'bg-green-500/20 text-green-400' };
    if (score < 7) return { level: 'Medium', color: 'bg-yellow-500/20 text-yellow-400' };
    return { level: 'High', color: 'bg-red-500/20 text-red-400' };
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toFixed(0);
  };

  const handleBorrow = (asset: Asset, borrowAmountValue: number) => {
    setBorrowAmount(borrowAmountValue);
    setSelectedAsset(asset);
    setShowInsurance(true);
  };

  const handleInsuranceConfirm = (insuranceId?: string) => {
    if (insuranceId) {
      toast({
        title: "Borrow with Insurance Complete",
        description: `Successfully borrowed $${borrowAmount} with ${insuranceId} protection`,
      });
    } else {
      toast({
        title: "Borrow Complete",
        description: `Successfully borrowed $${borrowAmount} without insurance`,
      });
    }
    setShowInsurance(false);
    setBorrowAmount(0);
    setSelectedAsset(null);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold mb-4 font-outfit">Decentralized Crypto Lending</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-space-grotesk">
          Supply crypto assets to earn interest or borrow against your collateral. 
          Access DeFi lending markets directly from your wallet.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card text-center">
          <CardContent className="py-6">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <h3 className="font-semibold mb-1 font-outfit">Total Value Supplied</h3>
            <p className="text-2xl font-bold">${formatNumber(12548750)}</p>
          </CardContent>
        </Card>

        <Card className="glass-card text-center">
          <CardContent className="py-6">
            <TrendingDown className="w-8 h-8 mx-auto mb-2 text-red-500" />
            <h3 className="font-semibold mb-1 font-outfit">Total Value Borrowed</h3>
            <p className="text-2xl font-bold">${formatNumber(4875320)}</p>
          </CardContent>
        </Card>

        <Card className="glass-card text-center">
          <CardContent className="py-6">
            <DollarSign className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <h3 className="font-semibold mb-1 font-outfit">Available Liquidity</h3>
            <p className="text-2xl font-bold">${formatNumber(7673430)}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="supply" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="supply">Supply Assets</TabsTrigger>
          <TabsTrigger value="borrow">Borrow Assets</TabsTrigger>
        </TabsList>

        <TabsContent value="supply">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supplyAssets.map((asset) => (
              <Card key={asset.symbol} className="glass-card hover-lift">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-outfit">{asset.name}</CardTitle>
                    <Badge className="bg-green-500 text-white">
                      {asset.supplyAPY}% APY
                    </Badge>
                  </div>
                  <CardDescription className="text-sm text-muted-foreground font-space-grotesk">
                    Earn interest by supplying {asset.name} to the lending pool
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor={`${asset.symbol}-supply`} className="text-sm">
                      Amount to Supply
                    </Label>
                    <Input
                      type="number"
                      id={`${asset.symbol}-supply`}
                      placeholder={`Enter ${asset.symbol} amount`}
                      className="bg-background border-input"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Available Supply:</span>
                      <p className="font-semibold">{formatNumber(asset.availableSupply)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Collateral Factor:</span>
                      <p className="font-semibold">{asset.collateralFactor}%</p>
                    </div>
                  </div>
                  <Button className="w-full btn-primary">
                    Supply {asset.symbol}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="borrow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {borrowAssets.map((asset) => (
              <Card key={asset.symbol} className="glass-card hover-lift">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-outfit">{asset.name}</CardTitle>
                    <Badge className="bg-orange-500 text-white">
                      {asset.borrowAPY}% APR
                    </Badge>
                  </div>
                  <CardDescription className="text-sm text-muted-foreground font-space-grotesk">
                    Borrow {asset.name} against your supplied collateral
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor={`${asset.symbol}-borrow`} className="text-sm">
                      Amount to Borrow
                    </Label>
                    <Input
                      type="number"
                      id={`${asset.symbol}-borrow`}
                      placeholder={`Enter ${asset.symbol} amount`}
                      className="bg-background border-input"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Available to Borrow:</span>
                      <p className="font-semibold">{formatNumber(asset.availableBorrow)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Liquidation Threshold:</span>
                      <p className="font-semibold">{asset.liquidationThreshold}%</p>
                    </div>
                  </div>
                  <Button 
                    className="w-full"
                    variant="outline"
                    onClick={() => handleBorrow(asset, 1000)} // Example amount
                  >
                    Borrow {asset.symbol}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Your Positions */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold font-outfit">Your Positions</h3>
        {userPositions.length === 0 ? (
          <Card className="glass-card">
            <CardContent className="text-center py-8">
              <Info className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
              <p className="text-lg font-semibold">No Active Positions</p>
              <p className="text-muted-foreground">Supply or borrow assets to view your positions</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userPositions.map((position) => (
              <Card key={position.symbol} className="glass-card">
                <CardHeader>
                  <CardTitle className="text-xl font-outfit">{position.symbol}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground font-space-grotesk">
                    Your current lending and borrowing position
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Supplied:</span>
                    <span className="font-semibold">{position.supplied}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Borrowed:</span>
                    <span className="font-semibold">{position.borrowed}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Net APY:</span>
                    <span className="font-semibold text-green-500">{position.netAPY}%</span>
                  </div>
                  <Button variant="secondary" className="w-full">
                    Manage Position
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <InsuranceModal
        isOpen={showInsurance}
        onClose={() => setShowInsurance(false)}
        borrowAmount={borrowAmount}
        asset={selectedAsset?.symbol || ''}
        onConfirm={handleInsuranceConfirm}
      />
    </div>
  );
};

export default CryptoLending;
