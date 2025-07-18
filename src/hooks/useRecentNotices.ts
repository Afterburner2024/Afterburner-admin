import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetcher } from '../utils/apiClient';
import type { Notice } from '../types/responseTypes';

export const useRecentNotices = () => {
  return useQuery<Notice[]>({
    queryKey: ['recent-notices'],
    queryFn: () => fetcher('/api/v1/notice'),
    refetchInterval: 300000,
    staleTime: 300000,
    placeholderData: keepPreviousData,
  });
};
