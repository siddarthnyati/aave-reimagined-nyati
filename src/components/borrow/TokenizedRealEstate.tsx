
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Building2, 
  TrendingUp, 
  DollarSign, 
  MapPin, 
  Users, 
  Calendar,
  Percent,
  Shield,
  ArrowUpRight
} from 'lucide-react';

interface RealEstateProperty {
  id: string;
  name: string;
  location: string;
  image: string;
  price: number;
  tokenPrice: number;
  totalTokens: number;
  availableTokens: number;
  apy: number;
  ltv: number;
  propertyType: string;
  sqft: number;
  yearBuilt: number;
  occupancy: number;
  monthlyRent: number;
  appreciation: number;
  description: string;
}

const properties: RealEstateProperty[] = [
  {
    id: 'luxury-miami',
    name: 'Miami Luxury Condos',
    location: 'Miami, FL',
    image: 'photo-1618160702438-9b02ab6515c9',
    price: 2500000,
    tokenPrice: 250,
    totalTokens: 10000,
    availableTokens: 3200,
    apy: 8.5,
    ltv: 70,
    propertyType: 'Residential',
    sqft: 12000,
    yearBuilt: 2021,
    occupancy: 95,
    monthlyRent: 18500,
    appreciation: 12.3,
    description: 'Premium waterfront luxury condominiums with ocean views'
  },
  {
    id: 'austin-office',
    name: 'Austin Tech Hub Office',
    location: 'Austin, TX',
    image: 'photo-1721322800607-8c38375eef04',
    price: 8500000,
    tokenPrice: 850,
    totalTokens: 10000,
    availableTokens: 1800,
    apy: 11.2,
    ltv: 65,
    propertyType: 'Commercial',
    sqft: 45000,
    yearBuilt: 2020,
    occupancy: 88,
    monthlyRent: 75000,
    appreciation: 15.7,
    description: 'Modern office complex in the heart of Austin tech district'
  },
  {
    id: 'brooklyn-lofts',
    name: 'Brooklyn Industrial Lofts',
    location: 'Brooklyn, NY',
    image: 'photo-1494891848038-7bd202a2afeb',
    price: 4200000,
    tokenPrice: 420,
    totalTokens: 10000,
    availableTokens: 2500,
    apy: 9.8,
    ltv: 60,
    propertyType: 'Mixed-Use',
    sqft: 28000,
    yearBuilt: 2019,
    occupancy: 92,
    monthlyRent: 32000,
    appreciation: 8.9,
    description: 'Converted industrial lofts with modern amenities'
  },
  {
    id: 'dubai-towers',
    name: 'Dubai Marina Towers',
    location: 'Dubai, UAE',
    image: 'photo-1551038247-3d9af20df552',
    price: 15000000,
    tokenPrice: 1500,
    totalTokens: 10000,
    availableTokens: 950,
    apy: 13.5,
    ltv: 55,
    propertyType: 'Luxury Residential',
    sqft: 85000,
    yearBuilt: 2022,
    occupancy: 98,
    monthlyRent: 125000,
    appreciation: 18.2,
    description: 'Ultra-luxury towers with panoramic marina and city views'
  }
];

const TokenizedRealEstate = () => {
  const [selectedProperty, setSelectedProperty] = useState<RealEstateProperty | null>(null);
  const [actionType, setActionType] = useState<'lend' | 'borrow' | null>(null);
  const { toast } = useToast();

  const handleAction = (property: RealEstateProperty, action: 'lend' | 'borrow') => {
    setSelectedProperty(property);
    setActionType(action);
    
    toast({
      title: `${action === 'lend' ? 'Lending' : 'Borrowing'} Initiated`,
      description: `Processing ${action} request for ${property.name}...`,
    });
  };

  const getPropertyTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'residential': return 'bg-green-100 text-green-800';
      case 'commercial': return 'bg-blue-100 text-blue-800';
      case 'mixed-use': return 'bg-purple-100 text-purple-800';
      case 'luxury residential': return 'bg-gold-100 text-gold-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-6">
        <h2 className="text-3xl font-bold mb-4 font-outfit">Tokenized Real Estate</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-space-grotesk">
          Invest in fractional real estate ownership through blockchain tokens. 
          Earn rental yields and property appreciation while maintaining liquidity.
        </p>
      </div>

      <Tabs defaultValue="marketplace" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="marketplace">Property Marketplace</TabsTrigger>
          <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
          <TabsTrigger value="analytics">Market Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {properties.map((property) => (
              <Card key={property.id} className="glass-card hover-lift overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/${property.image}?auto=format&fit=crop&w=800&q=80`}
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={getPropertyTypeColor(property.propertyType)}>
                      {property.propertyType}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-500 text-white">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +{property.appreciation}%
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="font-outfit">{property.name}</span>
                    <span className="text-lg font-bold text-green-600">
                      {property.apy}% APY
                    </span>
                  </CardTitle>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="font-space-grotesk">{property.location}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground font-space-grotesk">
                    {property.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Property Value:</span>
                      <p className="font-semibold">${property.price.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Token Price:</span>
                      <p className="font-semibold">${property.tokenPrice}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Occupancy:</span>
                      <p className="font-semibold">{property.occupancy}%</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Max LTV:</span>
                      <p className="font-semibold">{property.ltv}%</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Token Availability</span>
                      <span>{property.availableTokens.toLocaleString()} / {property.totalTokens.toLocaleString()}</span>
                    </div>
                    <Progress 
                      value={((property.totalTokens - property.availableTokens) / property.totalTokens) * 100} 
                      className="h-2"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs text-center">
                    <div className="p-2 bg-muted rounded">
                      <Building2 className="w-4 h-4 mx-auto mb-1" />
                      <p>{property.sqft.toLocaleString()} sq ft</p>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <Calendar className="w-4 h-4 mx-auto mb-1" />
                      <p>Built {property.yearBuilt}</p>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <DollarSign className="w-4 h-4 mx-auto mb-1" />
                      <p>${(property.monthlyRent / 1000).toFixed(0)}k/mo</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => handleAction(property, 'lend')}
                    >
                      <DollarSign className="w-4 h-4 mr-2" />
                      Invest & Lend
                    </Button>
                    <Button 
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleAction(property, 'borrow')}
                    >
                      <Percent className="w-4 h-4 mr-2" />
                      Borrow Against
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="portfolio">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Your Real Estate Portfolio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Building2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No Properties Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start investing in tokenized real estate to build your portfolio
                </p>
                <Button>Browse Properties</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card">
              <CardContent className="pt-6 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <h3 className="font-semibold mb-1">Average APY</h3>
                <p className="text-2xl font-bold text-green-500">10.75%</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="pt-6 text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <h3 className="font-semibold mb-1">Total Market Cap</h3>
                <p className="text-2xl font-bold">$30.2M</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="pt-6 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                <h3 className="font-semibold mb-1">Active Investors</h3>
                <p className="text-2xl font-bold">2,847</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TokenizedRealEstate;
