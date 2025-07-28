import React from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from './common/LoadingSpinner';
import { useRecentNotices } from '../hooks/useRecentNotices';

export const NoticesList: React.FC = () => {
  const { data: notices = [], isLoading, error } = useRecentNotices();

  // 작성일 기준 정렬 후 상위 5개만 표시
  const displayedNotices = [...notices]
    .sort(
      (a, b) =>
        new Date(b.noticeCreatedAt).getTime() -
        new Date(a.noticeCreatedAt).getTime()
    )
    .slice(0, 5);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">데이터를 불러오지 못했습니다.</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">공지사항</h2>
        <Link to="/notices" className="text-sm text-indigo-600 hover:underline">더보기</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성일</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 min-h-[280px]">
            {displayedNotices.length > 0 ? (
              displayedNotices.map((notice) => (
                <tr
                  key={notice.noticeId}
                  className="hover:bg-indigo-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/notices/${notice.noticeId}`} className="flex items-center">
                      {notice.noticeStatus === 'IMPORTANT' && (
                        <span className="inline-block w-2 h-2 mr-2 bg-red-500 rounded-full"></span>
                      )}
                      <span className="font-medium text-gray-700">{notice.noticeTitle}</span>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(notice.noticeCreatedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center py-10 text-gray-500">
                  공지사항이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
