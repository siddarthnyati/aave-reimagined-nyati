
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, ExternalLink, Coins } from 'lucide-react';

const NFTPortfolio = () => {
  const [selectedTab, setSelectedTab] = useState('owned');

  const ownedNFTs = [
    {
      id: 1,
      name: 'Bored Ape #1234',
      collection: 'Bored Ape Yacht Club',
      image: '/placeholder.svg',
      floorPrice: '15.2 ETH',
      maxLoan: '10.64 ETH',
      status: 'Available'
    },
    {
      id: 2,
      name: 'CryptoPunk #5678',
      collection: 'CryptoPunks',
      image: '/placeholder.svg',
      floorPrice: '42.1 ETH',
      maxLoan: '29.47 ETH',
      status: 'Available'
    },
    {
      id: 3,
      name: 'Mutant Ape #9012',
      collection: 'Mutant Ape Yacht Club',
      image: '/placeholder.svg',
      floorPrice: '8.7 ETH',
      maxLoan: '6.09 ETH',
      status: 'Loaned'
    }
  ];

  const loanedNFTs = [
    {
      id: 3,
      name: 'Mutant Ape #9012',
      collection: 'Mutant Ape Yacht Club',
      image: '/placeholder.svg',
      loanAmount: '6.0 ETH',
      interest: '12% APR',
      dueDate: '2024-07-15',
      status: 'Active'
    }
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ownedNFTs.map((nft) => (
              <Card key={nft.id} className="metric-card hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <AspectRatio ratio={1} className="mb-4">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </AspectRatio>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold">{nft.name}</h3>
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
                        <Button size="sm" className="btn-primary">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loanedNFTs.map((nft) => (
              <Card key={nft.id} className="metric-card border-orange-500/20">
                <CardContent className="p-4">
                  <AspectRatio ratio={1} className="mb-4">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full h-full object-cover rounded-lg"
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
                      <Button size="sm" variant="outline">
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
    </div>
  );
};

export default NFTPortfolio;
