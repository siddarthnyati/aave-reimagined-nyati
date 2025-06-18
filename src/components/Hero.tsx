
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
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/25 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/25 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl animate-glow-pulse"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Enhanced Badge */}
            <div className="inline-flex items-center px-6 py-3 glass-card rounded-full mb-8 animate-fade-in">
              <Shield className="w-4 h-4 mr-2 text-primary" />
              <span className="text-sm font-medium font-space-grotesk">Audited & Secure Protocol</span>
            </div>

            {/* Enhanced Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-fade-in text-shadow font-outfit">
              The Future of{' '}
              <span className="gradient-text relative">
                DeFi Lending
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-400 to-primary bg-[length:200%_100%] animate-text-shimmer bg-clip-text text-transparent opacity-50"></div>
              </span>
            </h1>

            {/* Enhanced Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in font-space-grotesk leading-relaxed">
              Earn competitive yields on your crypto assets or borrow against them with the most advanced, 
              secure, and user-friendly lending protocol in DeFi.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in">
              <Button 
                className="btn-primary text-lg px-10 py-5 group font-space-grotesk font-semibold rounded-full"
                onClick={handleStartLending}
              >
                Start Lending
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
              <Button 
                className="btn-secondary text-lg px-10 py-5 font-space-grotesk font-semibold rounded-full"
                onClick={handleExploreMarkets}
              >
                Explore Markets
              </Button>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in">
              <div className="metric-card text-center group">
                <div className="flex items-center justify-center mb-3">
                  <TrendingUp className="w-6 h-6 text-primary mr-2 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-3xl font-bold gradient-text font-outfit">$2.4B</span>
                </div>
                <p className="text-muted-foreground font-space-grotesk">Total Value Locked</p>
              </div>
              
              <div className="metric-card text-center group">
                <div className="flex items-center justify-center mb-3">
                  <Zap className="w-6 h-6 text-primary mr-2 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-3xl font-bold gradient-text font-outfit">15.2%</span>
                </div>
                <p className="text-muted-foreground font-space-grotesk">Highest APY</p>
              </div>
              
              <div className="metric-card text-center group">
                <div className="flex items-center justify-center mb-3">
                  <Shield className="w-6 h-6 text-primary mr-2 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-3xl font-bold gradient-text font-outfit">50K+</span>
                </div>
                <p className="text-muted-foreground font-space-grotesk">Active Users</p>
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
