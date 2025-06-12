
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AirtimeSection = () => {
  const providers = [
    { name: "Verizon", icon: "📱", cashback: "2%" },
    { name: "AT&T", icon: "📲", cashback: "2%" },
    { name: "T-Mobile", icon: "📞", cashback: "2%" },
    { name: "Sprint", icon: "📱", cashback: "2%" }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Mobile Airtime & Data</h3>
        <p className="text-muted-foreground">
          Top up your phone and earn 2% GHO cashback
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Quick Top-Up</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="+1 (555) 123-4567" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="provider">Provider</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  {providers.map((provider, index) => (
                    <SelectItem key={index} value={provider.name.toLowerCase()}>
                      <div className="flex items-center gap-2">
                        <span>{provider.icon}</span>
                        <span>{provider.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select amount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">$10</SelectItem>
                  <SelectItem value="25">$25</SelectItem>
                  <SelectItem value="50">$50</SelectItem>
                  <SelectItem value="100">$100</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button className="w-full">
              Top Up & Earn 2% GHO
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Supported Providers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {providers.map((provider, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{provider.icon}</span>
                    <span className="font-medium">{provider.name}</span>
                  </div>
                  <span className="text-sm text-primary font-medium">{provider.cashback} GHO</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AirtimeSection;
