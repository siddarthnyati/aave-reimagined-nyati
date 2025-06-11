
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MarketTable from '@/components/markets/MarketTable';
import MarketFilters from '@/components/markets/MarketFilters';
import MarketStats from '@/components/markets/MarketStats';

const Markets = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Markets</span>
          </h1>
          <p className="text-muted-foreground">
            Explore lending and borrowing opportunities across all assets
          </p>
        </div>

        <MarketStats />
        <MarketFilters 
          onFilterChange={setActiveCategory}
          onSearchChange={setSearchTerm}
          activeCategory={activeCategory}
        />
        <MarketTable 
          activeCategory={activeCategory}
          searchTerm={searchTerm}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Markets;
