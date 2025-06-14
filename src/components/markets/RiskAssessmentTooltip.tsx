
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';

interface RiskAssessmentTooltipProps {
  type: 'supplyAPY' | 'borrowAPY' | 'liquidity';
  value: string;
}

const RiskAssessmentTooltip = ({ type, value }: RiskAssessmentTooltipProps) => {
  const getRiskInfo = () => {
    switch (type) {
      case 'supplyAPY':
        return {
          title: 'Supply APY Risk Assessment',
          description: 'Annual percentage yield for supplying this asset',
          factors: [
            'Higher APY may indicate higher risk or new incentives',
            'Rates fluctuate based on supply and demand',
            'Consider protocol security and asset volatility'
          ],
          icon: TrendingUp
        };
      case 'borrowAPY':
        return {
          title: 'Borrow APY Risk Assessment',
          description: 'Annual percentage rate for borrowing this asset',
          factors: [
            'Variable rates based on utilization',
            'Higher rates during high demand periods',
            'Factor in liquidation risks and collateral requirements'
          ],
          icon: DollarSign
        };
      case 'liquidity':
        return {
          title: 'Liquidity Risk Assessment',
          description: 'Available liquidity for instant transactions',
          factors: [
            'Low liquidity may cause slippage',
            'Higher liquidity means easier entry/exit',
            'Consider market depth for large transactions'
          ],
          icon: AlertTriangle
        };
      default:
        return {
          title: 'Risk Assessment',
          description: 'General risk information',
          factors: [],
          icon: Info
        };
    }
  };

  const riskInfo = getRiskInfo();
  const IconComponent = riskInfo.icon;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="w-4 h-4 text-muted-foreground hover:text-primary cursor-help ml-1" />
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <IconComponent className="w-5 h-5 text-primary" />
              <h4 className="font-semibold">{riskInfo.title}</h4>
            </div>
            <p className="text-sm text-muted-foreground">{riskInfo.description}</p>
            <div className="space-y-1">
              {riskInfo.factors.map((factor, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">{factor}</p>
                </div>
              ))}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RiskAssessmentTooltip;
