
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { ExternalLink, TrendingUp, Clock, Coins } from 'lucide-react';

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
  } | null;
}

const NFTDetailModal = ({ open, onOpenChange, nft }: NFTDetailModalProps) => {
  const [loanAmount, setLoanAmount] = useState([70]);
  const [loanDuration, setLoanDuration] = useState([30]);

  if (!nft) return null;

  const maxLoanValue = parseFloat(nft.maxLoan.replace(' ETH', ''));
  const requestedLoan = (maxLoanValue * loanAmount[0]) / 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{nft.name}</span>
            <Button variant="ghost" size="sm">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image Section */}
          <div className="space-y-4">
            <AspectRatio ratio={1}>
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </AspectRatio>
            
            {/* Traits */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">Background</p>
                <p className="font-semibold">Blue</p>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">Eyes</p>
                <p className="font-semibold">Laser</p>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">Mouth</p>
                <p className="font-semibold">Bored</p>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">Rarity</p>
                <p className="font-semibold text-primary">Top 5%</p>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">{nft.collection}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Floor Price</p>
                  <p className="text-lg font-bold">{nft.floorPrice}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Max Loan</p>
                  <p className="text-lg font-bold text-primary">{nft.maxLoan}</p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="borrow" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="borrow">Borrow</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>

              <TabsContent value="borrow" className="space-y-4 mt-4">
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

                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span>Interest Rate</span>
                    <span className="font-semibold">12% APR</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Interest</span>
                    <span className="font-semibold">
                      {((requestedLoan * 0.12 * loanDuration[0]) / 365).toFixed(3)} ETH
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Repayment</span>
                    <span className="font-semibold text-primary">
                      {(requestedLoan + (requestedLoan * 0.12 * loanDuration[0]) / 365).toFixed(3)} ETH
                    </span>
                  </div>
                </div>

                <Button className="w-full btn-primary" size="lg">
                  <Coins className="w-4 h-4 mr-2" />
                  Request Loan
                </Button>
              </TabsContent>

              <TabsContent value="details" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Token ID</span>
                    <span className="font-semibold">#{nft.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contract</span>
                    <span className="font-mono text-sm">0xBC4C...a2B3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Blockchain</span>
                    <span className="font-semibold">Ethereum</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Sale</span>
                    <span className="font-semibold">14.2 ETH</span>
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="font-semibold mb-2">Price History</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span>+15.3% from floor price</span>
                  </div>
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
