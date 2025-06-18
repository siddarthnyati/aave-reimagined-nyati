
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Clock, Trophy, Eye } from 'lucide-react';

interface Contest {
  id: number;
  title: string;
  description: string;
  category: string;
  participants: number;
  submissions: number;
  timeLeft: string;
  prize: string;
  status: 'active' | 'voting' | 'completed';
  creator: string;
  image: string;
}

interface ContestCardProps {
  contest: Contest;
}

const ContestCard = ({ contest }: ContestCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'voting': return 'bg-blue-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-green-500';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'art': return 'bg-purple-500/20 text-purple-300';
      case 'memes': return 'bg-yellow-500/20 text-yellow-300';
      case 'ideas': return 'bg-blue-500/20 text-blue-300';
      case 'predictions': return 'bg-green-500/20 text-green-300';
      case 'coding': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <Card className="glass-card hover:scale-105 transition-all duration-300 cursor-pointer group">
      <CardHeader className="p-0">
        <div className="relative">
          <img 
            src={contest.image} 
            alt={contest.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <Badge 
            className={`absolute top-3 left-3 ${getStatusColor(contest.status)} text-white border-0`}
          >
            {contest.status.charAt(0).toUpperCase() + contest.status.slice(1)}
          </Badge>
          <Badge 
            className={`absolute top-3 right-3 ${getCategoryColor(contest.category)} border-0`}
          >
            {contest.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-2 font-outfit group-hover:text-primary transition-colors">
          {contest.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 font-space-grotesk">
          {contest.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{contest.participants}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{contest.submissions}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{contest.timeLeft}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarFallback className="text-xs">
                {contest.creator.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground font-space-grotesk">
              by {contest.creator}
            </span>
          </div>
          
          <div className="flex items-center gap-1 text-primary">
            <Trophy className="w-4 h-4" />
            <span className="text-sm font-semibold">{contest.prize}</span>
          </div>
        </div>
        
        <Button className="w-full btn-primary font-space-grotesk">
          {contest.status === 'active' ? 'Join Contest' : 
           contest.status === 'voting' ? 'Vote Now' : 'View Results'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ContestCard;
