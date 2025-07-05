import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../utils/api';
import type { Question } from '../types/api';

const QuestionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: question, isLoading, error } = useQuery<Question, Error>({
    queryKey: ['question', id],
    queryFn: () => fetcher(`/api/v1/questions/${id}`),
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;
  if (!question) return <div>질문 정보를 찾을 수 없습니다.</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">질문 상세 정보</h2>
      <div>
        <p><strong>ID:</strong> {question.id}</p>
        <p><strong>제목:</strong> {question.title}</p>
        <p><strong>내용:</strong> {question.content}</p>
        <p><strong>작성자:</strong> {question.author}</p>
        <p><strong>작성일:</strong> {new Date(question.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default QuestionDetailPage;
