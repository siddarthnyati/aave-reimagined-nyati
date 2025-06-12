
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const GiftCardsSection = () => {
  const giftCards = [
    { name: "Amazon", amount: "$25-$500", cashback: "2%", icon: "🛒" },
    { name: "Apple", amount: "$25-$200", cashback: "1.5%", icon: "🍎" },
    { name: "Google Play", amount: "$10-$100", cashback: "2%", icon: "📱" },
    { name: "Steam", amount: "$20-$100", cashback: "3%", icon: "🎮" },
    { name: "Netflix", amount: "$25-$100", cashback: "2.5%", icon: "📺" },
    { name: "Spotify", amount: "$10-$50", cashback: "3%", icon: "🎵" }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Digital Gift Cards</h3>
        <p className="text-muted-foreground">
          Purchase gift cards instantly and earn GHO rewards
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {giftCards.map((card, index) => (
          <Card key={index} className="glass-card hover:scale-105 transition-all">
            <CardHeader className="text-center pb-3">
              <div className="text-4xl mb-2">{card.icon}</div>
              <CardTitle className="text-lg">{card.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Amount Range</p>
                <p className="font-semibold">{card.amount}</p>
              </div>
              
              <Badge className="bg-primary/10 text-primary border-primary">
                {card.cashback} GHO Cashback
              </Badge>
              
              <Button className="w-full">Purchase Gift Card</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GiftCardsSection;
