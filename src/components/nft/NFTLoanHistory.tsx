
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { History } from 'lucide-react';
import { LoanHistoryItem } from '@/types/nft';

const NFTLoanHistory = () => {
  const loanHistory: LoanHistoryItem[] = [
    { date: '2024-05-15', amount: '4.2 ETH', duration: '30 days', status: 'Completed', lender: '0x1234...5678' },
    { date: '2024-04-10', amount: '3.8 ETH', duration: '21 days', status: 'Completed', lender: '0x9876...5432' },
    { date: '2024-03-20', amount: '5.1 ETH', duration: '45 days', status: 'Defaulted', lender: '0x5555...3333' }
  ];

  return (
    <div className="space-y-4 mt-4">
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
    </div>
  );
};

export default NFTLoanHistory;
