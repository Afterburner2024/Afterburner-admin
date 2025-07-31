import React from 'react';
import { Link } from 'react-router-dom';
import { useDataFetching } from '../../hooks/useDataFetching';
import { usePagination } from '../../hooks/usePagination';
import SearchInput from '../../components/common/SearchInput';
import SortDropdown from '../../components/common/SortDropdown';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Pagination from '../../components/common/Pagination';
import type { Question } from '../../types/responseTypes';

// 정렬 옵션
const sortOptions = [
  { value: 'qnaTitle-asc', label: '제목 (오름차순)' },
  { value: 'qnaTitle-desc', label: '제목 (내림차순)' },
  { value: 'qnaCreatedAt-asc', label: '작성일 (오래된 순)' },
  { value: 'qnaCreatedAt-desc', label: '작성일 (최신 순)' },
];

const QuestionsPage: React.FC = () => {
  const { 
    data: filteredAndSortedData, 
    isLoading, 
    error, 
    searchQuery, 
    setSearchQuery, 
    sortOption, 
    setSortOption 
  } = useDataFetching<Question>({
    endpoint: '/api/v1/qna',
    searchFields: ['qnaTitle', 'qnaContent'],
    queryKey: 'questions',
  });

  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
  } = usePagination(filteredAndSortedData, 5);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">질문 관리</h2>
        </div>
        <div className="my-2 flex sm:flex-row flex-col justify-between">
          <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="질문 검색..." />
          <SortDropdown sortOption={sortOption} setSortOption={setSortOption} options={sortOptions} />
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">제목</th>
              <th className="py-3 px-6 text-left">작성일</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {paginatedData.length > 0 ? (
              paginatedData.map((question) => (
                <tr key={question.qnaId} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{question.qnaId}</td>
                  <td className="py-3 px-6 text-left">
                    <Link to={`/questions/${question.qnaId}`} className="text-violet-600 font-semibold hover:underline">
                    {question.qnaTitle}
                    </Link>
                    </td>
                  <td className="py-3 px-6 text-left">{new Date(question.qnaCreatedAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-6 text-center">질문이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
            {error && (
              <p className="mt-2 text-sm text-red-500">데이터를 불러오는 데 실패했습니다.</p>
            )}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage;
