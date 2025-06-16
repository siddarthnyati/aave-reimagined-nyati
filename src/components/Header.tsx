
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import WalletModal from './WalletModal';
import { useWallet } from '@/contexts/WalletContext';
import { 
  Menu, 
  X, 
  Wallet, 
  TrendingUp, 
  PieChart,
  CreditCard,
  Coins,
  Image,
  Vault,
  BarChart3
} from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const { isConnected, walletAddress, balance } = useWallet();
  const location = useLocation();

  const navigation = [
    { name: 'Markets', href: '/markets', icon: TrendingUp },
    { name: 'Dashboard', href: '/dashboard', icon: PieChart, protected: true },
    { name: 'Credit Card', href: '/credit-card', icon: CreditCard },
    { name: 'Staking', href: '/staking', icon: Coins },
    { name: 'NFT Lending', href: '/nft-lending', icon: Image },
    { name: 'Venture Vaults', href: '/venture-vaults', icon: Vault },
    { name: 'Borrow/Lend', href: '/borrow-lend', icon: BarChart3 },
  ];

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatBalance = (bal: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(bal);
  };

  // Calculate total balance in USD
  const getTotalBalance = () => {
    const prices = { ETH: 3200, USDC: 1, BTC: 65000, LINK: 15, UNI: 8, AAVE: 120 };
    return Object.entries(balance).reduce((total, [token, amount]) => {
      return total + (amount * (prices[token as keyof typeof prices] || 0));
    }, 0);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-blue-400 shadow-lg">
                <span className="text-xl font-bold text-black">D</span>
              </div>
              <span className="hidden font-bold text-xl sm:inline-block gradient-text">
                DeFiLend
              </span>
            </Link>

            <nav className="hidden lg:flex items-center space-x-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 hover:scale-105 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary/20 to-blue-400/20 text-primary shadow-lg border border-primary/30'
                        : 'hover:bg-white/5 text-muted-foreground hover:text-primary'
                    } ${item.protected && !isConnected ? 'opacity-60' : ''}`}
                  >
                    <div className={`p-2 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-r from-primary to-blue-400 shadow-md' 
                        : 'bg-white/10 group-hover:bg-primary/20'
                    }`}>
                      <Icon className={`w-6 h-6 ${isActive ? 'text-black' : 'text-current'}`} />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className={`text-sm font-semibold ${isActive ? 'text-primary' : 'text-current'}`}>
                        {item.name}
                      </span>
                      {item.protected && !isConnected && (
                        <Badge variant="outline" className="text-xs mt-1 opacity-70">
                          Connect Wallet
                        </Badge>
                      )}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {isConnected ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:block text-right">
                  <div className="text-sm font-medium">{formatBalance(getTotalBalance())}</div>
                  <div className="text-xs text-muted-foreground">
                    {walletAddress && formatAddress(walletAddress)}
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsWalletModalOpen(true)}
                  className="flex items-center gap-2 h-12 px-6 rounded-xl border-2"
                >
                  <Wallet className="w-5 h-5" />
                  <span className="hidden sm:inline font-medium">Wallet</span>
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setIsWalletModalOpen(true)}
                className="btn-primary flex items-center gap-2 h-12 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Wallet className="w-5 h-5" />
                <span className="font-medium">Connect Wallet</span>
              </Button>
            )}

            <Button
              variant="ghost"
              className="lg:hidden h-12 w-12 rounded-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile menu */}
        {isMenuOpen && (
          <div className="border-t lg:hidden bg-background/95 backdrop-blur">
            <div className="container mx-auto px-6 py-6">
              <div className="grid grid-cols-2 gap-4">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex flex-col items-center gap-3 p-4 rounded-2xl transition-all duration-300 hover:scale-105 ${
                        isActive
                          ? 'bg-gradient-to-r from-primary/20 to-blue-400/20 text-primary border border-primary/30'
                          : 'bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-primary'
                      } ${item.protected && !isConnected ? 'opacity-60' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className={`p-3 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-r from-primary to-blue-400 shadow-md' 
                          : 'bg-white/10'
                      }`}>
                        <Icon className={`w-6 h-6 ${isActive ? 'text-black' : 'text-current'}`} />
                      </div>
                      <div className="text-center">
                        <span className={`text-sm font-semibold ${isActive ? 'text-primary' : 'text-current'}`}>
                          {item.name}
                        </span>
                        {item.protected && !isConnected && (
                          <Badge variant="outline" className="text-xs mt-1 opacity-70">
                            Connect
                          </Badge>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </header>

      <WalletModal 
        open={isWalletModalOpen} 
        onOpenChange={setIsWalletModalOpen} 
      />
    </>
  );
};

export default Header;
