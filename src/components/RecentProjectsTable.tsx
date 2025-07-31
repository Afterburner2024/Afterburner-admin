import React from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from './common/LoadingSpinner';
import { useRecentProjects } from '../hooks/useRecentProjects';

export const RecentProjectsTable: React.FC = () => {
  const { data: projects = [], isLoading, error } = useRecentProjects();

  const displayedProjects = [...projects]
    .sort(
      (a, b) =>
        new Date(b.projectCreatedAt).getTime() -
        new Date(a.projectCreatedAt).getTime(),
    )
    .slice(0, 5);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">데이터를 불러오지 못했습니다.</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">사이드프로젝트 글 목록</h2>
        <Link to="/projects" className="text-sm text-indigo-600 hover:underline">
          더보기
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">등록일</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 min-h-[280px]">
            {displayedProjects.length > 0 ? (
              displayedProjects.map((project) => (
                <tr
                  key={project.projectId}
                  className="hover:bg-indigo-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/projects/${project.projectId}`} className="font-medium text-indigo-600 hover:underline">
                      {project.projectTitle}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{project.projectUserId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(project.projectCreatedAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{project.projectStatus}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-10 text-gray-500">
                  최신 프로젝트가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
