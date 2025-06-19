
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, ExternalLink } from 'lucide-react';

const ConnectedPlatforms = () => {
  const platforms = [
    {
      name: 'Coinbase Card',
      logo: '🟦', // Using emoji as placeholder
      connected: true,
      balance: '$142.85',
      token: 'BTC',
      lastSync: '2 hours ago'
    },
    {
      name: 'Crypto.com Card',
      logo: '🔵',
      connected: true,
      balance: '$67.23',
      token: 'CRO',
      lastSync: '1 hour ago'
    },
    {
      name: 'Binance Card',
      logo: '🟡',
      connected: true,
      balance: '$27.44',
      token: 'BNB',
      lastSync: '30 minutes ago'
    },
    {
      name: 'BlockFi Card',
      logo: '⚪',
      connected: false,
      balance: '-',
      token: 'BTC',
      lastSync: 'Not connected'
    }
  ];

  return (
    <div className="space-y-4">
      {platforms.map((platform) => (
        <Card key={platform.name} className={`bg-background/50 ${platform.connected ? 'border-green-500/30' : 'border-border/50'}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{platform.logo}</div>
                <div>
                  <h4 className="font-medium">{platform.name}</h4>
                  <p className="text-sm text-muted-foreground">Last sync: {platform.lastSync}</p>
                </div>
              </div>
              <div className="text-right">
                {platform.connected ? (
                  <>
                    <p className="font-semibold">{platform.balance}</p>
                    <Badge variant="outline" className="text-xs">
                      {platform.token}
                    </Badge>
                  </>
                ) : (
                  <Button size="sm" variant="outline" className="btn-secondary">
                    <Plus className="w-3 h-3 mr-1" />
                    Connect
                  </Button>
                )}
              </div>
            </div>
            {platform.connected && (
              <div className="mt-3 pt-3 border-t border-border/30">
                <Button size="sm" variant="ghost" className="text-xs">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  View Details
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ConnectedPlatforms;
