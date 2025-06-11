
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Wallet, Menu, X, TrendingUp } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
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
            <Link to="/governance" className="text-muted-foreground hover:text-primary transition-colors">
              Governance
            </Link>
            <Link to="/docs" className="text-muted-foreground hover:text-primary transition-colors">
              Docs
            </Link>
          </nav>

          {/* Connect Wallet Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button className="btn-primary group">
              <Wallet className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Connect Wallet
            </Button>
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
              <Link to="/governance" className="text-muted-foreground hover:text-primary transition-colors">
                Governance
              </Link>
              <Link to="/docs" className="text-muted-foreground hover:text-primary transition-colors">
                Docs
              </Link>
              <Button className="btn-primary w-full">
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
