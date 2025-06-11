
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Vote, Users, Clock, CheckCircle } from 'lucide-react';

const Governance = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Governance</span>
          </h1>
          <p className="text-muted-foreground">
            Shape the future of DeFiLend through community governance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="metric-card">
            <Vote className="w-6 h-6 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-1">15</h3>
            <p className="text-muted-foreground text-sm">Active Proposals</p>
          </div>
          <div className="metric-card">
            <Users className="w-6 h-6 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-1">12.5K</h3>
            <p className="text-muted-foreground text-sm">Token Holders</p>
          </div>
          <div className="metric-card">
            <CheckCircle className="w-6 h-6 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-1">89%</h3>
            <p className="text-muted-foreground text-sm">Avg Participation</p>
          </div>
          <div className="metric-card">
            <Clock className="w-6 h-6 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-1">3.2M</h3>
            <p className="text-muted-foreground text-sm">Total Voting Power</p>
          </div>
        </div>

        <div className="glass-card p-8 rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-4">Governance Coming Soon</h2>
          <p className="text-muted-foreground mb-6">
            Participate in protocol governance, vote on proposals, and help shape the future of DeFiLend.
          </p>
          <div className="text-6xl mb-4">🗳️</div>
          <p className="text-sm text-muted-foreground">
            Full governance functionality will be available soon
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Governance;
