
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield, AlertTriangle, CheckCircle, Star } from 'lucide-react';

interface InsuranceOption {
  id: string;
  name: string;
  logo: string;
  premium: number;
  coverage: number;
  duration: string;
  rating: number;
  features: string[];
  description: string;
}

interface InsuranceModalProps {
  isOpen: boolean;
  onClose: () => void;
  borrowAmount: number;
  asset: string;
  onConfirm: (insuranceId?: string) => void;
}

const insuranceOptions: InsuranceOption[] = [
  {
    id: 'nexus-mutual',
    name: 'Nexus Mutual',
    logo: '🛡️',
    premium: 2.5,
    coverage: 80,
    duration: '365 days',
    rating: 4.8,
    features: ['Smart Contract Coverage', 'Protocol Hack Protection', 'Technical Risk Coverage'],
    description: 'Comprehensive DeFi insurance with proven track record'
  },
  {
    id: 'insurace',
    name: 'InsurAce',
    logo: '🏛️',
    premium: 1.8,
    coverage: 70,
    duration: '180 days',
    rating: 4.5,
    features: ['Multi-chain Coverage', 'Liquidation Protection', 'Portfolio Insurance'],
    description: 'Multi-chain insurance protocol with competitive rates'
  },
  {
    id: 'unslashed',
    name: 'Unslashed Finance',
    logo: '⚡',
    premium: 3.2,
    coverage: 90,
    duration: '365 days',
    rating: 4.6,
    features: ['High Coverage Ratio', 'Instant Claims', 'Staking Protection'],
    description: 'Premium insurance with highest coverage ratios'
  }
];

const InsuranceModal = ({ isOpen, onClose, borrowAmount, asset, onConfirm }: InsuranceModalProps) => {
  const [selectedInsurance, setSelectedInsurance] = useState<string | null>(null);
  const [skipInsurance, setSkipInsurance] = useState(false);

  const handleConfirm = () => {
    if (skipInsurance) {
      onConfirm();
    } else if (selectedInsurance) {
      onConfirm(selectedInsurance);
    }
    onClose();
  };

  const selectedOption = insuranceOptions.find(opt => opt.id === selectedInsurance);
  const estimatedPremium = selectedOption ? (borrowAmount * selectedOption.premium / 100) : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-500" />
            Protect Your Position with Insurance
          </DialogTitle>
          <DialogDescription>
            Borrowing ${borrowAmount.toLocaleString()} {asset}. Consider insurance to protect against liquidation and protocol risks.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <span className="font-medium text-yellow-800">Why Consider Insurance?</span>
            </div>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Protect against unexpected liquidations</li>
              <li>• Coverage for smart contract risks</li>
              <li>• Peace of mind during market volatility</li>
            </ul>
          </div>

          <div className="space-y-3">
            {insuranceOptions.map((option) => (
              <Card 
                key={option.id} 
                className={`cursor-pointer transition-all ${
                  selectedInsurance === option.id 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedInsurance(option.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{option.logo}</div>
                      <div>
                        <CardTitle className="text-lg">{option.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${
                                  i < Math.floor(option.rating) 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{option.rating}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">{option.coverage}% Coverage</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{option.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <span className="text-sm font-medium">Premium:</span>
                      <p className="text-lg font-bold text-blue-600">{option.premium}% APR</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Duration:</span>
                      <p className="text-lg font-bold">{option.duration}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    {option.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {selectedInsurance === option.id && (
                    <div className="mt-3 p-3 bg-blue-50 rounded border">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Estimated Premium:</span>
                        <span className="font-bold text-blue-600">
                          ${estimatedPremium.toFixed(2)} {asset}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex items-center space-x-2 p-4 border rounded">
            <Checkbox 
              id="skip-insurance" 
              checked={skipInsurance}
              onCheckedChange={setSkipInsurance}
            />
            <label htmlFor="skip-insurance" className="text-sm">
              Skip insurance (I understand the risks)
            </label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={!selectedInsurance && !skipInsurance}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {skipInsurance ? 'Proceed Without Insurance' : 'Get Insurance & Borrow'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InsuranceModal;
