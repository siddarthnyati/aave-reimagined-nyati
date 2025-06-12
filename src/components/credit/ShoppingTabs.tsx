
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Store, Gift, Smartphone, Send } from 'lucide-react';
import ShopsSection from './ShopsSection';
import GiftCardsSection from './GiftCardsSection';
import AirtimeSection from './AirtimeSection';
import SendCryptoSection from './SendCryptoSection';

const ShoppingTabs = () => {
  return (
    <div className="mb-8">
      <Tabs defaultValue="shops" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="shops" className="flex items-center gap-2">
            <Store className="w-4 h-4" />
            Shops
          </TabsTrigger>
          <TabsTrigger value="gift-cards" className="flex items-center gap-2">
            <Gift className="w-4 h-4" />
            Gift Cards
          </TabsTrigger>
          <TabsTrigger value="airtime" className="flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            Airtime
          </TabsTrigger>
          <TabsTrigger value="send-crypto" className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            Send Crypto
          </TabsTrigger>
        </TabsList>

        <TabsContent value="shops">
          <ShopsSection />
        </TabsContent>

        <TabsContent value="gift-cards">
          <GiftCardsSection />
        </TabsContent>

        <TabsContent value="airtime">
          <AirtimeSection />
        </TabsContent>

        <TabsContent value="send-crypto">
          <SendCryptoSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShoppingTabs;
