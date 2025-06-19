
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, X, Lightbulb } from 'lucide-react';

interface ContextualTooltipProps {
  title: string;
  content: string;
  category: 'basics' | 'advanced' | 'risk' | 'strategy';
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const ContextualTooltip = ({ 
  title, 
  content, 
  category, 
  children, 
  position = 'top' 
}: ContextualTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'basics': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'advanced': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'risk': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'strategy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  return (
    <div className="relative inline-block">
      <div 
        className="relative cursor-help"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
        <HelpCircle className="w-4 h-4 text-muted-foreground hover:text-primary absolute -top-1 -right-1 transition-colors" />
      </div>
      
      {isVisible && (
        <Card className={`absolute z-50 w-80 glass-card border-primary/30 shadow-2xl ${positionClasses[position]}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <Badge className={getCategoryColor(category)}>
                <Lightbulb className="w-3 h-3 mr-1" />
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Badge>
              <Button
                variant="ghost"
                size="sm" 
                onClick={() => setIsVisible(false)}
                className="h-6 w-6 p-0"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
            <h4 className="font-semibold mb-2 text-foreground">{title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContextualTooltip;
