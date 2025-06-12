
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Star } from 'lucide-react';

const MerchantGrid = () => {
  const topMerchants = [
    {
      name: "Amazon",
      logo: "🛒",
      cashback: "2%",
      category: "Everything Store",
      description: "Shop millions of products",
      featured: true
    },
    {
      name: "Walmart",
      logo: "🏪",
      cashback: "2%",
      category: "Retail",
      description: "Groceries & everyday essentials",
      featured: false
    },
    {
      name: "Apple",
      logo: "🍎",
      cashback: "1.5%",
      category: "Electronics",
      description: "Latest Apple products",
      featured: false
    },
    {
      name: "Target",
      logo: "🎯",
      cashback: "2%",
      category: "Retail",
      description: "Home, style & more",
      featured: false
    },
    {
      name: "Best Buy",
      logo: "💻",
      cashback: "1.5%",
      category: "Electronics",
      description: "Tech & electronics",
      featured: false
    },
    {
      name: "Home Depot",
      logo: "🔨",
      cashback: "2%",
      category: "Home Improvement",
      description: "Tools & home improvement",
      featured: false
    },
    {
      name: "Starbucks",
      logo: "☕",
      cashback: "3%",
      category: "Food & Drink",
      description: "Coffee & beverages",
      featured: true
    },
    {
      name: "Nike",
      logo: "👟",
      cashback: "2%",
      category: "Sportswear",
      description: "Athletic wear & shoes",
      featured: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Partner Merchants</h2>
          <p className="text-muted-foreground">Earn GHO rewards at 1000+ partner stores</p>
        </div>
        <Button variant="outline">
          View All Merchants
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topMerchants.map((merchant, index) => (
          <Card key={index} className="glass-card hover:scale-105 transition-all cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="text-3xl">{merchant.logo}</div>
                {merchant.featured && (
                  <Badge className="bg-primary/10 text-primary border-primary">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg">{merchant.name}</CardTitle>
              <CardDescription>{merchant.category}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{merchant.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{merchant.cashback}</p>
                  <p className="text-xs text-muted-foreground">GHO Cashback</p>
                </div>
                <Button size="sm" className="flex items-center gap-2">
                  Shop Now
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              Most Rewarding
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>🏨 Hotels.com</span>
                <Badge>5% GHO</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>🍕 DoorDash</span>
                <Badge>4% GHO</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>🚗 Uber</span>
                <Badge>3.5% GHO</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-primary" />
              New Shops
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>🛍️ Temu</span>
                <Badge variant="secondary">1% GHO</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>👕 Shein</span>
                <Badge variant="secondary">1.5% GHO</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>📱 AliExpress</span>
                <Badge variant="secondary">1% GHO</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MerchantGrid;
