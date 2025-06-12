
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, ArrowRight } from 'lucide-react';

const SendCryptoSection = () => {
  const cryptos = [
    { symbol: "ETH", name: "Ethereum", icon: "⟠" },
    { symbol: "BTC", name: "Bitcoin", icon: "₿" },
    { symbol: "USDC", name: "USD Coin", icon: "💵" },
    { symbol: "GHO", name: "GHO Token", icon: "🪙" }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Send Cryptocurrency</h3>
        <p className="text-muted-foreground">
          Send crypto to friends and family with no fees
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="w-5 h-5" />
              Send Crypto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient Address</Label>
              <Input id="recipient" placeholder="0x..." />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="crypto">Cryptocurrency</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select crypto" />
                </SelectTrigger>
                <SelectContent>
                  {cryptos.map((crypto, index) => (
                    <SelectItem key={index} value={crypto.symbol.toLowerCase()}>
                      <div className="flex items-center gap-2">
                        <span>{crypto.icon}</span>
                        <span>{crypto.symbol}</span>
                        <span className="text-muted-foreground">({crypto.name})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" placeholder="0.00" type="number" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Input id="message" placeholder="Payment for..." />
            </div>
            
            <Button className="w-full">
              Send Cryptocurrency
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-xl">⟠</span>
                  <div>
                    <p className="font-medium">0.05 ETH</p>
                    <p className="text-sm text-muted-foreground">To: 0x1234...5678</p>
                  </div>
                </div>
                <span className="text-sm text-green-500">Completed</span>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-xl">💵</span>
                  <div>
                    <p className="font-medium">100 USDC</p>
                    <p className="text-sm text-muted-foreground">To: 0x9876...4321</p>
                  </div>
                </div>
                <span className="text-sm text-orange-500">Pending</span>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🪙</span>
                  <div>
                    <p className="font-medium">250 GHO</p>
                    <p className="text-sm text-muted-foreground">To: 0x5555...7777</p>
                  </div>
                </div>
                <span className="text-sm text-green-500">Completed</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SendCryptoSection;
