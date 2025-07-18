import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetcher } from '../utils/apiClient';
import type { StudyGroup } from '../types/responseTypes';

export const useRecentStudies = () => {
  return useQuery<StudyGroup[]>({
    queryKey: ['recent-studies'],
    queryFn: () => fetcher('/api/v1/study-group'),
    refetchInterval: 300000,
    staleTime: 300000,
    placeholderData: keepPreviousData,
  });
};
