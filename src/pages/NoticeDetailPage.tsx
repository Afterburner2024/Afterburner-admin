import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../utils/api';
import type { Notice } from '../types/api';

const NoticeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: notice, isLoading, error } = useQuery<Notice, Error>({
    queryKey: ['notice', id],
    queryFn: () => fetcher(`/api/v1/notice/${id}`),
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;
  if (!notice) return <div>공지사항 정보를 찾을 수 없습니다.</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">공지사항 상세 정보</h2>
      <div>
        <p><strong>ID:</strong> {notice.id}</p>
        <p><strong>제목:</strong> {notice.title}</p>
        <p><strong>내용:</strong> {notice.content}</p>
        <p><strong>작성일:</strong> {new Date(notice.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default NoticeDetailPage;
