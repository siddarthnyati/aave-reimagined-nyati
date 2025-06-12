
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WalletGuard from '@/components/auth/WalletGuard';
import ShoppingTabs from '@/components/credit/ShoppingTabs';
import MerchantGrid from '@/components/credit/MerchantGrid';
import FeaturedPromotion from '@/components/credit/FeaturedPromotion';
import RewardsOverview from '@/components/credit/RewardsOverview';
import { CreditCard, Gift, Zap, Send } from 'lucide-react';

const CreditCardPage = () => {
  const previewContent = (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="gradient-text">Credit Card & Shopping</span>
        </h1>
        <p className="text-muted-foreground">
          Earn GHO tokens on every purchase with our DeFi rewards credit card
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
          title="Connect Wallet for Credit Card Rewards"
          description="Access your DeFi credit card, earn GHO rewards on purchases, and shop at partner merchants."
          features={[
            "Earn up to 5% back in GHO tokens",
            "Shop at 1000+ partner merchants",
            "Instant rewards with no annual fee",
            "Convert rewards to any crypto instantly"
          ]}
          showPreview={true}
          previewContent={previewContent}
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              <span className="gradient-text">Credit Card & Shopping</span>
            </h1>
            <p className="text-muted-foreground">
              Earn GHO tokens on every purchase with our DeFi rewards credit card
            </p>
          </div>

          <RewardsOverview />
          <FeaturedPromotion />
          <ShoppingTabs />
          <MerchantGrid />
        </WalletGuard>
      </main>
      <Footer />
    </div>
  );
};

export default CreditCardPage;
