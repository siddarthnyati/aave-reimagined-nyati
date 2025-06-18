
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '@/contexts/WalletContext';
import WalletConnection from './WalletConnection';

const Header = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Markets', href: '/markets' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Borrow/Lend', href: '/borrow-lend' },
    { name: 'Credit Card', href: '/credit-card' },
    { name: 'Staking', href: '/staking' },
    { name: 'Venture Vaults', href: '/venture-vaults' },
    { name: 'NFT Lending', href: '/nft-lending' },
    { name: 'Community Contest', href: '/community-contest' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-blue-400 shadow-lg">
              <span className="text-xl font-bold text-black">D</span>
            </div>
            <span className="hidden font-bold text-2xl sm:inline-block gradient-text font-outfit">
              DeFiLend
            </span>
          </Link>

          <nav className="flex items-center space-x-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`crypto-pill group px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-500 ${
                    isActive
                      ? 'crypto-pill-active text-black font-semibold'
                      : 'text-muted-foreground hover:text-white'
                  }`}
                >
                  <span className="font-space-grotesk text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <WalletConnection />
      </div>
    </header>
  );
};

export default Header;
