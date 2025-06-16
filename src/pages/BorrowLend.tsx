import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import CryptoLending from '@/components/borrow/CryptoLending';
import StockLoans from '@/components/borrow/StockLoans';
import WalletGuard from '@/components/auth/WalletGuard';
import AILendingAssistant from '@/components/ai/AILendingAssistant';
import { DollarSign, TrendingUp, Shield, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BorrowLend = () => {
  const { toast } = useToast();

  const handleAIActionSuggestion = (action: string, params: any) => {
    console.log('AI Action:', action, params);
    
    switch (action) {
      case 'borrow':
        toast({
          title: "Redirecting to Borrow",
          description: `Setting up borrow for ${params.asset || 'selected asset'}`,
        });
        break;
      case 'connectWallet':
        toast({
          title: "Connect Wallet",
          description: "Please connect your wallet to get personalized advice",
        });
        break;
      case 'setAlert':
        toast({
          title: "Alert Set",
          description: `Liquidation alert set for health factor ${params.threshold}`,
        });
        break;
      case 'optimize':
        toast({
          title: "Optimization Applied",
          description: "Portfolio optimization suggestions applied",
        });
        break;
      case 'simulate':
        toast({
          title: "Simulation Started",
          description: "Running portfolio simulation...",
        });
        break;
      default:
        toast({
          title: "Action Triggered",
          description: `AI suggested action: ${action}`,
        });
    }
  };

  const previewContent = (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Total Supplied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">$142.3M</p>
            <p className="text-sm text-green-500">+5.2% this month</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Total Borrowed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$89.2M</p>
            <p className="text-sm text-blue-500">Active loans</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Avg. APY</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">5.8%</p>
            <p className="text-sm text-muted-foreground">Lending rate</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">12.4K</p>
            <p className="text-sm text-muted-foreground">Borrowers & Lenders</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-16">
          <h1 className="text-5xl font-bold gradient-text mb-6">
            Borrow & Lend
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Unlock liquidity from your crypto and stock portfolios
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            Borrow against your assets or lend to earn yield across both traditional and decentralized markets.
          </p>
        </section>

        <WalletGuard 
          title="Connect Wallet for Lending & Borrowing"
          description="Access comprehensive lending and borrowing features for both crypto and traditional assets."
          features={[
            "Borrow against crypto and stock portfolios",
            "Lend assets to earn competitive yields",
            "Access flash loans for arbitrage opportunities",
            "Manage all positions in one dashboard"
          ]}
          showPreview={true}
          previewContent={previewContent}
        >
          {/* Main Content Tabs */}
          <Tabs defaultValue="crypto" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="crypto">Crypto Lending</TabsTrigger>
              <TabsTrigger value="stocks">Stock Loans</TabsTrigger>
            </TabsList>

            <TabsContent value="crypto">
              <CryptoLending />
            </TabsContent>

            <TabsContent value="stocks">
              <StockLoans />
            </TabsContent>
          </Tabs>
        </WalletGuard>
      </div>

      {/* AI Lending Assistant */}
      <AILendingAssistant onActionSuggestion={handleAIActionSuggestion} />
    </div>
  );
};

export default BorrowLend;
