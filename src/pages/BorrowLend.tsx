
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CryptoLending from '@/components/borrow/CryptoLending';
import StockLoans from '@/components/borrow/StockLoans';
import AILendingAssistant from '@/components/ai/AILendingAssistant';
import WalletGuard from '@/components/auth/WalletGuard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, DollarSign, Coins, Building2 } from 'lucide-react';

const BorrowLend = () => {
  const handleAIAction = (action: string, params: any) => {
    console.log('AI Action triggered:', action, params);
    // Handle AI assistant actions here - could navigate to specific lending opportunities,
    // pre-fill forms, or trigger specific strategies
  };

  const previewContent = (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="gradient-text">Borrow & Lend</span>
        </h1>
        <p className="text-muted-foreground">
          Access crypto lending and stock-backed loans
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Best Rates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">4.2%</p>
            <p className="text-sm text-muted-foreground">USDC Lending</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Total Borrowed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$45,600</p>
            <p className="text-sm text-orange-500">Across 5 positions</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Available Credit</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$89,200</p>
            <p className="text-sm text-green-500">Ready to borrow</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <WalletGuard 
          title="Connect Wallet for Lending Services"
          description="Access advanced crypto lending and stock-backed loan options with competitive rates."
          features={[
            "Borrow against crypto collateral at competitive rates",
            "Lend crypto assets for passive income",
            "Use traditional stocks as collateral for crypto loans",
            "Access institutional-grade risk management"
          ]}
          showPreview={true}
          previewContent={previewContent}
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              <span className="gradient-text">Borrow & Lend</span>
            </h1>
            <p className="text-muted-foreground">
              Access crypto lending and stock-backed loans with institutional-grade security
            </p>
          </div>

          <Tabs defaultValue="crypto" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="crypto" className="flex items-center gap-2">
                <Coins className="w-4 h-4" />
                Crypto Lending
              </TabsTrigger>
              <TabsTrigger value="stocks" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Stock-Backed Loans
              </TabsTrigger>
            </TabsList>

            <TabsContent value="crypto">
              <CryptoLending />
            </TabsContent>

            <TabsContent value="stocks">
              <StockLoans />
            </TabsContent>
          </Tabs>
        </WalletGuard>
      </main>
      <Footer />
      
      {/* AI Assistant - Available to help with lending decisions */}
      <AILendingAssistant onActionSuggestion={handleAIAction} />
    </div>
  );
};

export default BorrowLend;
