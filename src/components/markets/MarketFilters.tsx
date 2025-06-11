
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

interface MarketFiltersProps {
  onFilterChange: (category: string) => void;
  onSearchChange: (search: string) => void;
  activeCategory: string;
}

const MarketFilters = ({ onFilterChange, onSearchChange, activeCategory }: MarketFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'stablecoins', label: 'Stablecoins' },
    { id: 'major', label: 'Major' },
    { id: 'defi', label: 'DeFi' },
    { id: 'emerging', label: 'Emerging' }
  ];

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearchChange(value);
  };

  return (
    <div className="glass-card p-6 rounded-2xl mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "ghost"}
              className={activeCategory === category.id ? "btn-primary" : "btn-secondary"}
              onClick={() => onFilterChange(category.id)}
            >
              {category.label}
            </Button>
          ))}
        </div>
        
        <div className="flex gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
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
