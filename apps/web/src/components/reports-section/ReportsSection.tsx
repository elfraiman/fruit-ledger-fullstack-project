import { Filter } from 'lucide-react';
import { JSX } from 'preact';
import { useMemo } from 'preact/hooks';
import { useConsumptionReport } from '../../hooks/useReports';
import { Card } from '../generic/Card';
import { EmptyState } from '../generic/EmptyState';
import { StatusMessage } from '../generic/StatusMessage';
import { ConsumptionOverview } from './ConsumptionOverview';
import { MostPopularFruit } from './MostPopularFruit';

interface IReportsSectionProps {
  selectedOffice: string;
  selectedYear: string;
}

export function ReportsSection({
  selectedOffice,
  selectedYear,
}: IReportsSectionProps): JSX.Element {

  // Memoize the ledger params
  //
  const ledgerParams = useMemo(
    () => ({
      locationId: selectedOffice ? parseInt(selectedOffice) : undefined,
      year: selectedYear ? parseInt(selectedYear) : undefined
    }),
    [selectedOffice, selectedYear]
  );

  const { data: consumptionReport, isLoading: isConsumptionLoading, error: consumptionError } = useConsumptionReport(
    ledgerParams.locationId || 0,
    ledgerParams.year || 0
  );

  const validParams = ledgerParams.locationId && ledgerParams.year;

  const renderConsumptionReport = () => {
    if (consumptionError) {
      return <StatusMessage type="error" title="Error" message={consumptionError.message} />
    } else if (validParams) {
      return <div className="space-y-4">
        <ConsumptionOverview
          data={consumptionReport?.data.total_consumption}
          isLoading={isConsumptionLoading}
        />
        <MostPopularFruit
          data={consumptionReport?.data.most_consumed_fruit}
          isLoading={isConsumptionLoading}
        />
      </div>
    }
    return null;
  }


  return (
    <div className="space-y-6 md:w-3xl mx-auto">
      {renderConsumptionReport()}
      {!validParams && (
        <Card>
          <EmptyState
            icon={<Filter className="w-16 h-16" />}
            title="Select Filters to Generate Report"
            description="Choose an office location and year from the filters above to view detailed consumption analytics."
          />
        </Card>
      )}
    </div>
  );
}