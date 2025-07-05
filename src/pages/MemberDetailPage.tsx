import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../utils/api';
import type { Member } from '../types/api';

const MemberDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // React Query를 사용하여 특정 회원 정보 가져옴.
  const { data: member, isLoading, error } = useQuery<Member, Error>({
    queryKey: ['member', id],
    queryFn: () => fetcher(`/api/v1/members/${id}`),
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;
  if (!member) return <div>회원 정보를 찾을 수 없습니다.</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">회원 상세 정보</h2>
      <div>
        <p><strong>ID:</strong> {member.id}</p>
        <p><strong>이름:</strong> {member.name}</p>
        <p><strong>이메일:</strong> {member.email}</p>
        <p><strong>가입일:</strong> {new Date(member.signupDate).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default MemberDetailPage;
