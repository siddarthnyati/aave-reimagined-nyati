
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BrokerageConnection from './BrokerageConnection';
import StockBorrowing from './StockBorrowing';
import StockLending from './StockLending';

const StockLoans = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedBrokerage, setSelectedBrokerage] = useState<string | null>(null);

  const handleBrokerageConnect = (brokerage: string) => {
    setSelectedBrokerage(brokerage);
    setIsConnected(true);
  };

  const handleBrokerageDisconnect = () => {
    setSelectedBrokerage(null);
    setIsConnected(false);
  };

  if (!isConnected) {
    return <BrokerageConnection onConnect={handleBrokerageConnect} />;
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="borrow" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="borrow">Borrow Against Stocks</TabsTrigger>
          <TabsTrigger value="lend">Lend to Stock Borrowers</TabsTrigger>
        </TabsList>

        <TabsContent value="borrow">
          <StockBorrowing 
            brokerage={selectedBrokerage!} 
            onDisconnect={handleBrokerageDisconnect}
          />
        </TabsContent>

        <TabsContent value="lend">
          <StockLending 
            brokerage={selectedBrokerage!} 
            onDisconnect={handleBrokerageDisconnect}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StockLoans;
