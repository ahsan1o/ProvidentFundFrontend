import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';

export const useRunContributions = () =>
  useMutation({
    mutationFn: async (period: string) => {
      const response = await apiClient.post(API_ENDPOINTS.CONTRIBUTIONS_RUN, {
        period,
      });
      return response.data;
    },
  });
