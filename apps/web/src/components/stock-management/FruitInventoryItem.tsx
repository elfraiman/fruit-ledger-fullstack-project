import { JSX } from 'preact';
import { Trash2 } from 'lucide-react';
import { Button } from '../generic/Button';
import { Input } from '../generic/Input';
import { Select } from '../generic/Select';
import { IFruitWithCalories } from '@lepaya/shared';

export interface IFruitInventoryItem extends Omit<IFruitWithCalories, 'calories'> {
  amount: number;
  calories: number; 
}

interface IFruitInventoryItemProps {
  fruit: IFruitInventoryItem;
  index: number;
  availableFruits: IFruitWithCalories[];
  onUpdate: (index: number, field: keyof IFruitInventoryItem, value: string | number) => void;
  onRemove: (index: number) => void;
}

export function FruitInventoryItem({
  fruit,
  index,
  availableFruits,
  onUpdate,
  onRemove
}: IFruitInventoryItemProps): JSX.Element {
  return (
    <div className="bg-gray-50 rounded-tr-xl rounded-br-xl rounded-tl-xl p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="md:col-span-1">
          <Select
            value={fruit.id}
            onChange={(value) => onUpdate(index, 'id', parseInt(value.toString()))}
            options={availableFruits.map(fruit => ({ value: fruit.id, label: fruit.name }))}
            placeholder="Select fruit"
            label="Fruit"
          />
        </div>

        <div>
          <Input
            value={fruit.amount}
            onChange={(value) => onUpdate(index, 'amount', parseInt(value) || 0)}
            placeholder="0"
            type="number"
            label="Amount"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2">Calories</label>
          <div className="px-3 py-3 bg-white border border-gray-300 rounded-tl-md rounded-tr-md rounded-br-md  font-medium">
            {fruit.calories} kcal
          </div>
        </div>

        <div>
          <Button
            onClick={() => onRemove(index)}
            variant="primary"
            className="flex items-center justify-center w-full"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
