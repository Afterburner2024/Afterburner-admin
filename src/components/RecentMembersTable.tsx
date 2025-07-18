import React from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from './common/LoadingSpinner';
import { useRecentMembers } from '../hooks/useRecentMembers';

export const RecentMembersTable: React.FC = () => {
  const { data: members = [], isLoading, error } = useRecentMembers();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">데이터를 불러오지 못했습니다.</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">최신 회원 목록</h2>
        <Link to="/members" className="text-sm text-indigo-600 hover:underline">
          더보기
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="pb-2">이름</th>
              <th className="pb-2">이메일</th>
              <th className="pb-2">가입일</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.userId} className="border-b hover:bg-gray-50">
                <td className="py-3">
                  <Link to={`/members/${m.userId}`} className="hover:underline text-indigo-600">
                    {m.userName}
                  </Link>
                </td>
                <td className="py-3 text-sm text-gray-600">{m.userEmail}</td>
                <td className="py-3 text-sm text-gray-600">{new Date(m.registeredAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
