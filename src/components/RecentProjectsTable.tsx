import React from 'react';

type Project = {
  id: number;
  title: string;
  author: string;
  date: string;
  views: number;
};

interface RecentProjectsTableProps {
  data: Project[];
}

export const RecentProjectsTable: React.FC<RecentProjectsTableProps> = ({ data }) => (
  <div className="p-6 bg-white rounded-lg shadow-md">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-gray-800">사이드프로젝트 글 목록</h2>
      <a href="#" className="text-sm text-indigo-600 hover:underline">더보기</a>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="pb-2">제목</th>
            <th className="pb-2">작성자</th>
            <th className="pb-2">등록일</th>
            <th className="pb-2">조회수</th>
          </tr>
        </thead>
        <tbody>
          {data.map(project => (
            <tr key={project.id} className="border-b hover:bg-gray-50">
              <td className="py-3 font-medium text-gray-800">{project.title}</td>
              <td className="py-3 text-sm text-gray-600">{project.author}</td>
              <td className="py-3 text-sm text-gray-600">{project.date}</td>
              <td className="py-3 text-sm text-gray-600">{project.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);