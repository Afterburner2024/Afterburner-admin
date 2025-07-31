
import { useQuery } from '@tanstack/react-query';
import api from '../utils/apiClient';
import type { StudyGroupMember } from '../types/responseTypes';

const fetchStudyGroupMembers = async (studyGroupId: string): Promise<StudyGroupMember[]> => {
  const { data } = await api.get(`/api/v1/study-group/${studyGroupId}/member`);
  return data.result;
};

export const useStudyGroupMembers = (studyGroupId: string) => {
  return useQuery<StudyGroupMember[], Error>({
    queryKey: ['studyGroupMembers', studyGroupId],
    queryFn: () => fetchStudyGroupMembers(studyGroupId),
    enabled: !!studyGroupId,
  });
};

