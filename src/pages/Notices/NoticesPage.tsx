import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNotices } from '../../utils/apiClient';
import { useSearchAndSort } from '../../hooks/useSearchAndSort';
import { usePagination } from '../../hooks/usePagination';
import Pagination from '../../components/common/Pagination';
import SearchInput from '../../components/common/SearchInput';
import SortDropdown from '../../components/common/SortDropdown';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import type { Notice } from '../../types/responseTypes';

const sortOptions = [
  { value: 'noticeTitle-asc', label: '제목 (오름차순)' },
  { value: 'noticeTitle-desc', label: '제목 (내림차순)' },
  { value: 'noticeCreatedAt-asc', label: '작성일 (오래된 순)' },
  { value: 'noticeCreatedAt-desc', label: '작성일 (최신 순)' },
];

const NoticesPage: React.FC = () => {
  const navigate = useNavigate();

  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setIsLoading(true);
        const data = await getNotices();
        setNotices(data);
      } catch (e) {
        console.error('Error fetching notices:', e);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const {
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    filteredAndSortedData,
  } = useSearchAndSort<Notice>({
    initialData: notices,
    searchFields: ['noticeTitle', 'noticeContent'],
  });

  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
  } = usePagination(filteredAndSortedData, 10);

  const handleRegisterClick = () => {
    navigate("/notices/create");
  };

  const handleNoticeClick = (id: number) => {
    navigate(`/notices/${id}`);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">공지사항 관리</h2>
      <div className="flex justify-between mb-4">
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="공지사항 검색..."
        />
        <div className="flex gap-2">
          <SortDropdown
            sortOption={sortOption}
            setSortOption={setSortOption}
            options={sortOptions}
          />
          <button
            onClick={handleRegisterClick}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            공지 작성
          </button>
        </div>
      </div>
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">공지번호</th>
              <th className="py-3 px-6 text-left">제목</th>
              <th className="py-3 px-6 text-left">작성일</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {paginatedData.length > 0 ? (
              paginatedData.map((notice) => (
                <tr
                  key={notice.noticeId}
                  className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleNoticeClick(notice.noticeId)}
                >
                  <td className="py-3 px-6 text-left">{notice.noticeId}</td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">{notice.noticeTitle}</td>
                  <td className="py-3 px-6 text-left">{new Date(notice.noticeCreatedAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-6 text-center">
                  공지사항이 없습니다.
                </td>
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

export default NoticesPage;

