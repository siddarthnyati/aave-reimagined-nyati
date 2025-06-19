import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WalletGuard from '@/components/auth/WalletGuard';
import WalletOverview from '@/components/dashboard/WalletOverview';
import SupplySection from '@/components/dashboard/SupplySection';
import BorrowSection from '@/components/dashboard/BorrowSection';
import TransactionHistory from '@/components/dashboard/TransactionHistory';
import RewardsSection from '@/components/dashboard/RewardsSection';
import GovernanceSection from '@/components/dashboard/GovernanceSection';
import PortfolioAnalytics from '@/components/dashboard/PortfolioAnalytics';
import LearnModeBanner from '@/components/learn/LearnModeBanner';
import DashboardTourGuide from '@/components/learn/DashboardTourGuide';
import ContextualTooltip from '@/components/learn/ContextualTooltip';
import AILendingAssistant from '@/components/ai/AILendingAssistant';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLearnMode } from '@/contexts/LearnModeContext';
import { GraduationCap, Wallet, TrendingUp, History, Gift, Vote, BarChart3 } from 'lucide-react';

const Dashboard = () => {
  const { isLearnMode, toggleLearnMode } = useLearnMode();

  const previewContent = (
    <div className="container mx-auto px-4 py-8">
      <WalletOverview />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <LearnModeBanner />
        <DashboardTourGuide />
        
        <WalletGuard 
          title="Connect Wallet to View Dashboard"
          description="Access your complete DeFi portfolio, lending positions, and rewards in one unified dashboard."
          features={[
            "Track your complete DeFi portfolio value",
            "Monitor all lending and borrowing positions", 
            "View transaction history and performance analytics",
            "Access AI-powered strategy recommendations"
          ]}
          showPreview={true}
          previewContent={previewContent}
        >
          <div className="mb-8 flex justify-between items-start">
            <div>
              <ContextualTooltip
                title="Your DeFi Command Center"
                content="This dashboard gives you a complete view of your decentralized finance portfolio. Like a traditional investment account, but for crypto lending, borrowing, and yield farming."
                category="basics"
              >
                <h1 className="text-4xl font-bold mb-2">
                  <span className="gradient-text">Dashboard</span>
                </h1>
              </ContextualTooltip>
              <p className="text-muted-foreground">
                Your complete DeFi portfolio and activity center
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

          <div data-tour="portfolio-overview" className="mb-8">
            <WalletOverview />
          </div>

          <Tabs defaultValue="positions" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6 glass-card">
              <TabsTrigger value="positions" className="flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                <span className="hidden sm:inline">Positions</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="w-4 h-4" />
                <span className="hidden sm:inline">History</span>
              </TabsTrigger>
              <TabsTrigger value="rewards" className="flex items-center gap-2">
                <Gift className="w-4 h-4" />
                <span className="hidden sm:inline">Rewards</span>
              </TabsTrigger>
              <TabsTrigger value="governance" className="flex items-center gap-2">
                <Vote className="w-4 h-4" />
                <span className="hidden sm:inline">Governance</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="positions" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div data-tour="supply-section">
                  <ContextualTooltip
                    title="Supply Positions"
                    content="Your supplied assets earn interest and can be used as collateral. Think of this like a high-yield savings account that also enables borrowing."
                    category="basics"
                  >
                    <SupplySection />
                  </ContextualTooltip>
                </div>
                <div data-tour="borrow-section">
                  <ContextualTooltip
                    title="Borrow Positions"
                    content="Your borrowed positions show what you owe and the interest rates. Use borrowed funds for leverage, arbitrage, or accessing liquidity without selling assets."
                    category="advanced"
                  >
                    <BorrowSection />
                  </ContextualTooltip>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div data-tour="portfolio-analytics">
                <ContextualTooltip
                  title="Portfolio Analytics"
                  content="Deep dive into your DeFi portfolio performance with advanced metrics, risk analysis, and historical trends."
                  category="advanced"
                >
                  <PortfolioAnalytics />
                </ContextualTooltip>
              </div>
            </TabsContent>

            <TabsContent value="history">
              <div data-tour="transaction-history">
                <ContextualTooltip
                  title="Transaction History"
                  content="Complete record of all your DeFi transactions including supply, borrow, repay, and withdraw actions across all protocols."
                  category="basics"
                >
                  <TransactionHistory />
                </ContextualTooltip>
              </div>
            </TabsContent>

            <TabsContent value="rewards">
              <RewardsSection />
            </TabsContent>

            <TabsContent value="governance">
              <GovernanceSection />
            </TabsContent>
          </Tabs>
        </WalletGuard>
      </main>
      <Footer />
      <AILendingAssistant />
    </div>
  );
};

export default Dashboard;
