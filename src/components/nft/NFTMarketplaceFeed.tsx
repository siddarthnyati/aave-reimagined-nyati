import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Filter, Grid3X3, List, Heart, Clock, TrendingUp, ArrowLeft } from 'lucide-react';
import NFTDetailModal from './NFTDetailModal';
import { NFTItem } from '@/types/nft';

interface NFTMarketplaceFeedProps {
  onBack: () => void;
}

const NFTMarketplaceFeed = ({ onBack }: NFTMarketplaceFeedProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('floor-price');
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [interestRange, setInterestRange] = useState([5, 25]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedNFT, setSelectedNFT] = useState<NFTItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const allNFTs: NFTItem[] = [
    {
      id: 1,
      name: 'Abstract Genesis #3456',
      collection: 'Abstract Genesis',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop',
      loanAmount: '4.2 ETH',
      maxLoan: '5.8 ETH',
      floorPrice: '8.1 ETH',
      interest: '15% APR',
      duration: '30 days',
      lender: '0x1234...5678',
      status: 'Available',
      loanProgress: 0,
      activeUntil: '2024-07-15'
    },
    {
      id: 2,
      name: 'Digital Dreams #7890',
      collection: 'Digital Dreams',
      image: 'https://images.unsplash.com/photo-1551913902-c92207136625?w=400&h=400&fit=crop',
      loanAmount: '8.5 ETH',
      maxLoan: '12.1 ETH',
      floorPrice: '17.3 ETH',
      interest: '12% APR',
      duration: '45 days',
      lender: '0x9876...5432',
      status: 'Active Loan',
      loanProgress: 60,
      activeUntil: '2024-06-28'
    },
    {
      id: 7,
      name: 'CyberPunks #1234',
      collection: 'CyberPunks',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop',
      loanAmount: '45.2 ETH',
      maxLoan: '62.8 ETH',
      floorPrice: '89.7 ETH',
      interest: '8% APR',
      duration: '60 days',
      lender: '0x1111...2222',
      status: 'Available',
      loanProgress: 0,
      activeUntil: null
    },
    {
      id: 8,
      name: 'Bored Ape #5678',
      collection: 'Bored Ape Yacht Club',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
      loanAmount: '35.8 ETH',
      maxLoan: '49.7 ETH',
      floorPrice: '71.0 ETH',
      interest: '9% APR',
      duration: '45 days',
      lender: '0x3333...4444',
      status: 'Available',
      loanProgress: 0,
      activeUntil: null
    }
  ];

  const collections = ['all', 'Abstract Genesis', 'Digital Dreams', 'CyberPunks', 'Bored Ape Yacht Club', 'Neon Patterns', 'Cosmic Waves'];

  const filteredNFTs = allNFTs.filter(nft => {
    if (searchTerm && !nft.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !nft.collection.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (selectedCollection !== 'all' && nft.collection !== selectedCollection) {
      return false;
    }
    const floorValue = parseFloat(nft.floorPrice.replace(' ETH', ''));
    if (floorValue < priceRange[0] || floorValue > priceRange[1]) {
      return false;
    }
    const interestValue = parseFloat(nft.interest.replace('% APR', ''));
    if (interestValue < interestRange[0] || interestValue > interestRange[1]) {
      return false;
    }
    return true;
  });

  const toggleFavorite = (nftId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(nftId)) {
      newFavorites.delete(nftId);
    } else {
      newFavorites.add(nftId);
    }
    setFavorites(newFavorites);
  };

  const handleNFTClick = (nft: NFTItem) => {
    setSelectedNFT(nft);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Overview
        </Button>
        <div>
          <h2 className="text-2xl font-bold">NFT Lending Marketplace</h2>
          <p className="text-muted-foreground">{filteredNFTs.length} NFTs available for lending</p>
        </div>
      </div>

      {/* Filters & Controls */}
      <Card className="p-4">
        <div className="space-y-4">
          {/* Search and View Controls */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search NFTs or collections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="floor-price">Floor Price</SelectItem>
                <SelectItem value="loan-amount">Loan Amount</SelectItem>
                <SelectItem value="interest-rate">Interest Rate</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
                <SelectItem value="recently-added">Recently Added</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Collection</label>
              <Select value={selectedCollection} onValueChange={setSelectedCollection}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {collections.map(collection => (
                    <SelectItem key={collection} value={collection}>
                      {collection === 'all' ? 'All Collections' : collection}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Floor Price: {priceRange[0]} - {priceRange[1]} ETH
              </label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={100}
                step={1}
                className="mt-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Interest Rate: {interestRange[0]}% - {interestRange[1]}%
              </label>
              <Slider
                value={interestRange}
                onValueChange={setInterestRange}
                max={30}
                min={5}
                step={1}
                className="mt-2"
              />
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* NFT Grid/List */}
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" 
        : "space-y-4"
      }>
        {filteredNFTs.map((nft) => (
          <Card 
            key={nft.id}
            className="metric-card hover:border-primary/50 transition-all duration-300 cursor-pointer group"
            onClick={() => handleNFTClick(nft)}
          >
            <CardContent className="p-4">
              {viewMode === 'grid' ? (
                <>
                  <AspectRatio ratio={1} className="mb-4 relative overflow-hidden rounded-lg">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-8 h-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(nft.id);
                        }}
                      >
                        <Heart className={`w-4 h-4 ${favorites.has(nft.id) ? 'fill-current text-red-500' : ''}`} />
                      </Button>
                      {nft.status === 'Active Loan' && (
                        <Badge variant="secondary" className="text-xs">
                          Active
                        </Badge>
                      )}
                    </div>
                  </AspectRatio>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold truncate">{nft.name}</h3>
                      <p className="text-sm text-muted-foreground">{nft.collection}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Floor</span>
                        <span className="font-semibold">{nft.floorPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Max Loan</span>
                        <span className="font-semibold text-primary">{nft.maxLoan}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Interest</span>
                        <span className="font-semibold">{nft.interest}</span>
                      </div>
                    </div>

                    <Button size="sm" className="w-full btn-primary">
                      {nft.status === 'Available' ? 'View Details' : 'View Loan'}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex gap-4">
                  <div className="w-20 h-20 relative overflow-hidden rounded-lg flex-shrink-0">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold truncate">{nft.name}</h3>
                        <p className="text-sm text-muted-foreground">{nft.collection}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-8 h-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(nft.id);
                        }}
                      >
                        <Heart className={`w-4 h-4 ${favorites.has(nft.id) ? 'fill-current text-red-500' : ''}`} />
                      </Button>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Floor:</span>
                        <p className="font-semibold">{nft.floorPrice}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Max Loan:</span>
                        <p className="font-semibold text-primary">{nft.maxLoan}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Interest:</span>
                        <p className="font-semibold">{nft.interest}</p>
                      </div>
                      <div>
                        <Badge variant={nft.status === 'Available' ? 'default' : 'secondary'}>
                          {nft.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <NFTDetailModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        nft={selectedNFT}
      />
    </div>
  );
};

export default NFTMarketplaceFeed;
