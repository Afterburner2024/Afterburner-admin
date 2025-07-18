import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/apiClient';
import type { Question } from '../../types/responseTypes';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const QuestionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    api
      .get(`/api/v1/qna/${id}`)
      .then((res) => setQuestion(res.data.result))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;
  if (!question) return <div>질문 정보를 찾을 수 없습니다.</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">질문 상세 정보</h2>
      <div>
        <p><strong>ID:</strong> {question.qnaId}</p>
        <p><strong>제목:</strong> {question.qnaTitle}</p>
        <p><strong>내용:</strong> {question.qnaContent}</p>
        <p><strong>작성일:</strong> {new Date(question.qnaCreatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default QuestionDetailPage;
