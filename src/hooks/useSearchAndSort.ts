import { useState, useMemo } from 'react';

// 검색 및 정렬 옵션 인터페이스
interface SearchAndSortOptions<T> {
  initialData: T[];
  searchFields: (keyof T)[];
}

// 검색 및 정렬을 위한 커스텀 훅
export const useSearchAndSort = <T extends object>({ initialData, searchFields }: SearchAndSortOptions<T>) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');

  const filteredAndSortedData = useMemo(() => {
    let data = [...initialData];

    // 검색 로직
    if (searchQuery) {
      data = data.filter((item) =>
        searchFields.some((field) =>
          String(item[field]).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // 정렬 로직
    if (sortOption) {
      const [field, order] = sortOption.split('-');
      data.sort((a, b) => {
        const valueA = a[field as keyof T];
        const valueB = b[field as keyof T];

        if (valueA < valueB) {
          return order === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
          return order === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return data;
  }, [initialData, searchQuery, sortOption, searchFields]);

  return {
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    filteredAndSortedData,
  };
};
