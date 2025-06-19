
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WalletOverview from '@/components/dashboard/WalletOverview';
import SupplySection from '@/components/dashboard/SupplySection';
import BorrowSection from '@/components/dashboard/BorrowSection';
import TransactionHistory from '@/components/dashboard/TransactionHistory';
import GovernanceSection from '@/components/dashboard/GovernanceSection';
import RewardsSection from '@/components/dashboard/RewardsSection';
import PortfolioAnalytics from '@/components/dashboard/PortfolioAnalytics';
import WalletGuard from '@/components/auth/WalletGuard';
import TrustGraphScore from '@/components/trustgraph/TrustGraphScore';
import LearnModeBanner from '@/components/learn/LearnModeBanner';
import TourGuide from '@/components/learn/TourGuide';
import AILendingAssistant from '@/components/ai/AILendingAssistant';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, DollarSign, PieChart, BarChart3, Shield } from 'lucide-react';
import { getUserTrustGraphData } from '@/lib/trustgraph';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Dashboard = () => {
  const trustGraphData = getUserTrustGraphData();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get tab from URL params, default to 'overview'
  const currentTab = searchParams.get('tab') || 'overview';

  const handleTabChange = (value: string) => {
    navigate(`/dashboard?tab=${value}`, { replace: true });
  };

  const handleTrustGraphClick = () => {
    navigate('/dashboard?tab=analytics&focus=trustgraph');
  };

  const previewContent = (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="gradient-text">Dashboard</span>
        </h1>
        <p className="text-muted-foreground">
          Manage your portfolio and track your DeFi activities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-tour="portfolio-cards">
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Net Worth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">$142,340</p>
            <p className="text-sm text-muted-foreground">+$2,850 (2.04%)</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$89,200</p>
            <p className="text-sm text-green-500">+5.2%</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Active Loans</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$35,600</p>
            <p className="text-sm text-orange-500">3 positions</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">TrustGraph Score</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{trustGraphData.score}</p>
            <p className="text-sm text-muted-foreground">{trustGraphData.grade} - {trustGraphData.tier}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <LearnModeBanner />
        <TourGuide />
        
        <WalletGuard 
          title="Connect Wallet to View Dashboard"
          description="Access your complete portfolio overview and manage all your DeFi positions in one place."
          features={[
            "View complete portfolio analytics",
            "Track all lending and borrowing positions", 
            "Monitor real-time yields and returns",
            "Access transaction history and reports"
          ]}
          showPreview={true}
          previewContent={previewContent}
        >
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="gradient-text">Dashboard</span>
              </h1>
              <p className="text-muted-foreground">
                Manage your portfolio and track your DeFi activities
              </p>
            </div>
            <TrustGraphScore 
              score={trustGraphData.score} 
              onClick={handleTrustGraphClick}
            />
          </div>

          <Tabs value={currentTab} onValueChange={handleTabChange} className="space-y-8">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="governance">Governance</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div data-tour="portfolio-cards">
                <WalletOverview />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div data-tour="supply-section">
                  <SupplySection />
                </div>
                <div data-tour="borrow-section">
                  <BorrowSection />
                </div>
              </div>
              <TransactionHistory />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-8">
              <div data-tour="health-factor">
                <PortfolioAnalytics />
              </div>
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-8">
              <WalletOverview />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SupplySection />
                <BorrowSection />
              </div>
            </TabsContent>

            <TabsContent value="governance" className="space-y-8">
              <GovernanceSection />
            </TabsContent>

            <TabsContent value="rewards" className="space-y-8">
              <RewardsSection />
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
