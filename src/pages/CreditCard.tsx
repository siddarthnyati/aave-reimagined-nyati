
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WalletGuard from '@/components/auth/WalletGuard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ShoppingTabs from '@/components/credit/ShoppingTabs';
import MerchantGrid from '@/components/credit/MerchantGrid';
import FeaturedPromotion from '@/components/credit/FeaturedPromotion';
import RewardsAggregator from '@/components/credit/RewardsAggregator';
import { Wallet, ShoppingBag } from 'lucide-react';

const CreditCardPage = () => {
  const previewContent = (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="gradient-text">Crypto Rewards Hub</span>
        </h1>
        <p className="text-muted-foreground">
          Aggregate your crypto card rewards and optimize yields with DeFi strategies
        </p>
      </div>
      <FeaturedPromotion />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <WalletGuard 
          title="Connect Wallet for Crypto Rewards Optimization"
          description="Access your crypto rewards aggregator, optimize yields with Aave, and shop at partner merchants."
          features={[
            "Aggregate rewards from all crypto cards",
            "Get AI-powered yield optimization suggestions",
            "Auto-convert and deposit to earn up to 6.2% APY",
            "Track rewards from Coinbase, Crypto.com & more"
          ]}
          showPreview={true}
          previewContent={previewContent}
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              <span className="gradient-text">Crypto Rewards Hub</span>
            </h1>
            <p className="text-muted-foreground">
              Aggregate your crypto card rewards and optimize yields with DeFi strategies
            </p>
          </div>

          <Tabs defaultValue="aggregator" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 glass-card">
              <TabsTrigger value="aggregator" className="flex items-center gap-2 font-space-grotesk">
                <Wallet className="w-4 h-4" />
                Rewards Aggregator
              </TabsTrigger>
              <TabsTrigger value="shopping" className="flex items-center gap-2 font-space-grotesk">
                <ShoppingBag className="w-4 h-4" />
                Shopping & Cards
              </TabsTrigger>
            </TabsList>

            <TabsContent value="aggregator">
              <RewardsAggregator />
            </TabsContent>

            <TabsContent value="shopping" className="space-y-8">
              <FeaturedPromotion />
              <ShoppingTabs />
              <MerchantGrid />
            </TabsContent>
          </Tabs>
        </WalletGuard>
      </main>
      <Footer />
    </div>
  );
};

export default CreditCardPage;
