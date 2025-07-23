import React from 'react';
import { Link } from 'react-router-dom';
import { useDataFetching } from '../hooks/useDataFetching';
import SearchInput from '../components/common/SearchInput';
import SortDropdown from '../components/common/SortDropdown';
import LoadingSpinner from '../components/common/LoadingSpinner';
import type { Member } from '../types/responseTypes';

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
    queryKey: 'members',
    endpoint: '/api/users',
    searchFields: ['userName', 'userEmail'],
    });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;
  if (!filteredAndSortedData || filteredAndSortedData.length === 0) return <div>회원이 없습니다.</div>;

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
            {filteredAndSortedData.map((member) => (
              <tr key={member.userId} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{member.userId}</td>
                <td className="py-3 px-6 text-left">{member.userName}</td>
                <td className="py-3 px-6 text-left">{member.userEmail}</td>
                <td className="py-3 px-6 text-left">{new Date(member.registeredAt).toLocaleDateString()}</td>
                <td className="py-3 px-6 text-center">
                  <Link to={`/members/${member.userId}`} className="text-blue-500 hover:underline">상세보기</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembersPage;
