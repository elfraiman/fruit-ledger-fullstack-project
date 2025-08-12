import { Package, Plus } from 'lucide-react';
import { JSX } from 'preact';
import { Button } from '../generic/Button';
import { Card } from '../generic/Card';
import { EmptyState } from '../generic/EmptyState';
import { SectionHeader } from '../generic/SectionHeader';
import { FruitInventoryItem, IFruitInventoryItem } from './FruitInventoryItem';
import { IFruitWithCalories } from '@lepaya/shared';

interface IFruitInventoryListProps {
  fruits: IFruitInventoryItem[];
  availableFruits: IFruitWithCalories[];
  onAddFruit: () => void;
  onUpdateFruit: (index: number, field: keyof IFruitInventoryItem, value: any) => void;
  onRemoveFruit: (index: number) => void;
  selectedOffice: string;
  selectedOfficeName: string;
}

export function FruitInventoryList({
  fruits,
  availableFruits,
  onAddFruit,
  onUpdateFruit,
  onRemoveFruit,
  selectedOffice,
  selectedOfficeName
}: IFruitInventoryListProps): JSX.Element {

  return (
    <Card>
      <SectionHeader
        title={`Purchase fruit  ${selectedOfficeName ? `for ${selectedOfficeName}` : ''}`}
        icon={<Package className="w-5 h-5" />}
        action={
          <Button onClick={onAddFruit} disabled={!selectedOffice} variant="outlineAction" className="text-sm flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Fruit
          </Button>
        }
      />

      <div className="p-6">
        {fruits.length === 0 ? (
          <EmptyState
            icon={<Package className="w-16 h-16" />}
            title="No Fruits Added"
            description="Click the 'Add Fruit' button above to start building your inventory update."
          />
        ) : (
          <div className="space-y-4">
            {fruits.map((fruit, index) => (
              <FruitInventoryItem
                key={index}
                fruit={fruit}
                index={index}
                availableFruits={availableFruits}
                onUpdate={onUpdateFruit}
                onRemove={onRemoveFruit}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
