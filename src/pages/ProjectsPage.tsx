import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../utils/api';
import { useSearchAndSort } from '../hooks/useSearchAndSort';
import SearchInput from '../components/common/SearchInput';
import SortDropdown from '../components/common/SortDropdown';
import type { Project } from '../types/api';

// 정렬 옵션
const sortOptions = [
  { value: 'title-asc', label: '제목 (오름차순)' },
  { value: 'title-desc', label: '제목 (내림차순)' },
  { value: 'createdAt-asc', label: '작성일 (오래된 순)' },
  { value: 'createdAt-desc', label: '작성일 (최신 순)' },
];

const ProjectsPage: React.FC = () => {
  const { data: projects, isLoading, error } = useQuery<Project[], Error>({
    queryKey: ['projects'],
    queryFn: () => fetcher('/api/v1/project'),
    refetchInterval: 5 * 60 * 1000, // 5분
  });

  // 검색 및 정렬 훅 사용
  const { 
    searchQuery, 
    setSearchQuery, 
    sortOption, 
    setSortOption, 
    filteredAndSortedData 
  } = useSearchAndSort<Project>({ 
    initialData: projects || [], 
    searchFields: ['title', 'content'] 
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;
  if (!filteredAndSortedData || filteredAndSortedData.length === 0) return <div>프로젝트가 없습니다.</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">프로젝트 관리</h2>
      <div className="flex justify-between mb-4">
        <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="프로젝트 검색..." />
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
            {filteredAndSortedData.map((project) => (
              <tr key={project.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{project.id}</td>
                <td className="py-3 px-6 text-left">{project.title}</td>
                <td className="py-3 px-6 text-left">{new Date(project.createdAt).toLocaleDateString()}</td>
                <td className="py-3 px-6 text-center">
                  <Link to={`/projects/${project.id}`} className="text-blue-500 hover:underline">상세보기</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsPage;

