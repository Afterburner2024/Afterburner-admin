import React from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from './common/LoadingSpinner';
import { useRecentMembers } from '../hooks/useRecentMembers';

export const RecentMembersTable: React.FC = () => {
  const { data: members = [], isLoading, error } = useRecentMembers();

  const displayedMembers = [...members]
    .sort(
      (a, b) =>
        new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime(),
    )
    .slice(0, 5);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">데이터를 불러오지 못했습니다.</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">최신 회원 목록</h2>
        <Link to="/members" className="text-sm text-indigo-600 hover:underline">
          더보기
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이메일</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">가입일</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 min-h-[280px]">
            {displayedMembers.length > 0 ? (
              displayedMembers.map((m) => (
                <tr
                  key={m.userId}
                  className="hover:bg-indigo-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/members/${m.userId}`} className="font-medium text-indigo-600 hover:underline">
                      {m.userName}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{m.userEmail}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(m.registeredAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-10 text-gray-500">
                  최신 회원이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
