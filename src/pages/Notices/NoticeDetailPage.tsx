import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNotice, deleteNotice } from '../../utils/apiClient';
import type { Notice } from '../../types/responseTypes';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const NoticeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        if (id) {
          const data = await getNotice(id);
          setNotice(data);
        }
      } catch (error) {
        console.error('Error fetching notice:', error);
      }
    };
    fetchNotice();
  }, [id]);

  const handleDelete = async () => {
    if (id && window.confirm('공지사항을 정말 삭제하시겠습니까?')) {
      try {
        await deleteNotice(id);
        navigate('/notices');
      } catch (error) {
        console.error('Error deleting notice:', error);
      }
    }
  };

  if (!notice) {
    return <LoadingSpinner />;
  }

  const createdAt = new Date(notice.noticeCreatedAt).toLocaleDateString();
  const updatedAt = notice.noticeUpdatedAt ? new Date(notice.noticeUpdatedAt).toLocaleDateString() : null;

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* 헤더 라인 */}
      <div className="border-b-2 border-blue-600 mb-4" />

      {/* 제목 */}
      <h1 className="text-2xl font-bold mb-2">{notice.noticeTitle}</h1>

      {/* 메타 정보 바 */}
      <div className="flex items-center space-x-4 text-sm text-gray-600 bg-gray-100 py-2 px-4 rounded">
        <span>작성일 {createdAt}</span>
        {updatedAt && <span>수정일 {updatedAt}</span>}
      </div>

      {/* 본문 내용 */}
      <div className="mt-6 whitespace-pre-wrap text-gray-800 leading-relaxed h-[50vh] overflow-y-auto border border-gray-200 rounded-lg shadow-md p-4 bg-white">
        {notice.noticeContent}
      </div>

      {/* 액션 버튼 */}
      <div className="flex justify-end space-x-2 mt-6">
        <button
          onClick={() => navigate('/notices')}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          목록으로
        </button>
        <button
          onClick={() => navigate(`/notices/edit/${id}`)}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          수정
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default NoticeDetailPage;
