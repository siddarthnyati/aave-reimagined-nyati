
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Play, TrendingUp, Users, Target, Shield, DollarSign, Eye, EyeOff } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  logo: string;
  apy: string;
  vaultFilled: number;
  supporters: number;
  teamBackground: string;
  fundingGoal: number;
  currentFunding: number;
  riskScore: number;
  expectedYield: string;
  tokenRewards: string;
  lockupPeriod: string;
  hasVideo: boolean;
}

interface BackedProject {
  projectName: string;
  amountBacked: string;
  estimatedYield: string;
  dateBackeed: string;
}

const CommunityVaults = () => {
  const { toast } = useToast();
  const [hiddenProjects, setHiddenProjects] = useState<string[]>([]);
  const [backAmount, setBackAmount] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 'defi-pulse',
      name: 'DeFi Pulse Index 2.0',
      description: 'Next-generation DeFi index with automated rebalancing and yield optimization.',
      logo: '📊',
      apy: '12-15%',
      vaultFilled: 75,
      supporters: 234,
      teamBackground: 'Founded by ex-Coinbase engineers with 5+ years in DeFi. Previously built successful yield aggregation protocols with $50M+ TVL.',
      fundingGoal: 500000,
      currentFunding: 375000,
      riskScore: 6,
      expectedYield: '12-15% APY',
      tokenRewards: 'DPI tokens + platform governance tokens',
      lockupPeriod: '3 months minimum',
      hasVideo: true
    },
    {
      id: 'cross-chain-bridge',
      name: 'OmniChain Bridge',
      description: 'Secure cross-chain asset bridge with zero-knowledge proof validation.',
      logo: '🌉',
      apy: '8-11%',
      vaultFilled: 45,
      supporters: 156,
      teamBackground: 'Team includes former Ethereum Foundation researchers and Polygon core contributors. Published 3 academic papers on cross-chain security.',
      fundingGoal: 750000,
      currentFunding: 337500,
      riskScore: 7,
      expectedYield: '8-11% APY',
      tokenRewards: 'OMNI tokens + transaction fee sharing',
      lockupPeriod: '6 months minimum',
      hasVideo: true
    },
    {
      id: 'nft-fractionalization',
      name: 'FractoNFT Protocol',
      description: 'Democratize NFT ownership through advanced fractionalization and liquidity pools.',
      logo: '🎨',
      apy: '15-20%',
      vaultFilled: 30,
      supporters: 89,
      teamBackground: 'Art industry veterans turned crypto, previously launched successful NFT marketplaces. Backed by major NFT funds.',
      fundingGoal: 300000,
      currentFunding: 90000,
      riskScore: 8,
      expectedYield: '15-20% APY',
      tokenRewards: 'FRACTO tokens + NFT royalty sharing',
      lockupPeriod: '4 months minimum',
      hasVideo: false
    },
    {
      id: 'sustainable-defi',
      name: 'GreenChain Carbon Credits',
      description: 'Tokenized carbon credits with transparent verification and automated trading.',
      logo: '🌱',
      apy: '6-9%',
      vaultFilled: 60,
      supporters: 312,
      teamBackground: 'Environmental scientists and blockchain developers. Partnerships with major carbon credit registries and ESG funds.',
      fundingGoal: 600000,
      currentFunding: 360000,
      riskScore: 4,
      expectedYield: '6-9% APY',
      tokenRewards: 'GREEN tokens + carbon credit allocations',
      lockupPeriod: '12 months minimum',
      hasVideo: true
    },
    {
      id: 'ai-trading-bot',
      name: 'DeepTrade AI',
      description: 'AI-powered trading algorithms optimized for DeFi markets and arbitrage.',
      logo: '🤖',
      apy: '18-25%',
      vaultFilled: 85,
      supporters: 178,
      teamBackground: 'Former quant traders from Goldman Sachs and Two Sigma. PhD in Machine Learning from MIT. Track record of 300%+ returns.',
      fundingGoal: 1000000,
      currentFunding: 850000,
      riskScore: 9,
      expectedYield: '18-25% APY',
      tokenRewards: 'DEEP tokens + profit sharing',
      lockupPeriod: '6 months minimum',
      hasVideo: true
    },
    {
      id: 'real-estate-tokens',
      name: 'PropertyDAO',
      description: 'Fractional real estate investment through blockchain and smart contracts.',
      logo: '🏠',
      apy: '7-10%',
      vaultFilled: 20,
      supporters: 67,
      teamBackground: 'Real estate investment professionals with blockchain expertise. Managed $100M+ in traditional real estate investments.',
      fundingGoal: 800000,
      currentFunding: 160000,
      riskScore: 5,
      expectedYield: '7-10% APY',
      tokenRewards: 'PROP tokens + rental income sharing',
      lockupPeriod: '24 months minimum',
      hasVideo: false
    }
  ];

  const [backedProjects] = useState<BackedProject[]>([
    {
      projectName: 'DeFi Pulse Index 2.0',
      amountBacked: '$2,500',
      estimatedYield: '13.5% APY',
      dateBackeed: '2024-01-15'
    },
    {
      projectName: 'GreenChain Carbon Credits',
      amountBacked: '$1,000',
      estimatedYield: '7.2% APY',
      dateBackeed: '2024-02-01'
    }
  ]);

  const visibleProjects = projects.filter(project => !hiddenProjects.includes(project.id));

  const handleBackProject = (project: Project) => {
    if (!backAmount || parseFloat(backAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid backing amount.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Project Backed Successfully",
      description: `You backed ${project.name} with $${backAmount}`,
    });
    setBackAmount('');
    setSelectedProject(null);
  };

  const handleIgnoreProject = (projectId: string, projectName: string) => {
    setHiddenProjects(prev => [...prev, projectId]);
    toast({
      title: "Project Hidden",
      description: `You chose to skip ${projectName}`,
    });
  };

  const getRiskColor = (score: number) => {
    if (score <= 3) return 'text-green-600';
    if (score <= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskLevel = (score: number) => {
    if (score <= 3) return 'Low Risk';
    if (score <= 6) return 'Medium Risk';
    return 'High Risk';
  };

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Community Vaults — Discover & Support Web3 Projects</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore promising early-stage projects and choose which ones to support with your capital.
        </p>
      </section>

      {/* Discovery Grid */}
      <section>
        <h3 className="text-2xl font-bold mb-6">Discover Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project) => (
            <Card key={project.id} className="glass-card hover-lift">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{project.logo}</div>
                    <div>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        {project.hasVideo && (
                          <Badge variant="secondary" className="text-xs">
                            <Play className="w-3 h-3 mr-1" />
                            Video
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-sm">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-primary">{project.apy}</div>
                    <div className="text-xs text-muted-foreground">Expected APY</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{project.vaultFilled}%</div>
                    <div className="text-xs text-muted-foreground">Vault Filled</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{project.supporters}</div>
                    <div className="text-xs text-muted-foreground">Supporters</div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center space-x-2">
                          <span className="text-2xl">{project.logo}</span>
                          <span>{project.name}</span>
                        </DialogTitle>
                        <DialogDescription>{project.description}</DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-6">
                        {project.hasVideo && (
                          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                            <div className="text-center">
                              <Play className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">Project Demo Video</p>
                            </div>
                          </div>
                        )}

                        <div>
                          <Label className="text-base font-semibold">Team Background</Label>
                          <p className="mt-1 text-sm text-muted-foreground">{project.teamBackground}</p>
                        </div>

                        <div>
                          <Label className="text-base font-semibold">Funding Progress</Label>
                          <div className="mt-2">
                            <div className="flex justify-between text-sm mb-1">
                              <span>${project.currentFunding.toLocaleString()}</span>
                              <span>${project.fundingGoal.toLocaleString()} goal</span>
                            </div>
                            <Progress value={(project.currentFunding / project.fundingGoal) * 100} />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Risk Score</Label>
                            <p className={`font-semibold ${getRiskColor(project.riskScore)}`}>
                              {project.riskScore}/10 - {getRiskLevel(project.riskScore)}
                            </p>
                          </div>
                          <div>
                            <Label>Expected Yield</Label>
                            <p className="font-semibold text-primary">{project.expectedYield}</p>
                          </div>
                        </div>

                        <div>
                          <Label>Token Rewards</Label>
                          <p className="text-sm">{project.tokenRewards}</p>
                        </div>

                        <div>
                          <Label>Terms & Lockup</Label>
                          <p className="text-sm">{project.lockupPeriod}</p>
                        </div>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full btn-primary">
                              <Target className="w-4 h-4 mr-2" />
                              Back This Project
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Back {project.name}</DialogTitle>
                              <DialogDescription>Enter the amount you'd like to invest</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="backAmount">Amount (USD)</Label>
                                <Input
                                  id="backAmount"
                                  type="number"
                                  placeholder="1000"
                                  value={backAmount}
                                  onChange={(e) => setBackAmount(e.target.value)}
                                />
                              </div>
                              <Button 
                                className="w-full btn-primary"
                                onClick={() => handleBackProject(project)}
                              >
                                Confirm Investment
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="btn-primary flex-1" size="sm">
                        <Target className="w-4 h-4 mr-1" />
                        Back Project
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Back {project.name}</DialogTitle>
                        <DialogDescription>Enter the amount you'd like to invest</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="quickBackAmount">Amount (USD)</Label>
                          <Input
                            id="quickBackAmount"
                            type="number"
                            placeholder="1000"
                            value={backAmount}
                            onChange={(e) => setBackAmount(e.target.value)}
                          />
                        </div>
                        <Button 
                          className="w-full btn-primary"
                          onClick={() => handleBackProject(project)}
                        >
                          Confirm Investment
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleIgnoreProject(project.id, project.name)}
                  >
                    <EyeOff className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {hiddenProjects.length > 0 && (
          <div className="mt-6 text-center">
            <Button 
              variant="outline" 
              onClick={() => setHiddenProjects([])}
            >
              Show {hiddenProjects.length} Hidden Project{hiddenProjects.length > 1 ? 's' : ''}
            </Button>
          </div>
        )}
      </section>

      {/* Your Backed Projects */}
      <section>
        <h3 className="text-2xl font-bold mb-6">Your Backed Projects</h3>
        <Card className="glass-card">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Amount Backed</TableHead>
                  <TableHead>Estimated Yield</TableHead>
                  <TableHead>Date Backed</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {backedProjects.map((project, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{project.projectName}</TableCell>
                    <TableCell>{project.amountBacked}</TableCell>
                    <TableCell className="text-primary">{project.estimatedYield}</TableCell>
                    <TableCell>{project.dateBackeed}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled
                      >
                        Locked
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default CommunityVaults;
