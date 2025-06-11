
import { Link } from 'react-router-dom';
import { TrendingUp, Twitter, Github, Discord, Telegram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-blue-400 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold gradient-text">DeFiLend</span>
            </Link>
            <p className="text-muted-foreground">
              The most advanced DeFi lending protocol built for the future of finance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Discord className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Telegram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <div className="space-y-3">
              <Link to="/markets" className="block text-muted-foreground hover:text-primary transition-colors">
                Markets
              </Link>
              <Link to="/dashboard" className="block text-muted-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link to="/governance" className="block text-muted-foreground hover:text-primary transition-colors">
                Governance
              </Link>
              <Link to="/analytics" className="block text-muted-foreground hover:text-primary transition-colors">
                Analytics
              </Link>
            </div>
          </div>

          {/* Developers */}
          <div>
            <h3 className="font-semibold mb-4">Developers</h3>
            <div className="space-y-3">
              <Link to="/docs" className="block text-muted-foreground hover:text-primary transition-colors">
                Documentation
              </Link>
              <Link to="/api" className="block text-muted-foreground hover:text-primary transition-colors">
                API Reference
              </Link>
              <Link to="/sdk" className="block text-muted-foreground hover:text-primary transition-colors">
                SDK
              </Link>
              <Link to="/github" className="block text-muted-foreground hover:text-primary transition-colors">
                GitHub
              </Link>
            </div>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <div className="space-y-3">
              <Link to="/blog" className="block text-muted-foreground hover:text-primary transition-colors">
                Blog
              </Link>
              <Link to="/forum" className="block text-muted-foreground hover:text-primary transition-colors">
                Forum
              </Link>
              <Link to="/support" className="block text-muted-foreground hover:text-primary transition-colors">
                Support
              </Link>
              <Link to="/security" className="block text-muted-foreground hover:text-primary transition-colors">
                Security
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground">
            © 2024 DeFiLend. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
