
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WalletOverview from '@/components/dashboard/WalletOverview';
import SupplySection from '@/components/dashboard/SupplySection';
import BorrowSection from '@/components/dashboard/BorrowSection';
import TransactionHistory from '@/components/dashboard/TransactionHistory';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-muted-foreground">
            Manage your portfolio and track your DeFi activities
          </p>
        </div>

        <WalletOverview />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <SupplySection />
          <BorrowSection />
        </div>

        <TransactionHistory />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
