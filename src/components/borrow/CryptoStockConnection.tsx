
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Shield, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface CryptoStockConnectionProps {
  onConnect?: (platform: string) => void;
}

const CryptoStockConnection = ({ onConnect }: CryptoStockConnectionProps) => {
  const { toast } = useToast();
  const [connecting, setConnecting] = useState<string | null>(null);

  const cryptoPlatforms = [
    {
      name: 'Crypto.com',
      logo: '💎',
      description: 'Leading crypto exchange with tokenized stocks',
      users: '80M+ users',
      color: 'from-blue-400 to-blue-600',
      features: ['24/7 Trading', 'Instant Settlement', 'Fractional Shares', 'No Trading Fees']
    },
    {
      name: 'Kraken',
      logo: '🐙',
      description: 'Secure platform for wrapped stock trading',
      users: '10M+ users',
      color: 'from-purple-400 to-purple-600',
      features: ['Advanced Security', 'Regulatory Compliance', 'Low Fees', 'High Liquidity']
    }
  ];

  const handleConnect = async (platform: string) => {
    setConnecting(platform);
    
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Connection Successful",
      description: `Successfully connected to ${platform}. Syncing your wrapped stock portfolio...`,
    });
    
    // Simulate portfolio sync
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setConnecting(null);
    if (onConnect) {
      onConnect(platform);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold mb-4 font-outfit">Connect Your Crypto Platform</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-space-grotesk">
          Connect your tokenized stock portfolio to unlock liquidity. Wrapped stocks offer 24/7 trading 
          and instant settlement while maintaining exposure to traditional markets.
        </p>
      </div>

      {/* Info Card */}
      <Card className="glass-card max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-4">
            <Info className="w-8 h-8 text-blue-500 flex-shrink-0" />
            <div>
              <h3 className="font-semibold font-outfit">What are Wrapped Stocks?</h3>
              <p className="text-sm text-muted-foreground font-space-grotesk">
                Tokenized versions of traditional stocks that trade on crypto platforms. 
                They track the price of the underlying stock 1:1 and offer crypto-native benefits.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Badge */}
      <Card className="glass-card max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-4 text-center">
            <Shield className="w-8 h-8 text-green-500" />
            <div>
              <h3 className="font-semibold font-outfit">Enterprise Security</h3>
              <p className="text-sm text-muted-foreground font-space-grotesk">
                256-bit encryption • Cold storage • Multi-sig protection
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </CardContent>
      </Card>

      {/* Platform Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {cryptoPlatforms.map((platform) => (
          <Card key={platform.name} className="glass-card hover-lift">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${platform.color} flex items-center justify-center text-2xl`}>
                  {platform.logo}
                </div>
                <div>
                  <CardTitle className="text-xl font-outfit">{platform.name}</CardTitle>
                  <p className="text-sm text-muted-foreground font-space-grotesk">{platform.users}</p>
                </div>
              </div>
              <CardDescription className="font-space-grotesk">{platform.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm mb-2 font-outfit">Key Features:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {platform.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-xs text-muted-foreground font-space-grotesk">
                      <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              <Button 
                className="w-full btn-primary font-space-grotesk"
                onClick={() => handleConnect(platform.name)}
                disabled={connecting !== null}
              >
                {connecting === platform.name ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  `Connect ${platform.name}`
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
            <h3 className="font-semibold mb-2 font-outfit">Always On Trading</h3>
            <p className="text-sm text-muted-foreground font-space-grotesk">
              Trade and manage positions 24/7, even when traditional markets are closed
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2 font-outfit">Instant Settlement</h3>
            <p className="text-sm text-muted-foreground font-space-grotesk">
              No T+2 waiting period - trades settle instantly on blockchain
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2 font-outfit">DeFi Integration</h3>
            <p className="text-sm text-muted-foreground font-space-grotesk">
              Native compatibility with DeFi protocols and smart contracts
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CryptoStockConnection;
