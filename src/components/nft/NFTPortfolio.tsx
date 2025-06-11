
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, ExternalLink, Coins, Eye } from 'lucide-react';
import NFTDetailModal from './NFTDetailModal';

const NFTPortfolio = () => {
  const [selectedTab, setSelectedTab] = useState('owned');
  const [selectedNFT, setSelectedNFT] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const ownedNFTs = [
    {
      id: 1234,
      name: 'Bored Ape #1234',
      collection: 'Bored Ape Yacht Club',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop',
      floorPrice: '15.2 ETH',
      maxLoan: '10.64 ETH',
      status: 'Available'
    },
    {
      id: 5678,
      name: 'CryptoPunk #5678',
      collection: 'CryptoPunks',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop',
      floorPrice: '42.1 ETH',
      maxLoan: '29.47 ETH',
      status: 'Available'
    },
    {
      id: 9012,
      name: 'Mutant Ape #9012',
      collection: 'Mutant Ape Yacht Club',
      image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop',
      floorPrice: '8.7 ETH',
      maxLoan: '6.09 ETH',
      status: 'Loaned'
    },
    {
      id: 3456,
      name: 'Azuki #3456',
      collection: 'Azuki',
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=400&fit=crop',
      floorPrice: '4.2 ETH',
      maxLoan: '2.94 ETH',
      status: 'Available'
    }
  ];

  const loanedNFTs = [
    {
      id: 9012,
      name: 'Mutant Ape #9012',
      collection: 'Mutant Ape Yacht Club',
      image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop',
      loanAmount: '6.0 ETH',
      interest: '12% APR',
      dueDate: '2024-07-15',
      status: 'Active'
    }
  ];

  const handleNFTClick = (nft: any) => {
    setSelectedNFT(nft);
    setModalOpen(true);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">My NFT Portfolio</h2>
        <Button className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add NFTs
        </Button>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="owned">Owned NFTs ({ownedNFTs.length})</TabsTrigger>
          <TabsTrigger value="loaned">Active Loans ({loanedNFTs.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="owned" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ownedNFTs.map((nft) => (
              <Card 
                key={nft.id} 
                className="metric-card hover:border-primary/50 transition-all duration-300 cursor-pointer group hover:scale-105"
                onClick={() => handleNFTClick(nft)}
              >
                <CardContent className="p-4">
                  <AspectRatio ratio={1} className="mb-4 relative overflow-hidden rounded-lg">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </AspectRatio>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold truncate">{nft.name}</h3>
                      <p className="text-sm text-muted-foreground">{nft.collection}</p>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-muted-foreground">Floor Price</p>
                        <p className="font-semibold">{nft.floorPrice}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Max Loan</p>
                        <p className="font-semibold text-primary">{nft.maxLoan}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge 
                        variant={nft.status === 'Available' ? 'default' : 'secondary'}
                      >
                        {nft.status}
                      </Badge>
                      {nft.status === 'Available' && (
                        <Button 
                          size="sm" 
                          className="btn-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNFTClick(nft);
                          }}
                        >
                          <Coins className="w-4 h-4 mr-2" />
                          Borrow
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="loaned" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loanedNFTs.map((nft) => (
              <Card key={nft.id} className="metric-card border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 cursor-pointer group hover:scale-105">
                <CardContent className="p-4">
                  <AspectRatio ratio={1} className="mb-4 relative overflow-hidden rounded-lg">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </AspectRatio>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold">{nft.name}</h3>
                      <p className="text-sm text-muted-foreground">{nft.collection}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Loan Amount</p>
                        <p className="font-semibold">{nft.loanAmount}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Interest</p>
                        <p className="font-semibold">{nft.interest}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-muted-foreground">Due Date</p>
                        <p className="font-semibold">{nft.dueDate}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="border-orange-500 text-orange-500">
                        {nft.status}
                      </Badge>
                      <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Repay
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <NFTDetailModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        nft={selectedNFT}
      />
    </div>
  );
};

export default NFTPortfolio;
