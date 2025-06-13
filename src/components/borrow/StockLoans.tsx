
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import BrokerageConnection from './BrokerageConnection';
import CryptoStockConnection from './CryptoStockConnection';
import StockBorrowing from './StockBorrowing';
import StockLending from './StockLending';

type CategoryType = 'traditional' | 'crypto';

const StockLoans = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  const handleCategorySelect = (category: CategoryType) => {
    setSelectedCategory(category);
  };

  const handlePlatformConnect = (platform: string) => {
    setSelectedPlatform(platform);
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setSelectedPlatform(null);
    setIsConnected(false);
    setSelectedCategory(null);
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setIsConnected(false);
    setSelectedPlatform(null);
  };

  // Category Selection Screen
  if (!selectedCategory) {
    return (
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center py-8">
          <h2 className="text-3xl font-bold mb-4">Choose Your Platform Type</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select between traditional brokerages or crypto platforms offering wrapped stocks
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card 
            className="glass-card hover-lift cursor-pointer group"
            onClick={() => handleCategorySelect('traditional')}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-3xl">
                🏦
              </div>
              <CardTitle className="text-2xl">Traditional Brokerage</CardTitle>
              <CardDescription className="text-base">
                Connect your existing stock portfolio from traditional brokerages
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Supported Platforms:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-muted px-2 py-1 rounded">Robinhood</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded">Webull</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded">E*TRADE</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded">TD Ameritrade</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">✓ Real stock ownership</p>
                <p className="text-sm text-muted-foreground">✓ Dividend rights</p>
                <p className="text-sm text-muted-foreground">✓ Voting rights</p>
                <p className="text-sm text-muted-foreground">✓ Up to 70% LTV</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="glass-card hover-lift cursor-pointer group"
            onClick={() => handleCategorySelect('crypto')}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-3xl">
                🔗
              </div>
              <CardTitle className="text-2xl">Crypto Wrapped Stocks</CardTitle>
              <CardDescription className="text-base">
                Use tokenized stocks from crypto platforms as collateral
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Supported Platforms:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-muted px-2 py-1 rounded">Crypto.com</span>
                  <span className="text-xs bg-muted px-2 py-1 rounded">Kraken</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">✓ 24/7 trading</p>
                <p className="text-sm text-muted-foreground">✓ Instant settlement</p>
                <p className="text-sm text-muted-foreground">✓ Fractional shares</p>
                <p className="text-sm text-muted-foreground">✓ Up to 60% LTV</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="glass-card max-w-2xl mx-auto">
          <CardContent className="pt-6 text-center">
            <h3 className="font-semibold mb-2">Not sure which to choose?</h3>
            <p className="text-sm text-muted-foreground">
              Traditional brokerages offer real stock ownership with voting rights, while crypto wrapped stocks 
              provide 24/7 access and instant settlement. Both allow you to borrow against your holdings.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Connection Flow
  if (!isConnected) {
    return (
      <div className="space-y-6">
        <Button 
          variant="ghost" 
          onClick={handleBack}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Categories
        </Button>
        
        {selectedCategory === 'traditional' ? (
          <BrokerageConnection onConnect={handlePlatformConnect} />
        ) : (
          <CryptoStockConnection onConnect={handlePlatformConnect} />
        )}
      </div>
    );
  }

  // Connected - Show Borrowing/Lending Interface
  return (
    <div className="space-y-6">
      <Tabs defaultValue="borrow" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="borrow">Borrow Against Stocks</TabsTrigger>
          <TabsTrigger value="lend">Lend to Stock Borrowers</TabsTrigger>
        </TabsList>

        <TabsContent value="borrow">
          <StockBorrowing 
            brokerage={selectedPlatform!} 
            category={selectedCategory}
            onDisconnect={handleDisconnect}
          />
        </TabsContent>

        <TabsContent value="lend">
          <StockLending 
            brokerage={selectedPlatform!} 
            onDisconnect={handleDisconnect}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StockLoans;
