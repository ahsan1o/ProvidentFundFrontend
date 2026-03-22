import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../client';

export const useTotalLiability = () =>
  useQuery({
    queryKey: ['reports', 'liability'],
    queryFn: async () => {
      const response = await apiClient.get('/reports/total-liability');
      return response.data.data;
    },
  });

export const useMonthlyContributionReport = (period: string) =>
  useQuery({
    queryKey: ['reports', 'monthly-contributions', period],
    queryFn: async () => {
      const response = await apiClient.get('/reports/monthly-contributions', {
        params: { period },
      });
      return response.data.data;
    },
    enabled: Boolean(period),
  });
