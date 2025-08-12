import { IPurchaseRequestWithCalories } from '@lepaya/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const purchaseFruit = async (data: IPurchaseRequestWithCalories) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/ledger/purchase`, data);

    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || "Error purchasing fruit";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const usePurchaseFruit = () => {
  const queryClient = useQueryClient();

  return useMutation<{ data: IPurchaseRequestWithCalories }, Error, IPurchaseRequestWithCalories>({
    mutationFn: purchaseFruit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
      queryClient.invalidateQueries({ queryKey: ['ledger'] });
    },
    onError: (error) => {
      console.error('Purchase failed:', error);
    },
  });
};

export default usePurchaseFruit;
