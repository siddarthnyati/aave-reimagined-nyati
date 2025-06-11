
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
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
    { name: 'MetaMask', icon: '🦊', popular: true },
    { name: 'WalletConnect', icon: '🔗', popular: true },
    { name: 'Coinbase Wallet', icon: '💙', popular: false },
    { name: 'Rainbow', icon: '🌈', popular: false }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Connect Wallet
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3">
          {walletOptions.map((wallet) => (
            <Button
              key={wallet.name}
              variant="outline"
              className="w-full justify-start gap-3 h-12"
              onClick={() => handleConnect(wallet.name)}
            >
              <span className="text-lg">{wallet.icon}</span>
              <span className="flex-1 text-left">{wallet.name}</span>
              {wallet.popular && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  Popular
                </span>
              )}
            </Button>
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground text-center mt-4">
          By connecting a wallet, you agree to our Terms of Service
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default WalletModal;
