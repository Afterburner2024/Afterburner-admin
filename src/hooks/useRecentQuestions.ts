import { useDataFetching } from './useDataFetching';
import type { Question } from '../types/responseTypes';

export const useRecentQuestions = () => {
  return useDataFetching<Question>({
    endpoint: '/api/v1/qna?limit=5',
    searchFields: ['qnaTitle', 'qnaContent'],
    queryKey: 'recent-questions',
  });
};
