import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';

export const useLoansByAccount = (accountId: string) =>
  useQuery({
    queryKey: ['loans', accountId],
    queryFn: async () => {
      const response = await apiClient.get(`${API_ENDPOINTS.LOANS}/${accountId}`);
      return response.data.data;
    },
    enabled: Boolean(accountId),
  });

export const useCreateLoan = () =>
  useMutation({
    mutationFn: async (payload: {
      accountId: string;
      amount: string;
      tenureMonths: number;
    }) => {
      const response = await apiClient.post(API_ENDPOINTS.LOANS, payload);
      return response.data.data;
    },
  });
