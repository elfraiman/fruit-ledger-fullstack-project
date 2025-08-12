import { JSX } from 'preact';
import { useState } from 'preact/hooks';
import useFruits from '../../hooks/useFruits';
import usePurchaseFruit from '../../hooks/useLedger';
import { CherrySpinner } from '../generic/CherrySpinner';
import { StatusMessage } from '../generic/StatusMessage';
import { IFruitInventoryItem } from './FruitInventoryItem';
import { FruitInventoryList } from './FruitInventoryList';
import { StockUpdateSummary } from './StockUpdateSummary';
import toast from 'react-hot-toast';
import { ILocation } from '@lepaya/shared';


interface StockUpdateSectionProps {
  selectedOffice: string;
  locations: ILocation[];
}

export function StockUpdateSection({ selectedOffice, locations }: StockUpdateSectionProps): JSX.Element {
  const [fruits, setFruits] = useState<IFruitInventoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { data: fruitsData, isLoading: fruitsLoading } = useFruits();
  const purchaseMutation = usePurchaseFruit();

  const addFruitRow = () => {
    setFruits([...fruits, { id: 0, name: '', fruityvice_id: null, amount: 0, calories: 0 }]);
  };

  const updateFruit = (index: number, field: keyof IFruitInventoryItem, value: string | number) => {
    const updatedFruits = [...fruits];
    updatedFruits[index] = { ...updatedFruits[index], [field]: value };

    // If fruit is selected, calculate calories
    //
    if (field === 'id' || field === 'amount') {
      const fruit = fruitsData?.data.find(f => f.id === updatedFruits[index].id);

      if (fruit && updatedFruits[index].amount > 0) {
        updatedFruits[index].calories = (fruit.calories || 0) * updatedFruits[index].amount;
        updatedFruits[index].name = fruit.name;
        updatedFruits[index].fruityvice_id = fruit.fruityvice_id;
      }
    }

    setFruits(updatedFruits);
  };

  const removeFruit = (index: number) => {
    setFruits(fruits.filter((_, i) => i !== index));
  };

  const getTotalCalories = () => {
    return fruits.reduce((total, fruit) => total + fruit.calories, 0);
  };

  const handleStockUpdate = async () => {
    if (!selectedOffice || fruits.length === 0) return;

    const totalCalories = getTotalCalories();

    if (totalCalories > 250) {
      setErrorMessage('Total calories exceed 250kcal limit. Please reduce the quantities.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const fruitsWithCalories = fruits.map(f => ({
        id: f.id,
        amount: f.amount,
        calories: f.calories
      }));

      const response = await purchaseMutation.mutateAsync({
        fruits: fruitsWithCalories,
        locationId: parseInt(selectedOffice)
      });

      console.log('Purchase response:', response);

      toast.success('Stock updated successfully');
      setFruits([]);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update stock. Please try again.';
      setErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const totalCalories = getTotalCalories();
  const isOverLimit = totalCalories > 250;
  const isFormValid = selectedOffice && fruits.length > 0 && fruits.every(f => f.id > 0 && f.amount > 0);


  // Get the selected office name for display
  //
  const selectedOfficeName = selectedOffice
    ? locations?.find(loc => loc.id.toString() === selectedOffice)?.name || 'Unknown Office'
    : '';

  return (
    <div className="space-y-6 md:w-3xl mx-auto">

      <FruitInventoryList
        fruits={fruits}
        availableFruits={fruitsData?.data || []}
        onAddFruit={addFruitRow}
        onUpdateFruit={updateFruit}
        onRemoveFruit={removeFruit}
        selectedOffice={selectedOffice}
        selectedOfficeName={selectedOfficeName}
      />

      {fruitsLoading && (
        <div className="text-center py-4">
          <CherrySpinner size={100} />
        </div>
      )}

      {/* Summary & Actions */}
      {fruits.length > 0 && (
        <StockUpdateSummary
          totalCalories={totalCalories}
          isOverLimit={isOverLimit}
          isFormValid={isFormValid}
          loading={loading}
          onUpdate={handleStockUpdate}
        />
      )}

      {errorMessage && (
        <StatusMessage
          type="error"
          title="Update Failed"
          message={errorMessage}
        />
      )}
    </div>
  );
}