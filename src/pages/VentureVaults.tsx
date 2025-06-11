
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp, Shield, DollarSign, ArrowRight, CheckCircle, Info } from 'lucide-react';
import Header from '@/components/Header';
import CommunityVaults from '@/components/venture/CommunityVaults';

interface VentureVault {
  id: string;
  name: string;
  targetYield: string;
  split: string;
  status: 'Open' | 'Coming Soon';
  description: string;
  currentAPY: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

interface UserPosition {
  vaultName: string;
  amountSupplied: string;
  currentYield: string;
  projectExposure: string;
}

const VentureVaults = () => {
  const { toast } = useToast();
  const [depositAmount, setDepositAmount] = useState('');
  const [selectedVault, setSelectedVault] = useState<VentureVault | null>(null);

  const vaults: VentureVault[] = [
    {
      id: 'stable-growth',
      name: 'Stable Growth Vault',
      targetYield: '5.5%',
      split: '80% stable yield, 20% projects',
      status: 'Open',
      description: 'Conservative approach combining steady stablecoin yields with minimal exposure to vetted DeFi projects.',
      currentAPY: '5.2%',
      riskLevel: 'Low'
    },
    {
      id: 'web3-innovation',
      name: 'Web3 Innovation Vault',
      targetYield: '8-12%',
      split: '50% stable yield, 50% projects',
      status: 'Open',
      description: 'Balanced strategy offering moderate risk exposure to cutting-edge Web3 infrastructure and applications.',
      currentAPY: '10.8%',
      riskLevel: 'Medium'
    },
    {
      id: 'rwa-income',
      name: 'RWA Income Vault',
      targetYield: '6-9%',
      split: '70% stable yield, 30% tokenized RWAs',
      status: 'Coming Soon',
      description: 'Diversified exposure to real-world assets tokenized on-chain, combining traditional and crypto yields.',
      currentAPY: '7.1%',
      riskLevel: 'Medium'
    }
  ];

  const userPositions: UserPosition[] = [
    {
      vaultName: 'Stable Growth Vault',
      amountSupplied: '$5,000',
      currentYield: '5.2% APY',
      projectExposure: 'Compound (10%), Maker (10%)'
    },
    {
      vaultName: 'Web3 Innovation Vault',
      amountSupplied: '$2,500',
      currentYield: '10.8% APY',
      projectExposure: 'Polygon (25%), Chainlink (15%), The Graph (10%)'
    }
  ];

  const handleDeposit = (vault: VentureVault) => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid deposit amount.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Deposit Successful",
      description: `You supplied $${depositAmount} to ${vault.name}.`,
    });
    setDepositAmount('');
    setSelectedVault(null);
  };

  const handleWithdraw = (vaultName: string) => {
    toast({
      title: "Withdrawal Initiated",
      description: `Withdrawal initiated for ${vaultName}.`,
    });
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-16">
          <h1 className="text-5xl font-bold gradient-text mb-6">
            Aave Venture Vaults
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Earn Yield & Support the Next Wave of Web3
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            Combine base stablecoin yield with curated exposure to early-stage crypto projects — all on-chain and transparent.
          </p>
        </section>

        {/* Main Content Tabs */}
        <Tabs defaultValue="pre-vetted" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="pre-vetted">Pre-Vetted Vaults</TabsTrigger>
            <TabsTrigger value="community">Community Selection</TabsTrigger>
          </TabsList>

          <TabsContent value="pre-vetted" className="space-y-12">
            {/* Vault Selector */}
            <section>
              <h2 className="text-3xl font-bold text-center mb-8">Choose Your Venture Vault</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {vaults.map((vault) => (
                  <Card key={vault.id} className="glass-card hover-lift">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{vault.name}</CardTitle>
                        <Badge 
                          className={`${getRiskColor(vault.riskLevel)} border-0`}
                        >
                          {vault.riskLevel} Risk
                        </Badge>
                      </div>
                      <CardDescription>{vault.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Target Yield</span>
                          <span className="font-semibold text-primary">{vault.targetYield}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Current APY</span>
                          <span className="font-semibold">{vault.currentAPY}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <strong>Split:</strong> {vault.split}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2">
                        <Badge variant={vault.status === 'Open' ? 'default' : 'secondary'}>
                          {vault.status}
                        </Badge>
                        <div className="space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Info className="w-4 h-4 mr-1" />
                                Learn More
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{vault.name}</DialogTitle>
                                <DialogDescription>{vault.description}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Target Yield</Label>
                                    <p className="font-semibold text-primary">{vault.targetYield}</p>
                                  </div>
                                  <div>
                                    <Label>Risk Level</Label>
                                    <p className="font-semibold">{vault.riskLevel}</p>
                                  </div>
                                </div>
                                <div>
                                  <Label>Allocation Strategy</Label>
                                  <p>{vault.split}</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          {vault.status === 'Open' && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  className="btn-primary" 
                                  size="sm"
                                  onClick={() => setSelectedVault(vault)}
                                >
                                  Deposit
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Deposit to {vault.name}</DialogTitle>
                                  <DialogDescription>
                                    Enter the amount you'd like to deposit
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="amount">Amount (USD)</Label>
                                    <Input
                                      id="amount"
                                      type="number"
                                      placeholder="1000"
                                      value={depositAmount}
                                      onChange={(e) => setDepositAmount(e.target.value)}
                                    />
                                  </div>
                                  <Button 
                                    className="w-full btn-primary"
                                    onClick={() => handleDeposit(vault)}
                                  >
                                    Confirm Deposit
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* How It Works */}
            <section className="py-16">
              <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <DollarSign className="w-8 h-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">1. Supply Assets</h3>
                    <p className="text-muted-foreground">
                      Supply USDC, DAI, or GHO into your chosen Venture Vault.
                    </p>
                  </div>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">2. Strategic Allocation</h3>
                    <p className="text-muted-foreground">
                      Aave Vault strategy: part goes to base yield, part to curated projects.
                    </p>
                  </div>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">3. Earn & Withdraw</h3>
                    <p className="text-muted-foreground">
                      Earn yield + token upside — withdraw anytime (lockups vary per vault).
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Active Positions */}
            <section className="py-12">
              <h2 className="text-3xl font-bold mb-8">Your Venture Vault Positions</h2>
              <Card className="glass-card">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vault Name</TableHead>
                        <TableHead>Amount Supplied</TableHead>
                        <TableHead>Current Yield</TableHead>
                        <TableHead>Project Exposure</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userPositions.map((position, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{position.vaultName}</TableCell>
                          <TableCell>{position.amountSupplied}</TableCell>
                          <TableCell className="text-primary">{position.currentYield}</TableCell>
                          <TableCell className="text-sm">{position.projectExposure}</TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleWithdraw(position.vaultName)}
                            >
                              Withdraw
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="community">
            <CommunityVaults />
          </TabsContent>
        </Tabs>

        {/* Footer CTA */}
        <section className="py-16 text-center">
          <div className="glass-card p-12 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Discover more opportunities — powered by Aave
            </h2>
            <p className="text-muted-foreground mb-8">
              Explore our full range of Venture Vault strategies and find the perfect fit for your investment goals.
            </p>
            <Button className="btn-primary" size="lg">
              Explore Venture Vault Strategies
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VentureVaults;
