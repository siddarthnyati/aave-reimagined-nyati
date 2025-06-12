import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Search, Filter, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import NFTDetailModal from './NFTDetailModal';
import NFTMarketplaceFeed from './NFTMarketplaceFeed';

const NFTMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('floor-price');
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFeed, setShowFeed] = useState(false);

  const availableLoans = [
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
      id: 3,
      name: 'Neon Patterns #2345',
      collection: 'Neon Patterns',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
      loanAmount: '2.8 ETH',
      maxLoan: '3.9 ETH',
      floorPrice: '5.6 ETH',
      interest: '18% APR',
      duration: '21 days',
      lender: '0x5555...3333',
      status: 'Available',
      loanProgress: 0,
      activeUntil: null
    },
    {
      id: 4,
      name: 'Cosmic Waves #6789',
      collection: 'Cosmic Waves',
      image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=400&h=400&fit=crop',
      loanAmount: '12.1 ETH',
      maxLoan: '16.8 ETH',
      floorPrice: '24.0 ETH',
      interest: '10% APR',
      duration: '60 days',
      lender: '0x7777...1111',
      status: 'Available',
      loanProgress: 0,
      activeUntil: null
    },
    {
      id: 5,
      name: 'Ethereal Forms #1122',
      collection: 'Ethereal Forms',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
      loanAmount: '6.7 ETH',
      maxLoan: '9.2 ETH',
      floorPrice: '13.1 ETH',
      interest: '14% APR',
      duration: '35 days',
      lender: '0x3333...7777',
      status: 'Active Loan',
      loanProgress: 25,
      activeUntil: '2024-07-10'
    },
    {
      id: 6,
      name: 'Prism Reflections #9988',
      collection: 'Prism Reflections',
      image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=400&fit=crop',
      loanAmount: '3.4 ETH',
      maxLoan: '4.8 ETH',
      floorPrice: '6.9 ETH',
      interest: '16% APR',
      duration: '28 days',
      lender: '0x9999...4444',
      status: 'Available',
      loanProgress: 0,
      activeUntil: null
    }
  ];

  const collections = [
    { name: 'Abstract Genesis', floor: '8.1 ETH', volume: '1,234 ETH', loans: 45, change: '+12.3%' },
    { name: 'Digital Dreams', floor: '17.3 ETH', volume: '2,567 ETH', loans: 23, change: '+8.7%' },
    { name: 'Neon Patterns', floor: '5.6 ETH', volume: '456 ETH', loans: 67, change: '-2.1%' },
    { name: 'Cosmic Waves', floor: '24.0 ETH', volume: '789 ETH', loans: 34, change: '+15.2%' },
    { name: 'Ethereal Forms', floor: '13.1 ETH', volume: '892 ETH', loans: 28, change: '+6.4%' },
    { name: 'Prism Reflections', floor: '6.9 ETH', volume: '334 ETH', loans: 52, change: '+4.1%' }
  ];

  const handleNFTClick = (nft) => {
    setSelectedNFT(nft);
    setIsModalOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'default';
      case 'Active Loan': return 'secondary';
      case 'Expired': return 'destructive';
      default: return 'default';
    }
  };

  if (showFeed) {
    return <NFTMarketplaceFeed onBack={() => setShowFeed(false)} />;
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">NFT Lending Marketplace</h2>
          <p className="text-muted-foreground">Discover lending opportunities across top collections</p>
        </div>
        <Button 
          variant="outline" 
          className="btn-secondary"
          onClick={() => setShowFeed(true)}
        >
          View All Collections
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4 mb-6">
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
          </SelectContent>
        </Select>
      </div>

      {/* Horizontal Scrollable NFT Cards */}
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {availableLoans.map((loan) => (
              <CarouselItem key={loan.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <Card 
                  className="metric-card hover:border-primary/50 transition-all duration-300 cursor-pointer transform hover:scale-105"
                  onClick={() => handleNFTClick(loan)}
                >
                  <CardContent className="p-4">
                    <AspectRatio ratio={1} className="mb-4 relative overflow-hidden rounded-lg">
                      <img
                        src={loan.image}
                        alt={loan.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                      {loan.status === 'Active Loan' && (
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="text-xs">
                            Active
                          </Badge>
                        </div>
                      )}
                    </AspectRatio>
                    
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold truncate">{loan.name}</h3>
                        <p className="text-sm text-muted-foreground">{loan.collection}</p>
                      </div>

                      {loan.status === 'Active Loan' && loan.loanProgress > 0 && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Loan Progress</span>
                            <span>{loan.loanProgress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5">
                            <div 
                              className="bg-primary h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${loan.loanProgress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Floor Price</span>
                          <span className="font-semibold">{loan.floorPrice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Max Loan</span>
                          <span className="font-semibold text-primary">{loan.maxLoan}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Interest</span>
                          <span className="font-semibold">{loan.interest}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <Badge variant={getStatusColor(loan.status)}>
                          {loan.status}
                        </Badge>
                        <Button size="sm" className="btn-primary">
                          {loan.status === 'Available' ? 'Lend' : 'View'}
                        </Button>
                      </div>

                      {loan.activeUntil && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="w-3 h-3 mr-1" />
                          Until {loan.activeUntil}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>
      </div>

      {/* Top Collections Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Top Collections</h3>
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {collections.map((collection, index) => (
            <Card key={index} className="metric-card hover:border-primary/30 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold truncate">{collection.name}</h4>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-primary mr-1" />
                      <span className={`text-xs ${collection.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {collection.change}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Floor</span>
                      <span className="font-semibold">{collection.floor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">24h Volume</span>
                      <span className="font-semibold">{collection.volume}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Active Loans</span>
                      <span className="font-semibold text-primary">{collection.loans}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <NFTDetailModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        nft={selectedNFT}
      />
    </div>
  );
};

export default NFTMarketplace;
