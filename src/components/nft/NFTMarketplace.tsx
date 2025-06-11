
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, TrendingUp, Clock } from 'lucide-react';

const NFTMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('floor-price');

  const availableLoans = [
    {
      id: 1,
      name: 'Azuki #3456',
      collection: 'Azuki',
      image: '/placeholder.svg',
      loanAmount: '4.2 ETH',
      interest: '15% APR',
      duration: '30 days',
      lender: '0x1234...5678',
      status: 'Available'
    },
    {
      id: 2,
      name: 'CloneX #7890',
      collection: 'CloneX',
      image: '/placeholder.svg',
      loanAmount: '8.5 ETH',
      interest: '12% APR',
      duration: '45 days',
      lender: '0x9876...5432',
      status: 'Available'
    },
    {
      id: 3,
      name: 'Doodles #2345',
      collection: 'Doodles',
      image: '/placeholder.svg',
      loanAmount: '2.8 ETH',
      interest: '18% APR',
      duration: '21 days',
      lender: '0x5555...3333',
      status: 'Available'
    },
    {
      id: 4,
      name: 'Moonbirds #6789',
      collection: 'Moonbirds',
      image: '/placeholder.svg',
      loanAmount: '12.1 ETH',
      interest: '10% APR',
      duration: '60 days',
      lender: '0x7777...1111',
      status: 'Available'
    }
  ];

  const collections = [
    { name: 'Bored Ape Yacht Club', floor: '15.2 ETH', volume: '1,234 ETH', loans: 45 },
    { name: 'CryptoPunks', floor: '42.1 ETH', volume: '2,567 ETH', loans: 23 },
    { name: 'Azuki', floor: '3.8 ETH', volume: '456 ETH', loans: 67 },
    { name: 'CloneX', floor: '6.9 ETH', volume: '789 ETH', loans: 34 }
  ];

  return (
    <div className="space-y-8">
      {/* Available Loans Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">NFT Lending Marketplace</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search NFTs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {availableLoans.map((loan) => (
            <Card key={loan.id} className="metric-card hover:border-primary/50 transition-colors">
              <CardContent className="p-4">
                <AspectRatio ratio={1} className="mb-4">
                  <img
                    src={loan.image}
                    alt={loan.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </AspectRatio>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold">{loan.name}</h3>
                    <p className="text-sm text-muted-foreground">{loan.collection}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Loan Amount</span>
                      <span className="font-semibold">{loan.loanAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Interest</span>
                      <span className="font-semibold text-primary">{loan.interest}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Duration</span>
                      <span className="font-semibold">{loan.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Badge variant="default">
                      {loan.status}
                    </Badge>
                    <Button size="sm" className="btn-primary">
                      Lend
                    </Button>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Lender: {loan.lender}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Top Collections Section */}
      <div>
        <h3 className="text-xl font-bold mb-4">Top Collections</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {collections.map((collection, index) => (
            <Card key={index} className="metric-card">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold truncate">{collection.name}</h4>
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Floor</span>
                      <span className="font-semibold">{collection.floor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Volume</span>
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
    </div>
  );
};

export default NFTMarketplace;
