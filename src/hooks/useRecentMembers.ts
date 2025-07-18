import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetcher } from '../utils/apiClient';
import type { Member } from '../types/responseTypes';

export const useRecentMembers = () => {
  return useQuery<Member[]>({
    queryKey: ['recent-members'],
    queryFn: () => fetcher('/api/v1/users'),
    refetchInterval: 300000,
    staleTime: 300000,
    placeholderData: keepPreviousData,
  });
};
