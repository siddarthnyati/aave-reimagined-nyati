
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import NFTImageSection from './NFTImageSection';
import NFTLoanInterface from './NFTLoanInterface';
import { NFTItem } from '@/types/nft';

interface NFTDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nft: NFTItem | null;
}

const NFTDetailModal = ({ open, onOpenChange, nft }: NFTDetailModalProps) => {
  if (!nft) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{nft.name}</span>
            <div className="flex items-center gap-2">
              <Badge variant={nft.status === 'Available' ? 'default' : 'secondary'}>
                {nft.status}
              </Badge>
              <Button variant="ghost" size="sm">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NFTImageSection nft={nft} />
          <NFTLoanInterface nft={nft} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NFTDetailModal;
