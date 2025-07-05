import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../utils/api';
import { useSearchAndSort } from '../hooks/useSearchAndSort';
import SearchInput from '../components/common/SearchInput';
import SortDropdown from '../components/common/SortDropdown';
import type { Notice } from '../types/api';

// 정렬 옵션
const sortOptions = [
  { value: 'title-asc', label: '제목 (오름차순)' },
  { value: 'title-desc', label: '제목 (내림차순)' },
  { value: 'createdAt-asc', label: '작성일 (오래된 순)' },
  { value: 'createdAt-desc', label: '작성일 (최신 순)' },
];

const NoticesPage: React.FC = () => {
  const { data: notices, isLoading, error } = useQuery<Notice[], Error>({
    queryKey: ['notices'],
    queryFn: () => fetcher('/api/v1/notice'),
    refetchInterval: 5 * 60 * 1000, // 5분
  });

  // 검색 및 정렬 훅 사용
  const { 
    searchQuery, 
    setSearchQuery, 
    sortOption, 
    setSortOption, 
    filteredAndSortedData 
  } = useSearchAndSort<Notice>({ 
    initialData: notices || [], 
    searchFields: ['title', 'content'] 
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;
  if (!filteredAndSortedData || filteredAndSortedData.length === 0) return <div>공지사항이 없습니다.</div>;


  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">공지사항 관리</h2>
      <div className="flex justify-between mb-4">
        <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="공지사항 검색..." />
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
            {filteredAndSortedData.map((notice) => (
              <tr key={notice.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{notice.id}</td>
                <td className="py-3 px-6 text-left">{notice.title}</td>
                <td className="py-3 px-6 text-left">{new Date(notice.createdAt).toLocaleDateString()}</td>
                <td className="py-3 px-6 text-center">
                  <Link to={`/notices/${notice.id}`} className="text-blue-500 hover:underline">상세보기</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NoticesPage;
