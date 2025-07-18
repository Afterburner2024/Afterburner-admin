import React from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from './common/LoadingSpinner';
import { useRecentNotices } from '../hooks/useRecentNotices';

export const NoticesList: React.FC = () => {
  const { data: notices = [], isLoading, error } = useRecentNotices();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">데이터를 불러오지 못했습니다.</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">공지사항</h2>
        <Link to="/notices" className="text-sm text-indigo-600 hover:underline">더보기</Link>
      </div>
      <ul className="space-y-3">
        {notices.map((notice) => (
          <li
            key={notice.noticeId}
            className="p-3 transition-colors border-l-4 rounded-r-md hover:bg-gray-50"
            style={{ borderLeftColor: notice.noticeStatus === 'IMPORTANT' ? '#4f46e5' : '#e5e7eb' }}
          >
            <Link to={`/notices/${notice.noticeId}`} className="block">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {notice.noticeStatus === 'IMPORTANT' && (
                    <span className="inline-block w-2 h-2 mr-2 bg-red-500 rounded-full"></span>
                  )}
                  <span className="font-medium text-gray-700">{notice.noticeTitle}</span>
                </div>
                <span className="text-sm text-gray-500">{new Date(notice.noticeCreatedAt).toLocaleDateString()}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
