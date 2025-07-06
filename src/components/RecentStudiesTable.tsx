import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../utils/api';
import type { StudyGroup } from '../types/api';

import { mockStudyGroups } from '../utils/mockData';

export const RecentStudiesTable: React.FC = () => {
  const { data: studies, error } = useQuery<StudyGroup[], Error>({
    queryKey: ['recent-studies'],
    queryFn: () => fetcher('/api/v1/study-group?sort=createdAt-desc&limit=5'),
  });

  const data = error ? mockStudyGroups : (studies || []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">스터디그룹 글 목록</h2>
        <a href="#" className="text-sm text-indigo-600 hover:underline">더보기</a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="pb-2">제목</th>
              <th className="pb-2">개설자</th>
              <th className="pb-2">등록일</th>
              <th className="pb-2">인원</th>
            </tr>
          </thead>
          <tbody>
            {data.map(study => (
              <tr key={study.id} className="border-b hover:bg-gray-50">
                <td className="py-3 font-medium text-gray-800">{study.title}</td>
                <td className="py-3 text-sm text-gray-600">{study.author}</td>
                <td className="py-3 text-sm text-gray-600">{study.createdAt}</td>
                <td className="py-3 text-sm text-gray-600">{study.memberCount}명</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};