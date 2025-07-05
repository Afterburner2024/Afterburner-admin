import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../utils/api';
import type { StudyGroup } from '../types/api';

const StudyGroupDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: studyGroup, isLoading, error } = useQuery<StudyGroup, Error>({
    queryKey: ['studyGroup', id],
    queryFn: () => fetcher(`/api/v1/study-group/${id}`),
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;
  if (!studyGroup) return <div>스터디 그룹 정보를 찾을 수 없습니다.</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">스터디 그룹 상세 정보</h2>
      <div>
        <p><strong>ID:</strong> {studyGroup.id}</p>
        <p><strong>제목:</strong> {studyGroup.title}</p>
        <p><strong>내용:</strong> {studyGroup.content}</p>
        <p><strong>작성일:</strong> {new Date(studyGroup.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default StudyGroupDetailPage;
