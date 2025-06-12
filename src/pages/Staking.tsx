
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WalletGuard from '@/components/auth/WalletGuard';
import { Coins, TrendingUp, Lock, Gift } from 'lucide-react';

const Staking = () => {
  const previewContent = (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="metric-card">
          <Coins className="w-6 h-6 text-primary mb-4" />
          <h3 className="text-2xl font-bold mb-1">45.2%</h3>
          <p className="text-muted-foreground text-sm">Current APY</p>
        </div>
        <div className="metric-card">
          <Lock className="w-6 h-6 text-primary mb-4" />
          <h3 className="text-2xl font-bold mb-1">$45.6M</h3>
          <p className="text-muted-foreground text-sm">Total Staked</p>
        </div>
        <div className="metric-card">
          <TrendingUp className="w-6 h-6 text-primary mb-4" />
          <h3 className="text-2xl font-bold mb-1">8,923</h3>
          <p className="text-muted-foreground text-sm">Active Stakers</p>
        </div>
        <div className="metric-card">
          <Gift className="w-6 h-6 text-primary mb-4" />
          <h3 className="text-2xl font-bold mb-1">$2.4M</h3>
          <p className="text-muted-foreground text-sm">Rewards Distributed</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Staking</span>
          </h1>
          <p className="text-muted-foreground">
            Stake your tokens to earn rewards and secure the protocol
          </p>
        </div>

        <WalletGuard 
          title="Connect Wallet to Start Staking"
          description="Stake your tokens to earn competitive rewards and participate in protocol governance."
          features={[
            "Stake tokens for up to 45.2% APY",
            "Participate in protocol governance",
            "Earn staking rewards automatically", 
            "Access exclusive staking pools"
          ]}
          showPreview={true}
          previewContent={previewContent}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="metric-card">
              <Coins className="w-6 h-6 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-1">45.2%</h3>
              <p className="text-muted-foreground text-sm">Current APY</p>
            </div>
            <div className="metric-card">
              <Lock className="w-6 h-6 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-1">$45.6M</h3>
              <p className="text-muted-foreground text-sm">Total Staked</p>
            </div>
            <div className="metric-card">
              <TrendingUp className="w-6 h-6 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-1">8,923</h3>
              <p className="text-muted-foreground text-sm">Active Stakers</p>
            </div>
            <div className="metric-card">
              <Gift className="w-6 h-6 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-1">$2.4M</h3>
              <p className="text-muted-foreground text-sm">Rewards Distributed</p>
            </div>
          </div>

          <div className="glass-card p-8 rounded-2xl text-center">
            <h2 className="text-2xl font-bold mb-4">Staking Rewards Coming Soon</h2>
            <p className="text-muted-foreground mb-6">
              Stake your DeFiLend tokens to earn competitive rewards and participate in protocol governance.
            </p>
            <div className="text-6xl mb-4">🏆</div>
            <p className="text-sm text-muted-foreground">
              High-yield staking pools will be available soon
            </p>
          </div>
        </WalletGuard>
      </main>
      <Footer />
    </div>
  );
};

export default Staking;
