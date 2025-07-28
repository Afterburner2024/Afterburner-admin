import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDataFetching } from '../../hooks/useDataFetching';
import { usePagination } from '../../hooks/usePagination';
import SearchInput from '../../components/common/SearchInput';
import SortDropdown from '../../components/common/SortDropdown';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Pagination from '../../components/common/Pagination';
import type { Project } from '../../types/responseTypes';

// 정렬 옵션
const sortOptions = [
  { value: "projectTitle-asc", label: "제목 (오름차순)" },
  { value: "projectTitle-desc", label: "제목 (내림차순)" },
  { value: "projectCreatedAt-asc", label: "작성일 (오래된 순)" },
  { value: "projectCreatedAt-desc", label: "작성일 (최신 순)" },
];

const ProjectsPage: React.FC = () => {
  const { 
    data: filteredAndSortedData, 
    isLoading, 
    error, 
    searchQuery, 
    setSearchQuery, 
    sortOption, 
    setSortOption 
  } = useDataFetching<Project>({
    endpoint: '/api/v1/project',
    searchFields: ['projectTitle', 'projectContent'],
    queryKey: 'projects',
  });

  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
  } = usePagination(filteredAndSortedData, 10);

  // 검색어 또는 정렬 옵션이 변경될 때, 페이지를 1로 초기화합니다.
  useEffect(() => {
    goToPage(1);
  }, [searchQuery, sortOption, goToPage]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">프로젝트 관리</h2>
        </div>
        <div className="my-2 flex sm:flex-row flex-col justify-between">
          <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="프로젝트 검색..." />
          <SortDropdown sortOption={sortOption} setSortOption={setSortOption} options={sortOptions} />
        </div>
        <div className="mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
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
              paginatedData.map((project) => (
                <tr key={project.projectId} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{project.projectId}</td>
                  <td className="py-3 px-6 text-left">
                    <Link to={{ pathname: `/projects/${project.projectId}` }} className="text-violet-500 font-bold hover:underline">
                    {project.projectTitle}
                    </Link>
                    </td>
                  <td className="py-3 px-6 text-left">{new Date(project.projectCreatedAt).toLocaleDateString()}</td>
                  <td className='py-3 px-6 text-center'>{project.projectStatus}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-6 text-center">
                  프로젝트가 없습니다.
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
      </div>
    </div>
  );
};

export default ProjectsPage;

