import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/apiClient';
import type { StudyGroup } from '../../types/responseTypes';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const StudyGroupDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [studyGroup, setStudyGroup] = useState<StudyGroup | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    api
      .get(`/api/v1/study-group/${id}`)
      .then((res) => setStudyGroup(res.data.result ?? res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;
  if (!studyGroup) return <div>스터디 그룹 정보를 찾을 수 없습니다.</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">스터디 그룹 상세 정보</h2>
      <div>
        <p><strong>ID:</strong> {studyGroup.studyGroupId}</p>
        <p><strong>제목:</strong> {studyGroup.studyGroupTitle}</p>
        <p><strong>내용:</strong> {studyGroup.studyGroupContent}</p>
        <p><strong>작성일:</strong> {new Date(studyGroup.studyGroupCreatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default StudyGroupDetailPage;
