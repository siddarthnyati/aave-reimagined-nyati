
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MarketTable from '@/components/markets/MarketTable';
import MarketFilters from '@/components/markets/MarketFilters';
import MarketStats from '@/components/markets/MarketStats';
import MarketAnalyticsDashboard from '@/components/markets/MarketAnalyticsDashboard';
import FlashNews from '@/components/markets/FlashNews';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Market Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics Dashboard</TabsTrigger>
            <TabsTrigger value="news">Flash News</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
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
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            <MarketAnalyticsDashboard />
          </TabsContent>

          <TabsContent value="news" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <FlashNews />
              <MarketStats />
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Markets;
