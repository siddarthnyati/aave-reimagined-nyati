
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NFTPortfolio from '@/components/nft/NFTPortfolio';
import NFTMarketplace from '@/components/nft/NFTMarketplace';
import CollectionStats from '@/components/nft/CollectionStats';
import WalletGuard from '@/components/auth/WalletGuard';
import LearnModeBanner from '@/components/learn/LearnModeBanner';
import TourGuide from '@/components/learn/TourGuide';
import AILendingAssistant from '@/components/ai/AILendingAssistant';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLearnMode } from '@/contexts/LearnModeContext';
import { GraduationCap } from 'lucide-react';

const NFTLending = () => {
  const { isLearnMode, toggleLearnMode } = useLearnMode();

  const previewContent = (
    <div className="container mx-auto px-4 py-8">
      <CollectionStats />
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
            <h1 className="text-4xl font-bold mb-2">
              <span className="gradient-text">NFT Lending</span>
            </h1>
            <p className="text-muted-foreground">
              Unlock liquidity from your NFT collection without selling
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
          title="Connect Wallet for NFT Lending"
          description="Access your NFT portfolio and unlock liquidity from your collection without selling."
          features={[
            "View your complete NFT portfolio",
            "Borrow against blue-chip NFTs",
            "Access instant liquidity without selling",
            "Competitive loan terms and rates"
          ]}
          showPreview={true}
          previewContent={previewContent}
        >
          <div data-tour="collection-stats">
            <CollectionStats />
          </div>
          <div data-tour="nft-portfolio">
            <NFTPortfolio />
          </div>
          <div data-tour="nft-marketplace">
            <NFTMarketplace />
          </div>
        </WalletGuard>
      </main>
      <Footer />
      <AILendingAssistant />
    </div>
  );
};

export default NFTLending;
