import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../utils/api';
import { useSearchAndSort } from './useSearchAndSort';
import type { Member, Notice, Project, Question, StudyGroup } from '../types/api';

type DataType = Member | Notice | Project | Question | StudyGroup;

interface UseDataFetchingProps<T extends DataType> {
  queryKey: string[];
  endpoint: string;
  searchFields: (keyof T)[];
  mockData: T[];
}

export const useDataFetching = <T extends DataType>({ queryKey, endpoint, searchFields, mockData }: UseDataFetchingProps<T>) => {
  const { data, isLoading, error } = useQuery<T[], Error>({
    queryKey,
    queryFn: () => fetcher(endpoint),
    refetchInterval: 5 * 60 * 1000, // 5분
  });

  const initialData = error ? mockData : (data || []);

  const {
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    filteredAndSortedData,
  } = useSearchAndSort<T>({
    initialData,
    searchFields,
  });

  return {
    data: filteredAndSortedData,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
  };
};
