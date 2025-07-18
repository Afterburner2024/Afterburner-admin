import React from 'react';
import { Link } from 'react-router-dom';
import { useDataFetching } from '../../hooks/useDataFetching';
import { usePagination } from '../../hooks/usePagination';
import SearchInput from '../../components/common/SearchInput';
import SortDropdown from '../../components/common/SortDropdown';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Pagination from '../../components/common/Pagination';

// 정렬 옵션
const sortOptions = [
  { value: 'title-asc', label: '제목 (오름차순)' },
  { value: 'title-desc', label: '제목 (내림차순)' },
  { value: 'createdAt-asc', label: '작성일 (오래된 순)' },
  { value: 'createdAt-desc', label: '작성일 (최신 순)' },
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
  });

  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
  } = usePagination(filteredAndSortedData, 10);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">질문 관리</h2>
      <div className="flex justify-between mb-4">
        <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="질문 검색..." />
        <SortDropdown sortOption={sortOption} setSortOption={setSortOption} options={sortOptions} />
      </div>
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">제목</th>
              <th className="py-3 px-6 text-left">작성일</th>
              <th className="py-3 px-6 text-center">활동</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {paginatedData.length > 0 ? (
              paginatedData.map((question) => (
                <tr key={question.qnaId} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{question.qnaId}</td>
                  <td className="py-3 px-6 text-left">{question.qnaTitle}</td>
                  <td className="py-3 px-6 text-left">{new Date(question.qnaCreatedAt).toLocaleDateString()}</td>
                  <td className="py-3 px-6 text-center">
                    <Link to={`/questions/${question.qnaId}`} className="text-blue-500 hover:underline">상세보기</Link>
                  </td>
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
  );
};

export default QuestionsPage;
