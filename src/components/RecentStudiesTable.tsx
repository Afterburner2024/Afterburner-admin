import React from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from './common/LoadingSpinner';
import { useRecentStudies } from '../hooks/useRecentStudies';

export const RecentStudiesTable: React.FC = () => {
  const { data: studies = [], isLoading, error } = useRecentStudies();

  const displayedStudies = [...studies]
    .sort(
      (a, b) =>
        new Date(b.studyGroupCreatedAt).getTime() -
        new Date(a.studyGroupCreatedAt).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">스터디그룹 글 목록</h2>
        <Link to="/studies" className="text-sm text-indigo-600 hover:underline">
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
            {isLoading ? (
              <tr>
                <td colSpan={4} className="text-center py-10">
                  <LoadingSpinner />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="text-center py-10 text-red-500">
                  데이터를 불러오지 못했습니다.
                </td>
              </tr>
            ) : displayedStudies.length > 0 ? (
              displayedStudies.map((study) => (
                <tr
                  key={study.studyGroupId}
                  className="hover:bg-indigo-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/studies/${study.studyGroupId}`} className="font-medium text-indigo-600 hover:underline">
                      {study.studyGroupTitle}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{study.studyGroupUserId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(study.studyGroupCreatedAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{study.studyGroupStatus}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-10 text-gray-500">
                  최신 스터디가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
