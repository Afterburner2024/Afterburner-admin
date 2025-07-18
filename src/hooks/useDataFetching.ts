import { useEffect, useState } from 'react';
import api from '../utils/apiClient';
import { useSearchAndSort } from './useSearchAndSort';
import type { Member, Notice, Project, Question, StudyGroup } from '../types/responseTypes';

type DataType = Member | Notice | Project | Question | StudyGroup;

interface UseDataFetchingProps<T extends DataType> {
  endpoint: string;
  searchFields: (keyof T)[];
}

export const useDataFetching = <T extends DataType>({ endpoint, searchFields }: UseDataFetchingProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    api
      .get(endpoint)
      .then((res) => setData(res.data.result ?? res.data))
      .catch((err) => {
        setError(err);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  const initialData = data;

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
