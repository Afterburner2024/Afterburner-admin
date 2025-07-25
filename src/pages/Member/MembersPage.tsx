import React from 'react';
import { Link } from 'react-router-dom';
import { useDataFetching } from '../../hooks/useDataFetching';
import { usePagination } from '../../hooks/usePagination';
import SearchInput from '../../components/common/SearchInput';
import SortDropdown from '../../components/common/SortDropdown';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Pagination from '../../components/common/Pagination';
import type { Member } from '../../types/responseTypes';

// 정렬 옵션
const sortOptions = [
  { value: 'name-asc', label: '이름 (오름차순)' },
  { value: 'name-desc', label: '이름 (내림차순)' },
  { value: 'signupDate-asc', label: '가입일 (오래된 순)' },
  { value: 'signupDate-desc', label: '가입일 (최신 순)' },
];

const MembersPage: React.FC = () => {
  const { 
    data: filteredAndSortedData, 
    isLoading, 
    error, 
    searchQuery, 
    setSearchQuery, 
    sortOption, 
    setSortOption 
  } = useDataFetching<Member>({
    endpoint: '/api/v1/users',
    searchFields: ['userName', 'userEmail'],
    queryKey: 'members',
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
      <h2 className="text-xl font-semibold mb-4">회원 관리</h2>
      <div className="flex justify-between mb-4">
        <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="회원 검색..." />
        <SortDropdown sortOption={sortOption} setSortOption={setSortOption} options={sortOptions} />
      </div>
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">이름</th>
              <th className="py-3 px-6 text-left">이메일</th>
              <th className="py-3 px-6 text-left">가입일</th>
              <th className="py-3 px-6 text-center">활동</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">

            {paginatedData.length > 0 ? (
              paginatedData.map((member) => (
                <tr key={member.userId} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{member.userId}</td>
                  <td className="py-3 px-6 text-left">{member.userName}</td>
                  <td className="py-3 px-6 text-left">{member.userEmail}</td>
                  <td className="py-3 px-6 text-left">{new Date(member.registeredAt).toLocaleDateString()}</td>
                  <td className="py-3 px-6 text-center">
                    <Link to={`/members/${member.userId}`} className="text-blue-500 hover:underline">상세보기</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-6 text-center">회원이 없습니다.</td>
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

export default MembersPage;
