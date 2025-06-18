
import { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trophy, Users, Clock, Coins } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';
import CreateContestModal from '@/components/contest/CreateContestModal';
import ContestCard from '@/components/contest/ContestCard';

const CommunityContest = () => {
  const { isConnected } = useWallet();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Contests', count: 24 },
    { id: 'art', name: 'Art & Design', count: 8 },
    { id: 'memes', name: 'Memes', count: 12 },
    { id: 'ideas', name: 'Innovation Ideas', count: 4 },
    { id: 'predictions', name: 'Predictions', count: 6 },
    { id: 'coding', name: 'Coding', count: 3 },
  ];

  const featuredContests = [
    {
      id: 1,
      title: 'Best DeFi Meme of 2024',
      description: 'Create the most viral DeFi meme that captures the essence of decentralized finance',
      category: 'memes',
      participants: 234,
      submissions: 89,
      timeLeft: '5 days',
      prize: '1000 USDC',
      status: 'active',
      creator: '0x1234...5678',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'DeFi Protocol UI Design Challenge',
      description: 'Design a revolutionary user interface for the next generation DeFi protocol',
      category: 'art',
      participants: 156,
      submissions: 45,
      timeLeft: '12 days',
      prize: '2500 USDC',
      status: 'active',
      creator: '0xabcd...efgh',
      image: '/placeholder.svg'
    },
    {
      id: 3,
      title: 'Predict Next Bull Run Start Date',
      description: 'When will the next crypto bull run begin? Make your prediction and win big!',
      category: 'predictions',
      participants: 1024,
      submissions: 512,
      timeLeft: '2 days',
      prize: '5000 USDC',
      status: 'voting',
      creator: '0x9876...5432',
      image: '/placeholder.svg'
    }
  ];

  const myContests = [
    {
      id: 4,
      title: 'My Web3 Innovation Idea',
      description: 'Share your revolutionary Web3 concept that could change the world',
      category: 'ideas',
      participants: 67,
      submissions: 23,
      timeLeft: '8 days',
      prize: '800 USDC',
      status: 'active',
      creator: 'You',
      image: '/placeholder.svg'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 gradient-text font-outfit">
            Community Contests
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-space-grotesk">
            Create, participate, and vote in community-driven contests. Win prizes, showcase your talent, and connect with fellow creators.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="btn-primary px-8 py-3 text-lg font-space-grotesk"
              onClick={() => setCreateModalOpen(true)}
              disabled={!isConnected}
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Contest
            </Button>
            <Button variant="outline" className="btn-secondary px-8 py-3 text-lg font-space-grotesk">
              <Trophy className="w-5 h-5 mr-2" />
              View Leaderboard
            </Button>
          </div>
          
          {!isConnected && (
            <p className="text-sm text-muted-foreground mt-4">
              Connect your wallet to create and participate in contests
            </p>
          )}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold gradient-text">24</div>
              <div className="text-sm text-muted-foreground">Active Contests</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold gradient-text">1,247</div>
              <div className="text-sm text-muted-foreground">Participants</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <Coins className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold gradient-text">45K</div>
              <div className="text-sm text-muted-foreground">USDC Prizes</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold gradient-text">156</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="explore" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 glass-card">
            <TabsTrigger value="explore" className="font-space-grotesk">Explore Contests</TabsTrigger>
            <TabsTrigger value="my-contests" className="font-space-grotesk">My Contests</TabsTrigger>
            <TabsTrigger value="results" className="font-space-grotesk">Results</TabsTrigger>
          </TabsList>

          <TabsContent value="explore" className="space-y-8">
            {/* Categories Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`cursor-pointer px-4 py-2 font-space-grotesk ${
                    selectedCategory === category.id 
                      ? 'bg-primary text-black' 
                      : 'hover:bg-primary/20'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name} ({category.count})
                </Badge>
              ))}
            </div>

            {/* Featured Contests */}
            <div>
              <h2 className="text-2xl font-bold mb-6 font-outfit">Featured Contests</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredContests.map((contest) => (
                  <ContestCard key={contest.id} contest={contest} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="my-contests" className="space-y-8">
            {isConnected ? (
              <div>
                <h2 className="text-2xl font-bold mb-6 font-outfit">My Contests</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myContests.map((contest) => (
                    <ContestCard key={contest.id} contest={contest} />
                  ))}
                </div>
              </div>
            ) : (
              <Card className="glass-card text-center p-12">
                <CardContent>
                  <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
                  <p className="text-muted-foreground">
                    Connect your wallet to view your contests and submissions
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="results" className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6 font-outfit">Contest Results</h2>
              <Card className="glass-card text-center p-12">
                <CardContent>
                  <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Results Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Check back here to see winners and final results from completed contests
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <CreateContestModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
    </div>
  );
};

export default CommunityContest;
