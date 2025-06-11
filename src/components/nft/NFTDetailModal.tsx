import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, TrendingUp, Clock, Coins, User, History, AlertTriangle } from 'lucide-react';

interface NFTDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nft: {
    id: number;
    name: string;
    collection: string;
    image: string;
    floorPrice: string;
    maxLoan: string;
    status: string;
    lender?: string;
    loanProgress?: number;
    activeUntil?: string;
    interest: string;
    duration: string;
  } | null;
}

const NFTDetailModal = ({ open, onOpenChange, nft }: NFTDetailModalProps) => {
  const [loanAmount, setLoanAmount] = useState([70]);
  const [loanDuration, setLoanDuration] = useState([30]);

  if (!nft) return null;

  const maxLoanValue = parseFloat(nft.maxLoan.replace(' ETH', ''));
  const requestedLoan = (maxLoanValue * loanAmount[0]) / 100;
  const interestRate = parseFloat(nft.interest.replace('% APR', '')) / 100;

  const loanHistory = [
    { date: '2024-05-15', amount: '4.2 ETH', duration: '30 days', status: 'Completed', lender: '0x1234...5678' },
    { date: '2024-04-10', amount: '3.8 ETH', duration: '21 days', status: 'Completed', lender: '0x9876...5432' },
    { date: '2024-03-20', amount: '5.1 ETH', duration: '45 days', status: 'Defaulted', lender: '0x5555...3333' }
  ];

  const traits = [
    { trait: 'Background', value: 'Cosmic Blue', rarity: '12%' },
    { trait: 'Pattern', value: 'Geometric', rarity: '8%' },
    { trait: 'Color Scheme', value: 'Neon', rarity: '15%' },
    { trait: 'Style', value: 'Abstract', rarity: '25%' }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{nft.name}</span>
            <div className="flex items-center gap-2">
              <Badge variant={nft.status === 'Available' ? 'default' : 'secondary'}>
                {nft.status}
              </Badge>
              <Button variant="ghost" size="sm">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image and Details Section */}
          <div className="space-y-4">
            <AspectRatio ratio={1} className="relative overflow-hidden rounded-lg">
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-full object-cover"
              />
              {nft.status === 'Active Loan' && nft.loanProgress && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3">
                  <div className="flex justify-between items-center text-white text-sm mb-2">
                    <span>Loan Progress</span>
                    <span>{nft.loanProgress}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${nft.loanProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </AspectRatio>
            
            {/* Collection Info */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">{nft.collection}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Floor Price</p>
                    <p className="text-lg font-bold">{nft.floorPrice}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Max Loan (70%)</p>
                    <p className="text-lg font-bold text-primary">{nft.maxLoan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Best Offer</p>
                    <p className="text-lg font-bold">6.2 ETH</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rarity Rank</p>
                    <p className="text-lg font-bold">#324</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Traits */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">Traits</h4>
                <div className="grid grid-cols-2 gap-2">
                  {traits.map((trait, index) => (
                    <div key={index} className="bg-muted p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">{trait.trait}</p>
                      <p className="font-semibold">{trait.value}</p>
                      <p className="text-xs text-primary">{trait.rarity} rare</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Loan Interface Section */}
          <div className="space-y-6">
            <Tabs defaultValue={nft.status === 'Available' ? 'borrow' : 'details'} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="borrow">
                  {nft.status === 'Available' ? 'Borrow' : 'Loan Details'}
                </TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="borrow" className="space-y-4 mt-4">
                {nft.status === 'Available' ? (
                  <>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium">Loan Amount</label>
                        <span className="text-sm text-muted-foreground">
                          {requestedLoan.toFixed(2)} ETH ({loanAmount[0]}%)
                        </span>
                      </div>
                      <Slider
                        value={loanAmount}
                        onValueChange={setLoanAmount}
                        max={70}
                        min={10}
                        step={5}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium">Duration</label>
                        <span className="text-sm text-muted-foreground">
                          {loanDuration[0]} days
                        </span>
                      </div>
                      <Slider
                        value={loanDuration}
                        onValueChange={setLoanDuration}
                        max={90}
                        min={7}
                        step={7}
                        className="w-full"
                      />
                    </div>

                    <Card className="bg-muted/50">
                      <CardContent className="p-4 space-y-2">
                        <div className="flex justify-between">
                          <span>Interest Rate</span>
                          <span className="font-semibold">{nft.interest}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Interest</span>
                          <span className="font-semibold">
                            {((requestedLoan * interestRate * loanDuration[0]) / 365).toFixed(3)} ETH
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Platform Fee (2%)</span>
                          <span className="font-semibold">
                            {(requestedLoan * 0.02).toFixed(3)} ETH
                          </span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between">
                          <span className="font-semibold">Total Repayment</span>
                          <span className="font-semibold text-primary">
                            {(requestedLoan + (requestedLoan * interestRate * loanDuration[0]) / 365).toFixed(3)} ETH
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    <Button className="w-full btn-primary" size="lg">
                      <Coins className="w-4 h-4 mr-2" />
                      Request Loan
                    </Button>
                  </>
                ) : (
                  <Card>
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Active Loan Details</h4>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Loan Amount</span>
                          <span className="font-semibold">8.5 ETH</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Interest Rate</span>
                          <span className="font-semibold">{nft.interest}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration</span>
                          <span className="font-semibold">{nft.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Lender</span>
                          <span className="font-mono text-sm">{nft.lender}</span>
                        </div>
                        {nft.activeUntil && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Due Date</span>
                            <span className="font-semibold">{nft.activeUntil}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1 btn-primary">
                          Repay Loan
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Renegotiate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="history" className="space-y-4 mt-4">
                <h4 className="font-semibold flex items-center">
                  <History className="w-4 h-4 mr-2" />
                  Loan History
                </h4>
                <div className="space-y-3">
                  {loanHistory.map((loan, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">{loan.amount}</p>
                            <p className="text-sm text-muted-foreground">{loan.duration}</p>
                            <p className="text-xs text-muted-foreground">{loan.date}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={loan.status === 'Completed' ? 'default' : 'destructive'}>
                              {loan.status}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">{loan.lender}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Price Performance</h4>
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-green-500">+15.3% vs floor price</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm mt-1">
                        <span className="text-muted-foreground">Last sale: 14.2 ETH (2 days ago)</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Loan Risk Assessment</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Liquidity Score</span>
                          <span className="text-sm font-semibold text-green-500">8.2/10</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Collection Health</span>
                          <span className="text-sm font-semibold text-green-500">Strong</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Default Risk</span>
                          <span className="text-sm font-semibold text-yellow-500">Low-Medium</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Risk Factors
                      </h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Collection floor price volatility: Medium</li>
                        <li>• Previous default in loan history</li>
                        <li>• Trait rarity could affect liquidity</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NFTDetailModal;
