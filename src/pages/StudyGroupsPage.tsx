import React from 'react';
import { Link } from 'react-router-dom';
import { useDataFetching } from '../hooks/useDataFetching';
import SearchInput from '../components/common/SearchInput';
import SortDropdown from '../components/common/SortDropdown';
import { mockStudyGroups } from '../utils/mockData';
import LoadingSpinner from '../components/common/LoadingSpinner';

// 정렬 옵션
const sortOptions = [
  { value: 'title-asc', label: '제목 (오름차순)' },
  { value: 'title-desc', label: '제목 (내림차순)' },
  { value: 'createdAt-asc', label: '작성일 (오래된 순)' },
  { value: 'createdAt-desc', label: '작성일 (최신 순)' },
];

const StudyGroupsPage: React.FC = () => {
  const { 
    data: filteredAndSortedData, 
    isLoading, 
    error, 
    searchQuery, 
    setSearchQuery, 
    sortOption, 
    setSortOption 
  } = useDataFetching<StudyGroup>({
    queryKey: ['studyGroups'],
    endpoint: '/api/v1/study-group',
    searchFields: ['title', 'content'],
    mockData: mockStudyGroups,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;
  if (!filteredAndSortedData || filteredAndSortedData.length === 0) return <div>스터디 그룹이 없습니다.</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">스터디 그룹 관리</h2>
      <div className="flex justify-between mb-4">
        <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="스터디 그룹 검색..." />
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
            {filteredAndSortedData.map((studyGroup) => (
              <tr key={studyGroup.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{studyGroup.id}</td>
                <td className="py-3 px-6 text-left">{studyGroup.title}</td>
                <td className="py-3 px-6 text-left">{new Date(studyGroup.createdAt).toLocaleDateString()}</td>
                <td className="py-3 px-6 text-center">
                  <Link to={`/studies/${studyGroup.id}`} className="text-blue-500 hover:underline">상세보기</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudyGroupsPage;
