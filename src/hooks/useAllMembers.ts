import { useDataFetching } from './useDataFetching';
import type { Member } from '../types/responseTypes';

export const useAllMembers = () => {
  return useDataFetching<Member>({
    endpoint: '/api/v1/users',
    searchFields: ['userName', 'userEmail'],
    queryKey: 'all-members',
  });
};
