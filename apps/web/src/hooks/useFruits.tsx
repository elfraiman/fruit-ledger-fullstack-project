import { useQuery } from '@tanstack/react-query';
import { queryConfig } from '../utils/queryUtils';
import { IFruitWithCalories } from '@lepaya/shared';
import axios from 'axios';
import toast from 'react-hot-toast';

const fetchFruits = async (): Promise<{ data: IFruitWithCalories[] }> => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/fruits`);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || "Error fetching fruits";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const useFruits = () => {
  return useQuery<{ data: IFruitWithCalories[] }, Error>({
    queryKey: ['fruits'],
    queryFn: fetchFruits,
    ...queryConfig
  });
};

export default useFruits;
