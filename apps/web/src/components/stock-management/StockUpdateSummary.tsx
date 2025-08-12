import { JSX } from 'preact';
import { CheckCircle, AlertCircle, Check, Upload } from 'lucide-react';
import { Button } from '../generic/Button';
import { SectionHeader } from '../generic/SectionHeader';
import { CherrySpinner } from '../generic/CherrySpinner';
import { Card } from '../generic/Card';

interface StockUpdateSummaryProps {
  totalCalories: number;
  isOverLimit: boolean;
  isFormValid: boolean;
  loading: boolean;
  onUpdate: () => void;
}

export function StockUpdateSummary({
  totalCalories,
  isOverLimit,
  isFormValid,
  loading,
  onUpdate
}: StockUpdateSummaryProps): JSX.Element {
  return (
    <Card>
      <SectionHeader
        title="Update Summary"
        icon={<CheckCircle className="w-5 h-5" />}
      />

      <div className="p-4 space-y-4">
        <div className={`p-4 rounded-tr-xl rounded-br-xl rounded-tl-xl border ${isOverLimit ? 'bg-primary/10 border-primary' : 'bg-primaryAction/10 border-primaryAction/80'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`font-semibold ${isOverLimit ? 'text-red-700' : 'text-green-700'}`}>
                Total: {totalCalories} kcal / 250 kcal
              </p>
              {isOverLimit && (
                <p className="text-red-600 text-sm">
                  Please reduce quantities to stay within limit.
                </p>
              )}
            </div>
            <div className={`p-2 rounded-full ${isOverLimit ? 'bg-red-100' : 'bg-green-100'}`}>
              {isOverLimit ? (
                <AlertCircle className="w-5 h-5 text-red-600" />
              ) : (
                <Check className="w-5 h-5 text-green-600" />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={onUpdate}
            disabled={!isFormValid || loading || isOverLimit}
            variant="primaryAction"
          >
            {loading ? (
              <div className="flex items-center">
                <CherrySpinner size={10} />
                <span className="ml-2">Updating...</span>
              </div>
            ) : (
              <div className="flex items-center">
                <Upload className="w-4 h-4 mr-2" />
                Update Stock
              </div>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
