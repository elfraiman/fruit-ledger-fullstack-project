import { ITotalConsumptionByLocation } from '@lepaya/shared';
import { Apple, BarChart3, Building2, TrendingUp, Users } from 'lucide-react';
import { JSX } from 'preact';
import { Card } from '../generic/Card';
import { SectionHeader } from '../generic/SectionHeader';
import { EmptyState } from '../generic/EmptyState';
import { CherrySpinner } from '../generic/CherrySpinner';

interface IConsumptionOverviewProps {
  data: ITotalConsumptionByLocation | null | undefined;
  isLoading?: boolean;
}

// Const with styles to not repeat the same code
//
const statsIconStyle = 'w-8 h-8 mx-auto text-primary';

export function ConsumptionOverview({ data, isLoading }: IConsumptionOverviewProps): JSX.Element {
  if (isLoading) {
    return (
      <Card>
        <SectionHeader
          title="Consumption Overview"
          icon={<BarChart3 className="w-5 h-5" />}
        />
        <div className="p-6">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="text-center bg-gray-100 rounded-tl-xl rounded-br-xl rounded-tr-xl p-6">
                  <CherrySpinner size={8} />
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                </div>
              ))}
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
          title="Consumption Overview"
          icon={<BarChart3 className="w-5 h-5" />}
        />
        <EmptyState
          icon={<BarChart3 className="w-16 h-16" />}
          title="No Consumption Data"
          description="No consumption data available for the selected location and time period."
        />
      </Card>
    );
  }

  const stats = [
    {
      label: 'Office',
      value: data.location_name,
      icon: <Building2 className={statsIconStyle} />,
    },
    {
      label: 'Total Fruit Eaten',
      value: data.total_fruit_consumed ? data.total_fruit_consumed : '0',
      icon: <Apple className={statsIconStyle} />,
    },
    {
      label: 'Headcount',
      value: String(data?.headcount),
      icon: <Users className={statsIconStyle} />,
    },
    {
      label: 'Average Per Person',
      value: data?.average_per_person ? data.average_per_person.toFixed(3) : '0.000',
      icon: <TrendingUp className={statsIconStyle} />,
    }
  ];

  return (
    <Card>
      <SectionHeader
        title="Consumption Overview"
        icon={<BarChart3 className="w-5 h-5" />}
      />

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-gray-50 rounded-tl-xl rounded-br-xl rounded-tr-xl">

              <div className={` p-2 mb-2 bg-secondary/10`}>
                {stat.icon}
              </div>

              <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
