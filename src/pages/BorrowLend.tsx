
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import CryptoLending from '@/components/borrow/CryptoLending';
import StockLoans from '@/components/borrow/StockLoans';

const BorrowLend = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-16">
          <h1 className="text-5xl font-bold gradient-text mb-6">
            Borrow & Lend
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Unlock liquidity from your crypto and stock portfolios
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            Borrow against your assets or lend to earn yield across both traditional and decentralized markets.
          </p>
        </section>

        {/* Main Content Tabs */}
        <Tabs defaultValue="crypto" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="crypto">Crypto Lending</TabsTrigger>
            <TabsTrigger value="stocks">Stock Loans</TabsTrigger>
          </TabsList>

          <TabsContent value="crypto">
            <CryptoLending />
          </TabsContent>

          <TabsContent value="stocks">
            <StockLoans />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BorrowLend;
