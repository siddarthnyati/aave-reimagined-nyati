
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

const MarketFilters = () => {
  const categories = ['All', 'Stablecoins', 'Major', 'DeFi', 'Emerging'];

  return (
    <div className="glass-card p-6 rounded-2xl mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={index === 0 ? "default" : "ghost"}
              className={index === 0 ? "btn-primary" : "btn-secondary"}
            >
              {category}
            </Button>
          ))}
        </div>
        
        <div className="flex gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search assets..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button className="btn-secondary">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MarketFilters;
