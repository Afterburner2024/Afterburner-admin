import { useDataFetching } from './useDataFetching';
import type { Member } from '../types/responseTypes';

export const useRecentMembers = () => {
  return useDataFetching<Member>({
    endpoint: '/api/v1/users?limit=5',
    searchFields: ['userName', 'userEmail'],
    queryKey: 'recent-members',
  });
};
