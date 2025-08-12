import { useQuery } from '@tanstack/react-query';
import { queryConfig } from '../utils/queryUtils';
import axios from 'axios';
import { IConsumptionReport } from '@lepaya/shared';
import toast from 'react-hot-toast';

const fetchConsumptionReport = async (locationId: number, year: number): Promise<{ data: IConsumptionReport }> => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/reports/consumption/${locationId}/${year}`);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response.data.error || "Error fetching consumption report";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const useConsumptionReport = (locationId: number, year: number) => {
  return useQuery<{ data: IConsumptionReport }, Error>({
    queryKey: ['consumptionReport', locationId, year],
    queryFn: () => fetchConsumptionReport(locationId, year),
    enabled: locationId > 0 && year > 0,
    ...queryConfig
  });
};
