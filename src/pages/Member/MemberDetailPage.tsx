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
  if (error) return <div className="p-4 text-red-500">에러가 발생했습니다: {error.message}</div>;
  if (!member) return <div className="p-4">회원 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="border-b-2 border-blue-600 mb-4" />
        <h1 className="text-2xl font-bold mb-4">회원 상세 정보</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-500 mb-1">ID</label>
            <p className="text-lg text-gray-900">{member.userId}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-500 mb-1">이름</label>
            <p className="text-lg text-gray-900">{member.userName}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-500 mb-1">이메일</label>
            <p className="text-lg text-gray-900">{member.userEmail}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-500 mb-1">가입일</label>
            <p className="text-lg text-gray-900">{new Date(member.registeredAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetailPage;
