
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
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
  const location = useLocation();

  const navigation = [
    { name: 'Markets', href: '/markets', icon: TrendingUp },
    { name: 'Dashboard', href: '/dashboard', icon: PieChart },
    { name: 'Credit Card', href: '/credit-card', icon: CreditCard },
    { name: 'Staking', href: '/staking', icon: Coins },
    { name: 'NFT Lending', href: '/nft-lending', icon: Image },
    { name: 'Venture Vaults', href: '/venture-vaults', icon: Vault },
    { name: 'Borrow/Lend', href: '/borrow-lend', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-blue-400 shadow-lg">
              <span className="text-xl font-bold text-black">D</span>
            </div>
            <span className="hidden font-bold text-2xl sm:inline-block gradient-text">
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
                  className={`nav-pill group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'nav-pill-active text-black font-semibold shadow-lg'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                  <span className="hidden xl:inline">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="lg:hidden"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t lg:hidden bg-background/95 backdrop-blur">
          <div className="container mx-auto px-6 py-6">
            <nav className="grid grid-cols-2 gap-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`mobile-nav-card group flex flex-col items-center gap-3 p-4 rounded-2xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'mobile-nav-card-active text-black font-semibold'
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-center">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
