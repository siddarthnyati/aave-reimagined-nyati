
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MarketTable from '@/components/markets/MarketTable';
import MarketFilters from '@/components/markets/MarketFilters';
import MarketStats from '@/components/markets/MarketStats';
import MarketAnalyticsDashboard from '@/components/markets/MarketAnalyticsDashboard';
import FlashNews from '@/components/markets/FlashNews';
import LearnModeBanner from '@/components/learn/LearnModeBanner';
import TourGuide from '@/components/learn/TourGuide';
import AILendingAssistant from '@/components/ai/AILendingAssistant';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLearnMode } from '@/contexts/LearnModeContext';
import { GraduationCap } from 'lucide-react';

const Markets = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { isLearnMode, toggleLearnMode } = useLearnMode();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <LearnModeBanner />
        <TourGuide />
        
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="gradient-text">Markets</span>
            </h1>
            <p className="text-muted-foreground">
              Explore lending and borrowing opportunities across all assets
            </p>
          </div>
          
          <Button
            variant={isLearnMode ? "default" : "outline"}
            onClick={toggleLearnMode}
            className="flex items-center gap-2"
          >
            <GraduationCap className="w-4 h-4" />
            {isLearnMode ? (
              <>
                Learn Mode
                <Badge variant="secondary" className="ml-1 bg-green-500/20 text-green-600">
                  ON
                </Badge>
              </>
            ) : (
              'Learn Mode'
            )}
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Market Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics Dashboard</TabsTrigger>
            <TabsTrigger value="news">Flash News</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div data-tour="market-stats">
              <MarketStats />
            </div>
            <div data-tour="market-filters">
              <MarketFilters 
                onFilterChange={setActiveCategory}
                onSearchChange={setSearchTerm}
                activeCategory={activeCategory}
              />
            </div>
            <div data-tour="market-table">
              <MarketTable 
                activeCategory={activeCategory}
                searchTerm={searchTerm}
              />
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            <div data-tour="market-analytics">
              <MarketAnalyticsDashboard />
            </div>
          </TabsContent>

          <TabsContent value="news" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div data-tour="flash-news">
                <FlashNews />
              </div>
              <MarketStats />
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
      <AILendingAssistant />
    </div>
  );
};

export default Markets;
