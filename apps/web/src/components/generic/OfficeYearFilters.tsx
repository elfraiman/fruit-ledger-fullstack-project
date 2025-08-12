import React, { useMemo } from 'react';
import { Select } from './Select';
import { CherrySpinner } from './CherrySpinner';
import useLocations from '../../hooks/useLocations';
import { StatusMessage } from './StatusMessage';
import { EmptyState } from './EmptyState';
import { Building2 } from 'lucide-react';

interface OfficeYearFiltersProps {
  selectedOffice: string;
  selectedYear: string;
  onOfficeChange: (value: string) => void;
  onYearChange: (value: string) => void;
  showYearSelector?: boolean;
}

const YEARS = [
  { value: 2025, label: '2025' },
  { value: 2024, label: '2024' },
  { value: 2023, label: '2023' },
  { value: 2022, label: '2022' },
  { value: 2021, label: '2021' },
  { value: 2020, label: '2020' },
  { value: 2019, label: '2019' },
  { value: 2018, label: '2018' },
  { value: 2017, label: '2017' },
  { value: 2016, label: '2016' },
];

export const OfficeYearFilters: React.FC<OfficeYearFiltersProps> = ({
  selectedOffice,
  selectedYear,
  onOfficeChange,
  onYearChange,
  showYearSelector = true
}) => {
  const { data: locations, isLoading: isLocationsLoading, error: locationsError } = useLocations();

  const locationOptions = useMemo(() =>
    locations?.data?.map((location) => ({
      value: location.id.toString(),
      label: location.name
    })) || [],
    [locations]
  );

  const renderContent = () => {
    if (isLocationsLoading) {
      return (
        <div className="animate-pulse">
          <div className={`grid grid-cols-1 ${showYearSelector ? 'md:grid-cols-2' : ''} gap-4`}>
            <div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-24"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
            {showYearSelector && (
              <div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-16"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (locationsError) {
      return (
        <StatusMessage
          type="error"
          title="Failed to Load Locations"
          message="Unable to fetch office locations. Please try again later."
        />
      );
    }

    if (!locations?.data || locations.data.length === 0) {
      return (
        <EmptyState
          icon={<Building2 className="w-16 h-16" />}
          title="No Office Locations"
          description="No office locations are currently available. Please contact your administrator."
        />
      );
    }

    return (
      <div className={`grid grid-cols-1 ${showYearSelector ? 'md:grid-cols-2' : ''} gap-4`}>
        <Select
          value={selectedOffice}
          onChange={onOfficeChange}
          options={locationOptions}
          placeholder="Select office location"
          label="Office Location"
        />

        {showYearSelector && (
          <Select
            value={selectedYear}
            onChange={onYearChange}
            options={YEARS}
            placeholder="Select year"
            label="Year"
          />
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-tr-xl rounded-br-xl rounded-tl-xl p-6 border border-gray-200">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Office & Year Selection</h3>
        <p className="text-sm text-gray-600">
          Select an office location and year to manage inventory and view analytics.
        </p>
      </div>

      {renderContent()}
    </div>
  );
};
