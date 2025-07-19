import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetcher } from '../utils/apiClient';
import { useSearchAndSort } from './useSearchAndSort';
import type { Member, Notice, Project, Question, StudyGroup } from '../types/responseTypes';

type DataType = Member | Notice | Project | Question | StudyGroup;

interface UseDataFetchingProps<T extends DataType> {
  endpoint: string;
  searchFields: (keyof T)[];
  queryKey: string;
}

export const useDataFetching = <T extends DataType>({ endpoint, searchFields, queryKey }: UseDataFetchingProps<T>) => {
  const { data, isLoading, error } = useQuery<T[]>({ 
    queryKey: [queryKey],
    queryFn: () => fetcher(endpoint),
    staleTime: 300000, // 5분
    refetchInterval: 300000, // 5분
    placeholderData: keepPreviousData,
  });

  const initialData = data ?? [];

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
