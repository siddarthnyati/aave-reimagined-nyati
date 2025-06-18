
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronDown, Copy, LogOut, Wallet } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';
import { useToast } from '@/hooks/use-toast';
import WalletModal from './WalletModal';

const WalletConnection = () => {
  const { isConnected, walletAddress, balance, disconnectWallet } = useWallet();
  const { toast } = useToast();
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCopyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!isConnected) {
    return (
      <>
        <Button 
          className="btn-primary px-6 py-2 font-space-grotesk font-medium"
          onClick={() => setWalletModalOpen(true)}
        >
          <Wallet className="w-4 h-4 mr-2" />
          Connect Wallet
        </Button>
        <WalletModal open={walletModalOpen} onOpenChange={setWalletModalOpen} />
      </>
    );
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="crypto-pill flex items-center gap-2 px-4 py-2 font-space-grotesk"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-sm">{formatAddress(walletAddress!)}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
      </Button>

      {dropdownOpen && (
        <Card className="absolute top-12 right-0 w-72 glass-card border-border z-50">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Wallet Address</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyAddress}
                className="h-6 px-2"
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
            <div className="text-xs font-mono bg-muted p-2 rounded">
              {walletAddress}
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Balances</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span>ETH:</span>
                  <span>{balance.ETH}</span>
                </div>
                <div className="flex justify-between">
                  <span>USDC:</span>
                  <span>{balance.USDC.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>BTC:</span>
                  <span>{balance.BTC}</span>
                </div>
                <div className="flex justify-between">
                  <span>LINK:</span>
                  <span>{balance.LINK}</span>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                disconnectWallet();
                setDropdownOpen(false);
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Disconnect
            </Button>
          </div>
        </Card>
      )}

      {dropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default WalletConnection;
