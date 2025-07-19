import { useDataFetching } from './useDataFetching';
import type { Notice } from '../types/responseTypes';

export const useRecentNotices = () => {
  return useDataFetching<Notice>({
    endpoint: '/api/v1/notice?limit=5',
    searchFields: ['noticeTitle'],
    queryKey: 'recent-notices',
  });
};
