import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';

export const useAccounts = () =>
  useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.PF_ACCOUNTS);
      return response.data.data;
    },
  });
