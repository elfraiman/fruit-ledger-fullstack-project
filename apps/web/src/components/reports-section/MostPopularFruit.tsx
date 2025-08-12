import { Star } from 'lucide-react';
import { JSX } from 'preact';
import { Card } from '../generic/Card';
import { SectionHeader } from '../generic/SectionHeader';
import { EmptyState } from '../generic/EmptyState';
import { IFruitConsumption } from '@lepaya/shared';
import { CherrySpinner } from '../generic/CherrySpinner';

interface IMostPopularFruitProps {
  data: IFruitConsumption | null | undefined;
  isLoading?: boolean;
}

export function MostPopularFruit({ data, isLoading }: IMostPopularFruitProps): JSX.Element {
  if (isLoading) {
    return (
      <Card>
        <SectionHeader
          title="Most Popular Fruit"
          icon={<Star className="w-5 h-5" />}
        />
        <div className="p-6">
          <div className="animate-pulse">
            <div className="flex items-center space-x-4">
              <CherrySpinner size={16} />
              <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card>
        <SectionHeader
          title="Most Popular Fruit"
          icon={<Star className="w-5 h-5" />}
        />
        <EmptyState
          icon={<Star className="w-16 h-16" />}
          title="No Popular Fruit Data"
          description="No fruit consumption data available for the selected location and time period."
        />
      </Card>
    );
  }

  return (
    <Card>
      <SectionHeader
        title="Most Popular Fruit"
        icon={<Star className="w-5 h-5" />}
      />

      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-2xl font-bold mb-1">
                {data.fruit_name}
              </p>

              <p className="text-sm text-gray-600">
                {data.total_eaten} pieces consumed
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
