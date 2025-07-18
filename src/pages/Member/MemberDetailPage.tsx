import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/apiClient';
import type { Member } from '../../types/responseTypes';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const MemberDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // React Query를 사용하여 특정 회원 정보 가져옴.
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    api
      .get(`/api/users/${id}`)
      .then((res) => setMember(res.data.result))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;
  if (!member) return <div>회원 정보를 찾을 수 없습니다.</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">회원 상세 정보</h2>
      <div>
        <p><strong>ID:</strong> {member.userId}</p>
        <p><strong>이름:</strong> {member.userName}</p>
        <p><strong>이메일:</strong> {member.userEmail}</p>
        <p><strong>가입일:</strong> {new Date(member.registeredAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default MemberDetailPage;
