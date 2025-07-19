import React from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from './common/LoadingSpinner';
import { useRecentProjects } from '../hooks/useRecentProjects';


export const RecentProjectsTable: React.FC = () => {
  const { data: projects = [], isLoading, error } = useRecentProjects();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">데이터를 불러오지 못했습니다.</p>;
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">사이드프로젝트 글 목록</h2>
        <Link to="/projects" className="text-sm text-indigo-600 hover:underline">더보기</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="pb-2">제목</th>
              <th className="pb-2">작성자 ID</th>
              <th className="pb-2">등록일</th>
              <th className="pb-2">상태</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 min-h-[280px]">
            {projects.length > 0 ? (
              projects.map((project) => (
                <tr key={project.projectId} className="border-b hover:bg-gray-50">
                  <td className="py-3 font-medium text-gray-800">
                    <Link to={`/projects/${project.projectId}`} className="hover:underline text-indigo-600">
                      {project.projectTitle}
                    </Link>
                  </td>
                  <td className="py-3 text-sm text-gray-600">{project.projectId}</td>
                  <td className="py-3 text-sm text-gray-600">{new Date(project.projectCreatedAt).toLocaleDateString()}</td>
                  <td className="py-3 text-sm text-gray-600">{project.projectStatus}</td>
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
