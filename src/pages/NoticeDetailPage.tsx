import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockNotices } from '../utils/mockData';

const NoticeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const notice = mockNotices.find(n => n.id === id);

  if (!notice) {
    return <div className="p-6 text-red-500">공지사항을 찾을 수 없습니다.</div>;
  }

  const handleEditClick = () => {
    navigate(`/notices/edit/${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">공지사항 상세</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{notice.title}</h2>
        <p className="text-gray-600 text-sm mb-4">작성일: {notice.createdAt}</p>
        <div className="prose max-w-none mb-6">
          <p>{notice.content}</p>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            목록으로
          </button>
          <button
            onClick={handleEditClick}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetailPage;