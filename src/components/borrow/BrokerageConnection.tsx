
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Shield, CheckCircle, AlertCircle } from 'lucide-react';

interface BrokerageConnectionProps {
  onConnect?: (brokerage: string) => void;
}

const BrokerageConnection = ({ onConnect }: BrokerageConnectionProps) => {
  const { toast } = useToast();
  const [connecting, setConnecting] = useState<string | null>(null);

  const brokerages = [
    {
      name: 'Robinhood',
      logo: '🏹',
      description: 'Commission-free trading with instant deposits',
      users: '23M+ users',
      color: 'from-green-400 to-green-600'
    },
    {
      name: 'Webull',
      logo: '🐂',
      description: 'Advanced charts and extended trading hours',
      users: '15M+ users',
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'E*TRADE',
      logo: '⚡',
      description: 'Professional tools and research',
      users: '7M+ users',
      color: 'from-purple-400 to-purple-600'
    },
    {
      name: 'TD Ameritrade',
      logo: '📈',
      description: 'Comprehensive investment platform',
      users: '12M+ users',
      color: 'from-orange-400 to-orange-600'
    }
  ];

  const handleConnect = async (brokerage: string) => {
    setConnecting(brokerage);
    
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Connection Successful",
      description: `Successfully connected to ${brokerage}. Syncing your portfolio...`,
    });
    
    // Simulate portfolio sync
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setConnecting(null);
    if (onConnect) {
      onConnect(brokerage);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold mb-4">Connect Your Brokerage</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Connect your stock portfolio to unlock liquidity through our secure lending platform. 
          Borrow against your equity holdings while maintaining ownership.
        </p>
      </div>

      {/* Security Badge */}
      <Card className="glass-card max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-4 text-center">
            <Shield className="w-8 h-8 text-green-500" />
            <div>
              <h3 className="font-semibold">Bank-Level Security</h3>
              <p className="text-sm text-muted-foreground">
                256-bit encryption • Read-only access • No trading permissions
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </CardContent>
      </Card>

      {/* Brokerage Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {brokerages.map((brokerage) => (
          <Card key={brokerage.name} className="glass-card hover-lift">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${brokerage.color} flex items-center justify-center text-2xl`}>
                  {brokerage.logo}
                </div>
                <div>
                  <CardTitle className="text-xl">{brokerage.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{brokerage.users}</p>
                </div>
              </div>
              <CardDescription>{brokerage.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full btn-primary"
                onClick={() => handleConnect(brokerage.name)}
                disabled={connecting !== null}
              >
                {connecting === brokerage.name ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  `Connect ${brokerage.name}`
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Card className="glass-card text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Keep Your Stocks</h3>
            <p className="text-sm text-muted-foreground">
              Maintain ownership and voting rights while accessing liquidity
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Competitive Rates</h3>
            <p className="text-sm text-muted-foreground">
              Get up to 80% LTV on blue-chip stocks and ETFs
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Smart Monitoring</h3>
            <p className="text-sm text-muted-foreground">
              Real-time risk assessment and margin call protection
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BrokerageConnection;
