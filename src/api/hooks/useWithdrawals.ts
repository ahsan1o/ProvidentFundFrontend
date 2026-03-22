import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';

export const usePendingWithdrawals = () =>
  useQuery({
    queryKey: ['withdrawals', 'pending'],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.WITHDRAWALS);
      return response.data.data;
    },
  });

export const useCreateWithdrawal = () =>
  useMutation({
    mutationFn: async (payload: { accountId: string; amount: string; notes?: string }) => {
      const response = await apiClient.post(API_ENDPOINTS.WITHDRAWALS, payload);
      return response.data.data;
    },
  });
