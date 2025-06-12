
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "@/contexts/WalletContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Markets from "./pages/Markets";
import Governance from "./pages/Governance";
import Staking from "./pages/Staking";
import NFTLending from "./pages/NFTLending";
import VentureVaults from "./pages/VentureVaults";
import BorrowLend from "./pages/BorrowLend";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <WalletProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/governance" element={<Governance />} />
            <Route path="/staking" element={<Staking />} />
            <Route path="/nft-lending" element={<NFTLending />} />
            <Route path="/venture-vaults" element={<VentureVaults />} />
            <Route path="/borrow-lend" element={<BorrowLend />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </WalletProvider>
  </QueryClientProvider>
);

export default App;
