
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';
import NFTTraits from './NFTTraits';
import { NFTItem, TraitItem } from '@/types/nft';

interface NFTImageSectionProps {
  nft: NFTItem;
}

const NFTImageSection = ({ nft }: NFTImageSectionProps) => {
  const traits: TraitItem[] = [
    { trait: 'Background', value: 'Cosmic Blue', rarity: '12%' },
    { trait: 'Pattern', value: 'Geometric', rarity: '8%' },
    { trait: 'Color Scheme', value: 'Neon', rarity: '15%' },
    { trait: 'Style', value: 'Abstract', rarity: '25%' }
  ];

  return (
    <div className="space-y-4">
      <AspectRatio ratio={1} className="relative overflow-hidden rounded-lg">
        <img
          src={nft.image}
          alt={nft.name}
          className="w-full h-full object-cover"
        />
        {nft.status === 'Active Loan' && nft.loanProgress && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3">
            <div className="flex justify-between items-center text-white text-sm mb-2">
              <span>Loan Progress</span>
              <span>{nft.loanProgress}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${nft.loanProgress}%` }}
              />
            </div>
          </div>
        )}
      </AspectRatio>
      
      {/* Collection Info */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2">{nft.collection}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Floor Price</p>
              <p className="text-lg font-bold">{nft.floorPrice}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Max Loan (70%)</p>
              <p className="text-lg font-bold text-primary">{nft.maxLoan}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Best Offer</p>
              <p className="text-lg font-bold">6.2 ETH</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Rarity Rank</p>
              <p className="text-lg font-bold">#324</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <NFTTraits traits={traits} />
    </div>
  );
};

export default NFTImageSection;
