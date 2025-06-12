
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Clock, Gift } from 'lucide-react';

const FeaturedPromotion = () => {
  return (
    <Card className="glass-card border-primary/20 bg-gradient-to-r from-primary/5 to-blue-600/5 mb-8">
      <CardContent className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <Badge className="bg-primary/10 text-primary border-primary">
              <Zap className="w-3 h-3 mr-1" />
              Limited Time Offer
            </Badge>
            
            <h2 className="text-3xl font-bold">
              Sony LinkBuds Speaker
            </h2>
            
            <p className="text-muted-foreground text-lg">
              Get this premium wireless speaker when you spend $500 or more using your DeFi Credit Card this month.
            </p>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span>Offer ends June 30th</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Gift className="w-4 h-4 text-primary" />
                <span>Free shipping included</span>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button size="lg" className="btn-primary">
                Claim Offer
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-8xl mb-4">🔊</div>
            <div className="space-y-2">
              <p className="text-xl font-semibold">Worth $199</p>
              <p className="text-sm text-muted-foreground">Retail Value</p>
              <div className="bg-primary/10 rounded-lg p-4 mt-4">
                <p className="text-sm font-medium">Your Progress</p>
                <div className="w-full bg-secondary rounded-full h-2 mt-2">
                  <div className="bg-primary h-2 rounded-full w-3/4"></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">$375 / $500 spent</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturedPromotion;
