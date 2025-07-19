import { useDataFetching } from './useDataFetching';
import type { Project } from '../types/responseTypes';

export const useRecentProjects = () => {
  return useDataFetching<Project>({
    endpoint: '/api/v1/project?limit=5',
    searchFields: ['projectTitle', 'projectId'],
    queryKey: 'recent-projects',
  });
};
