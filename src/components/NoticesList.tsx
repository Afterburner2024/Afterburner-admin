import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../utils/api';
import type { Notice } from '../types/api';

import { mockNotices } from '../utils/mockData';

export const NoticesList: React.FC = () => {
  const { data: notices, error } = useQuery<Notice[], Error>({
    queryKey: ['recent-notices'],
    queryFn: () => fetcher('/api/v1/notice?sort=createdAt-desc&limit=5'),
  });

  const data = error ? mockNotices : (notices || []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">공지사항</h2>
        <a href="#" className="text-sm text-indigo-600 hover:underline">더보기</a>
      </div>
      <ul className="space-y-3">
        {data.map(notice => (
          <li
            key={notice.id}
            className="p-3 transition-colors border-l-4 rounded-r-md hover:bg-gray-50"
            style={{ borderLeftColor: notice.important ? '#4f46e5' : '#e5e7eb' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {notice.important && (
                  <span className="inline-block w-2 h-2 mr-2 bg-red-500 rounded-full"></span>
                )}
                <span className={`font-medium ${notice.important ? 'text-gray-800' : 'text-gray-700'}`}>
                  {notice.title}
                </span>
              </div>
              <span className="text-sm text-gray-500">{notice.createdAt}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};