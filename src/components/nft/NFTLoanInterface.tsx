
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Coins } from 'lucide-react';
import NFTLoanHistory from './NFTLoanHistory';
import NFTAnalytics from './NFTAnalytics';
import { NFTItem } from '@/types/nft';

interface NFTLoanInterfaceProps {
  nft: NFTItem;
}

const NFTLoanInterface = ({ nft }: NFTLoanInterfaceProps) => {
  const [loanAmount, setLoanAmount] = useState([70]);
  const [loanDuration, setLoanDuration] = useState([30]);

  // Add null checks and default values
  const maxLoanString = nft.maxLoan || '0 ETH';
  const interestString = nft.interest || '0% APR';
  
  const maxLoanValue = parseFloat(maxLoanString.replace(' ETH', ''));
  const requestedLoan = (maxLoanValue * loanAmount[0]) / 100;
  const interestRate = parseFloat(interestString.replace('% APR', '')) / 100;

  return (
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
                    <span className="font-semibold">{interestString}</span>
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
                    <span className="font-semibold">{interestString}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-semibold">{nft.duration || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lender</span>
                    <span className="font-mono text-sm">{nft.lender || 'N/A'}</span>
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

        <TabsContent value="history">
          <NFTLoanHistory />
        </TabsContent>

        <TabsContent value="analytics">
          <NFTAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NFTLoanInterface;
