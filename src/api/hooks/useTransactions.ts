import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../client';

export const useAccountTransactions = (accountId: string) =>
  useQuery({
    queryKey: ['transactions', accountId],
    queryFn: async () => {
      const response = await apiClient.get(`/transactions/${accountId}`);
      return response.data.data;
    },
    enabled: Boolean(accountId),
  });

export const useAccountBalance = (accountId: string) =>
  useQuery({
    queryKey: ['transactions', accountId, 'balance'],
    queryFn: async () => {
      const response = await apiClient.get(`/transactions/${accountId}/balance`);
      return response.data.data;
    },
    enabled: Boolean(accountId),
  });
