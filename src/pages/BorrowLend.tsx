
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CryptoLending from '@/components/borrow/CryptoLending';
import StockLoans from '@/components/borrow/StockLoans';
import CryptoStockConnection from '@/components/borrow/CryptoStockConnection';
import BrokerageConnection from '@/components/borrow/BrokerageConnection';
import WalletGuard from '@/components/auth/WalletGuard';
import LearnModeBanner from '@/components/learn/LearnModeBanner';
import TourGuide from '@/components/learn/TourGuide';
import SimulatedTradingEnvironment from '@/components/learn/SimulatedTradingEnvironment';
import ContextualTooltip from '@/components/learn/ContextualTooltip';
import AILendingAssistant from '@/components/ai/AILendingAssistant';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLearnMode } from '@/contexts/LearnModeContext';
import { GraduationCap, Coins, TrendingUp, Building2, PlayCircle } from 'lucide-react';

const BorrowLend = () => {
  const { isLearnMode, toggleLearnMode } = useLearnMode();

  const previewContent = (
    <div className="container mx-auto px-4 py-8">
      <CryptoLending />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <LearnModeBanner />
        <TourGuide />
        
        <div className="mb-8 flex justify-between items-start">
          <div>
            <ContextualTooltip
              title="Borrow & Lend Hub"
              content="This is your gateway to decentralized lending protocols. Earn interest by supplying assets, or borrow against your collateral for leverage and liquidity."
              category="basics"
            >
              <h1 className="text-4xl font-bold mb-2">
                <span className="gradient-text">Borrow & Lend</span>
              </h1>
            </ContextualTooltip>
            <p className="text-muted-foreground">
              Access liquidity through crypto lending and stock-backed borrowing
            </p>
          </div>
          
          <Button
            variant={isLearnMode ? "default" : "outline"}
            onClick={toggleLearnMode} 
            className="flex items-center gap-2"
          >
            <GraduationCap className="w-4 h-4" />
            {isLearnMode ? (
              <>
                Learn Mode
                <Badge variant="secondary" className="ml-1 bg-green-500/20 text-green-600">
                  ON
                </Badge>
              </>
            ) : (
              'Learn Mode'
            )}
          </Button>
        </div>

        <WalletGuard 
          title="Connect Wallet for Lending Access"
          description="Access decentralized lending protocols and stock-backed borrowing opportunities."
          features={[
            "Earn yield on crypto deposits up to 12% APY",
            "Borrow against crypto collateral at competitive rates",
            "Access stock-backed loans and lending",
            "Automated yield optimization strategies"
          ]}
          showPreview={true}
          previewContent={previewContent}
        >
          <Tabs defaultValue="crypto-lending" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 glass-card">
              <TabsTrigger value="crypto-lending" className="flex items-center gap-2">
                <ContextualTooltip
                  title="Crypto Lending"
                  content="Earn interest by supplying crypto assets to lending pools. Your assets are lent to borrowers who pay interest, which you earn as yield."
                  category="basics"
                >
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4" />
                    Crypto Lending
                  </div>
                </ContextualTooltip>
              </TabsTrigger>
              <TabsTrigger value="stock-loans" className="flex items-center gap-2">
                <ContextualTooltip
                  title="Stock-Backed Loans"
                  content="Borrow against your stock portfolio or lend to others using stocks as collateral. Access liquidity without selling your equity positions."
                  category="advanced"
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Stock-Backed Loans
                  </div>
                </ContextualTooltip>
              </TabsTrigger>
              <TabsTrigger value="connections" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Connections
              </TabsTrigger>
              <TabsTrigger value="simulator" className="flex items-center gap-2">
                <ContextualTooltip
                  title="Trading Simulator"
                  content="Practice DeFi lending and borrowing strategies in realistic market conditions without risking real money. Perfect for learning and testing strategies."
                  category="strategy"
                >
                  <div className="flex items-center gap-2">
                    <PlayCircle className="w-4 h-4" />
                    Simulator
                  </div>
                </ContextualTooltip>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="crypto-lending">
              <CryptoLending />
            </TabsContent>

            <TabsContent value="stock-loans">
              <StockLoans />
            </TabsContent>

            <TabsContent value="connections" className="space-y-8">
              <CryptoStockConnection />
              <BrokerageConnection />
            </TabsContent>

            <TabsContent value="simulator">
              <SimulatedTradingEnvironment />
            </TabsContent>
          </Tabs>
        </WalletGuard>
      </main>
      <Footer />
      <AILendingAssistant />
    </div>
  );
};

export default BorrowLend;
