
import { Card, CardContent } from '@/components/ui/card';
import { TraitItem } from '@/types/nft';

interface NFTTraitsProps {
  traits: TraitItem[];
}

const NFTTraits = ({ traits }: NFTTraitsProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <h4 className="font-semibold mb-3">Traits</h4>
        <div className="grid grid-cols-2 gap-2">
          {traits.map((trait, index) => (
            <div key={index} className="bg-muted p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">{trait.trait}</p>
              <p className="font-semibold">{trait.value}</p>
              <p className="text-xs text-primary">{trait.rarity} rare</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NFTTraits;
