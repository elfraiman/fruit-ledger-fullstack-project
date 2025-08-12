import { useQuery } from '@tanstack/react-query';
import { queryConfig } from '../utils/queryUtils';
import axios from 'axios';
import { ILocation } from '@lepaya/shared';
import toast from 'react-hot-toast';

const fetchLocations = async (): Promise<{ data: ILocation[] }> => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/locations`);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || "Error fetching locations";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const useLocations = () => {
  return useQuery<{ data: ILocation[] }, Error>({
    queryKey: ['locations'],
    queryFn: fetchLocations,
    retry: false,
    ...queryConfig,
  });
};

export default useLocations;