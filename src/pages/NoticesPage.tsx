import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockNotices as rawMockNotices } from '../utils/mockData';
import type { Notice } from '../types/api';

const mockNotices: Notice[] = rawMockNotices as unknown as Notice[];

const NoticesPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/notices/register');
  };

  const handleNoticeClick = (id: string) => {
    navigate(`/notices/${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">공지사항</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleRegisterClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          공지사항 등록
        </button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        {mockNotices.length === 0 ? (
          <p>등록된 공지사항이 없습니다.</p>
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">제목</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">작성자</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">작성일</th>
              </tr>
            </thead>
            <tbody>
              {mockNotices.map((notice) => (
                <tr
                  key={notice.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleNoticeClick(String(notice.id))}
                >
                  <td className="py-2 px-4 border-b border-gray-200">{notice.title}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{notice.userName}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{notice.createdAt}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{notice.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default NoticesPage;
