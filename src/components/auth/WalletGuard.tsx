
import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { Wallet, Shield, TrendingUp, Lock, Info } from 'lucide-react';

interface WalletGuardProps {
  children: ReactNode;
  title?: string;
  description?: string;
  features?: string[];
  showPreview?: boolean;
  previewContent?: ReactNode;
}

const WalletGuard = ({ 
  children, 
  title = "Connect Your Wallet", 
  description = "Connect your wallet to access all features and manage your portfolio.",
  features = [],
  showPreview = false,
  previewContent
}: WalletGuardProps) => {
  const { isConnected, connectWallet } = useWallet();

  if (isConnected) {
    return <>{children}</>;
  }

  const defaultFeatures = [
    "View your complete portfolio",
    "Borrow against your assets", 
    "Lend to earn yield",
    "Access exclusive features"
  ];

  const displayFeatures = features.length > 0 ? features : defaultFeatures;

  return (
    <div className="space-y-8">
      {showPreview && previewContent && (
        <div className="relative">
          <div className="pointer-events-none opacity-50">
            {previewContent}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
      )}

      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="glass-card max-w-lg w-full mx-4">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <Wallet className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription className="text-lg">{description}</CardDescription>
            
            {/* Demo Message */}
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200 mt-4">
              <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <p className="text-sm text-blue-700">
                This is just a demo - click connect and explore the app! No real wallet needed.
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              {displayFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
            
            <Button 
              onClick={connectWallet}
              className="w-full btn-primary"
              size="lg"
            >
              <Wallet className="w-5 h-5 mr-2" />
              Connect Wallet
            </Button>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 text-green-500" />
                <p className="text-xs text-muted-foreground">Secure</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <p className="text-xs text-muted-foreground">Profitable</p>
              </div>
              <div className="text-center">
                <Lock className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                <p className="text-xs text-muted-foreground">Private</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WalletGuard;
