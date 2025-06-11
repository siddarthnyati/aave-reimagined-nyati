
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NFTPortfolio from '@/components/nft/NFTPortfolio';
import NFTMarketplace from '@/components/nft/NFTMarketplace';
import CollectionStats from '@/components/nft/CollectionStats';

const NFTLending = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">NFT Lending</span>
          </h1>
          <p className="text-muted-foreground">
            Unlock liquidity from your NFT collection without selling
          </p>
        </div>

        <CollectionStats />
        <NFTPortfolio />
        <NFTMarketplace />
      </main>
      <Footer />
    </div>
  );
};

export default NFTLending;
