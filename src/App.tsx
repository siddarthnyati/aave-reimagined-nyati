import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "@/contexts/WalletContext";
import { LearnModeProvider } from "@/contexts/LearnModeContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Markets from "./pages/Markets";
import CreditCard from "./pages/CreditCard";
import AIStrategies from "./pages/AIStrategies";
import NFTLending from "./pages/NFTLending";
import VentureVaults from "./pages/VentureVaults";
import BorrowLend from "./pages/BorrowLend";
import CommunityContest from "./pages/CommunityContest";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <WalletProvider>
      <LearnModeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/markets" element={<Markets />} />
              <Route path="/credit-card" element={<CreditCard />} />
              <Route path="/ai-strategies" element={<AIStrategies />} />
              <Route path="/nft-lending" element={<NFTLending />} />
              <Route path="/venture-vaults" element={<VentureVaults />} />
              <Route path="/borrow-lend" element={<BorrowLend />} />
              <Route path="/community-contest" element={<CommunityContest />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LearnModeProvider>
    </WalletProvider>
  </QueryClientProvider>
);

export default App;
