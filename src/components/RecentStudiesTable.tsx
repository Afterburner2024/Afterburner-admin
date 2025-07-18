import React from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from './common/LoadingSpinner';
import { useRecentStudies } from '../hooks/useRecentStudies';


export const RecentStudiesTable: React.FC = () => {
  const { data: studies = [], isLoading, error } = useRecentStudies();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">데이터를 불러오지 못했습니다.</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">스터디그룹 글 목록</h2>
        <Link to="/studies" className="text-sm text-indigo-600 hover:underline">더보기</Link>
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
          <tbody>
            {studies.map((study) => (
              <tr key={study.studyGroupId} className="border-b hover:bg-gray-50">
                <td className="py-3 font-medium text-gray-800">
                  <Link to={`/studies/${study.studyGroupId}`} className="hover:underline text-indigo-600">
                    {study.studyGroupTitle}
                  </Link>
                </td>
                <td className="py-3 text-sm text-gray-600">{study.studyGroupUserId}</td>
                <td className="py-3 text-sm text-gray-600">{new Date(study.studyGroupCreatedAt).toLocaleDateString()}</td>
                <td className="py-3 text-sm text-gray-600">{study.studyGroupStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
