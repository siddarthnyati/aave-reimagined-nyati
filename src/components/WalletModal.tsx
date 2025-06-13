
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Wallet, Info } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';

interface WalletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WalletModal = ({ open, onOpenChange }: WalletModalProps) => {
  const { connectWallet } = useWallet();

  const handleConnect = async (walletType: string) => {
    await connectWallet();
    onOpenChange(false);
  };

  const walletOptions = [
    { 
      name: 'MetaMask', 
      icon: '🦊', 
      popular: true,
      description: 'Connect using browser extension'
    },
    { 
      name: 'WalletConnect', 
      icon: '🔗', 
      popular: true,
      description: 'Scan with mobile wallet'
    },
    { 
      name: 'Coinbase Wallet', 
      icon: '💙', 
      popular: false,
      description: 'Connect with Coinbase'
    },
    { 
      name: 'Rainbow', 
      icon: '🌈', 
      popular: false,
      description: 'Fun, simple & secure'
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader className="space-y-4">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Wallet className="w-6 h-6 text-primary" />
            Connect Wallet
          </DialogTitle>
          
          {/* Demo Message */}
          <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/50 rounded-lg border border-blue-200 dark:border-blue-800">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <p className="text-sm text-blue-700 dark:text-blue-300">
              This is just a demo - click any wallet to explore the app! No real wallet needed.
            </p>
          </div>
        </DialogHeader>
        
        <div className="space-y-3">
          {walletOptions.map((wallet) => (
            <Card 
              key={wallet.name} 
              className="glass-card hover:bg-muted/50 transition-colors cursor-pointer border-border"
              onClick={() => handleConnect(wallet.name)}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">
                      {wallet.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{wallet.name}</span>
                        {wallet.popular && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{wallet.description}</p>
                    </div>
                  </div>
                  <Wallet className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <p className="text-xs text-muted-foreground text-center mt-4">
          By connecting a wallet, you agree to our Terms of Service
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default WalletModal;
