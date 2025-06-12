
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp, Shield, AlertCircle, Link as LinkIcon, CheckCircle, Loader2 } from 'lucide-react';
import BrokerageConnection from './BrokerageConnection';
import StockPortfolio from './StockPortfolio';

const StockLoans = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedBrokerage, setSelectedBrokerage] = useState<string | null>(null);

  const handleBrokerageConnect = (brokerage: string) => {
    setSelectedBrokerage(brokerage);
    setIsConnected(true);
  };

  if (!isConnected) {
    return <BrokerageConnection onConnect={handleBrokerageConnect} />;
  }

  return <StockPortfolio brokerage={selectedBrokerage!} />;
};

export default StockLoans;
