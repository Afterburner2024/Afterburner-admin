import { useDataFetching } from './useDataFetching';
import type { StudyGroup } from '../types/responseTypes';

export const useRecentStudies = () => {
  return useDataFetching<StudyGroup>({
    endpoint: '/api/v1/study-group?limit=5',
    searchFields: ['studyGroupTitle', 'studyGroupUserId'],
    queryKey: 'recent-studies',
  });
};
