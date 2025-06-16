
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WalletModal } from './WalletModal';
import TourStartButton from '@/components/tour/TourStartButton';
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
  const { isConnected, address, balance } = useWallet();
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

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center space-x-2" data-tour="logo">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-blue-400">
                <span className="text-lg font-bold text-black">D</span>
              </div>
              <span className="hidden font-bold sm:inline-block gradient-text">
                DeFiLend
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                const isDashboard = item.href === '/dashboard';
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-2 transition-colors hover:text-primary ${
                      isActive
                        ? 'text-primary font-semibold'
                        : 'text-muted-foreground'
                    } ${item.protected && !isConnected ? 'opacity-50' : ''}`}
                    data-tour={isDashboard ? "dashboard-link" : undefined}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                    {item.protected && !isConnected && (
                      <Badge variant="outline" className="text-xs">
                        Connect Wallet
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <TourStartButton />
            
            {isConnected ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <div className="text-sm font-medium">{formatBalance(balance)}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatAddress(address)}
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsWalletModalOpen(true)}
                  className="flex items-center gap-2"
                >
                  <Wallet className="w-4 h-4" />
                  <span className="hidden sm:inline">Wallet</span>
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setIsWalletModalOpen(true)}
                className="btn-primary flex items-center gap-2"
                data-tour="connect-wallet"
              >
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </Button>
            )}

            <Button
              variant="ghost"
              className="md:hidden"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="border-t md:hidden">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-3">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                        isActive
                          ? 'text-primary font-semibold'
                          : 'text-muted-foreground'
                      } ${item.protected && !isConnected ? 'opacity-50' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                      {item.protected && !isConnected && (
                        <Badge variant="outline" className="text-xs ml-auto">
                          Connect Wallet
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        )}
      </header>

      <WalletModal 
        isOpen={isWalletModalOpen} 
        onClose={() => setIsWalletModalOpen(false)} 
      />
    </>
  );
};

export default Header;
