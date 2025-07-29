import { useQuery } from '@tanstack/react-query';
import { getProjectTeamMembers } from '../utils/apiClient';
import type { ProjectTeam } from '../types/responseTypes';

export const useProjectTeamMembers = (projectId: string | undefined) => {
  return useQuery<ProjectTeam[]>({
    queryKey: ['project-team-members', projectId],
    queryFn: () => getProjectTeamMembers(projectId as string),
    enabled: !!projectId,
    staleTime: 300000,
  });
};
