
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Zap, TrendingUp } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';
import { useToast } from '@/hooks/use-toast';
import WalletModal from './WalletModal';

const Hero = () => {
  const navigate = useNavigate();
  const { isConnected } = useWallet();
  const { toast } = useToast();
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  const handleStartLending = () => {
    if (!isConnected) {
      setWalletModalOpen(true);
      return;
    }
    
    navigate('/dashboard');
    toast({
      title: "Welcome to your Dashboard!",
      description: "Start supplying assets to earn competitive yields",
    });
  };

  const handleExploreMarkets = () => {
    navigate('/markets');
    toast({
      title: "Explore DeFi Markets",
      description: "Discover the best lending and borrowing opportunities",
    });
  };

  return (
    <>
      <section className="relative py-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 glass-card rounded-full mb-8 animate-fade-in">
              <Shield className="w-4 h-4 mr-2 text-primary" />
              <span className="text-sm font-medium">Audited & Secure Protocol</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-fade-in text-shadow">
              The Future of{' '}
              <span className="gradient-text">DeFi Lending</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in">
              Earn competitive yields on your crypto assets or borrow against them with the most advanced, 
              secure, and user-friendly lending protocol in DeFi.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in">
              <Button 
                className="btn-primary text-lg px-8 py-4 group"
                onClick={handleStartLending}
              >
                Start Lending
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                className="btn-secondary text-lg px-8 py-4"
                onClick={handleExploreMarkets}
              >
                Explore Markets
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in">
              <div className="metric-card text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-6 h-6 text-primary mr-2" />
                  <span className="text-3xl font-bold gradient-text">$2.4B</span>
                </div>
                <p className="text-muted-foreground">Total Value Locked</p>
              </div>
              
              <div className="metric-card text-center">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="w-6 h-6 text-primary mr-2" />
                  <span className="text-3xl font-bold gradient-text">15.2%</span>
                </div>
                <p className="text-muted-foreground">Highest APY</p>
              </div>
              
              <div className="metric-card text-center">
                <div className="flex items-center justify-center mb-2">
                  <Shield className="w-6 h-6 text-primary mr-2" />
                  <span className="text-3xl font-bold gradient-text">50K+</span>
                </div>
                <p className="text-muted-foreground">Active Users</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WalletModal open={walletModalOpen} onOpenChange={setWalletModalOpen} />
    </>
  );
};

export default Hero;
