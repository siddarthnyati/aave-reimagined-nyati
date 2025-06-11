
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Wallet, Menu, X, TrendingUp, ChevronDown } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';
import WalletModal from './WalletModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const { isConnected, walletAddress, balance, disconnectWallet } = useWallet();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const totalBalance = Object.entries(balance).reduce((total, [symbol, amount]) => {
    const prices: Record<string, number> = {
      ETH: 3200,
      USDC: 1,
      BTC: 65000,
      LINK: 15,
      UNI: 8,
      AAVE: 120
    };
    return total + (amount * (prices[symbol] || 0));
  }, 0);

  return (
    <>
      <header className="glass-card border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-blue-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold gradient-text">DeFiLend</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/markets" className="text-muted-foreground hover:text-primary transition-colors">
                Markets
              </Link>
              <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link to="/staking" className="text-muted-foreground hover:text-primary transition-colors">
                Staking
              </Link>
              <Link to="/nft-lending" className="text-muted-foreground hover:text-primary transition-colors">
                NFT Lending
              </Link>
              <Link to="/governance" className="text-muted-foreground hover:text-primary transition-colors">
                Governance
              </Link>
            </nav>

            {/* Wallet Connection */}
            <div className="hidden md:flex items-center space-x-4">
              {isConnected ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-mono">{formatAddress(walletAddress!)}</span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64">
                    <DropdownMenuItem disabled>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold">Portfolio Value</span>
                        <span className="text-lg font-bold text-primary">
                          ${totalBalance.toLocaleString()}
                        </span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">View Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={disconnectWallet}>
                      Disconnect Wallet
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  className="btn-primary group"
                  onClick={() => setWalletModalOpen(true)}
                >
                  <Wallet className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Connect Wallet
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 animate-fade-in">
              <nav className="flex flex-col space-y-4">
                <Link to="/markets" className="text-muted-foreground hover:text-primary transition-colors">
                  Markets
                </Link>
                <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <Link to="/staking" className="text-muted-foreground hover:text-primary transition-colors">
                  Staking
                </Link>
                <Link to="/nft-lending" className="text-muted-foreground hover:text-primary transition-colors">
                  NFT Lending
                </Link>
                <Link to="/governance" className="text-muted-foreground hover:text-primary transition-colors">
                  Governance
                </Link>
                {isConnected ? (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">
                      {formatAddress(walletAddress!)}
                    </div>
                    <Button variant="outline" onClick={disconnectWallet} className="w-full">
                      Disconnect Wallet
                    </Button>
                  </div>
                ) : (
                  <Button 
                    className="btn-primary w-full"
                    onClick={() => setWalletModalOpen(true)}
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Wallet
                  </Button>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      <WalletModal open={walletModalOpen} onOpenChange={setWalletModalOpen} />
    </>
  );
};

export default Header;
