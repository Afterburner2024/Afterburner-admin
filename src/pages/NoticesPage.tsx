import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Notice } from '../types/api';

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
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">제목</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">작성자</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">작성일</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={3} className="py-4 px-4 text-center text-gray-500">등록된 공지사항이 없습니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NoticesPage;
