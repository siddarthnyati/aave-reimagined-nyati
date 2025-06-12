
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Grid, List } from 'lucide-react';

const ShopsSection = () => {
  const categories = [
    { name: "Electronics", count: 156, icon: "💻" },
    { name: "Fashion", count: 89, icon: "👕" },
    { name: "Home & Garden", count: 234, icon: "🏡" },
    { name: "Sports", count: 67, icon: "⚽" },
    { name: "Books & Media", count: 123, icon: "📚" },
    { name: "Automotive", count: 45, icon: "🚗" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search merchants..." 
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
        <div className="flex border border-border rounded-lg">
          <Button variant="ghost" size="sm">
            <Grid className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="glass-card p-4 text-center hover:scale-105 transition-all cursor-pointer">
            <div className="text-3xl mb-2">{category.icon}</div>
            <h3 className="font-medium text-sm">{category.name}</h3>
            <Badge variant="secondary" className="mt-1 text-xs">
              {category.count} stores
            </Badge>
          </div>
        ))}
      </div>

      <div className="text-center py-8">
        <h3 className="text-lg font-semibold mb-2">Browse All Categories</h3>
        <p className="text-muted-foreground mb-4">
          Discover thousands of merchants and earn GHO rewards on every purchase
        </p>
        <Button>View All 1000+ Merchants</Button>
      </div>
    </div>
  );
};

export default ShopsSection;
