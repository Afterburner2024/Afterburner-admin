import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetcher } from '../utils/apiClient';
import type { Project } from '../types/responseTypes';

export const useRecentProjects = () => {
  return useQuery<Project[]>({
    queryKey: ['recent-projects'],
    queryFn: () => fetcher('/api/v1/project'),
    refetchInterval: 300000,
    staleTime: 300000,
    placeholderData: keepPreviousData,
  });
};
