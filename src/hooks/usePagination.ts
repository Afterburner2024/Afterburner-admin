import { useState, useMemo, useEffect } from 'react';

export const usePagination = <T,>(data: T[], itemsPerPage: number = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => Math.ceil(data.length / itemsPerPage), [data.length, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [data, itemsPerPage]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const goToPage = (page: number) => {
    const pageNumber = Math.min(Math.max(page, 1), totalPages || 1);
    setCurrentPage(pageNumber);
  };

  return { currentPage, totalPages, paginatedData, goToPage };
};
