import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../utils/apiClient';
import type {
  Member,
  Project,
  StudyGroup,
  Question,
} from '../../types/responseTypes';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useMemberActivity } from '../../hooks/useMemberActivity';

// ListCard 컴포넌트 props 타입 정의
interface ListCardProps<T extends { [key in K | L]: string | number }, K extends keyof T, L extends keyof T> {
  title: string;
  items: T[];
  idKey: K;
  labelKey: L;
  linkPrefix: string;
}

// ListCard 컴포넌트: 제네릭을 사용하여 타입 안정성 강화
const ListCard = <T extends { [key in K | L]: string | number }, K extends keyof T, L extends keyof T>({
  title,
  items,
  idKey,
  labelKey,
  linkPrefix,
}: ListCardProps<T, K, L>) => (
  <div className="bg-white shadow-md rounded-lg p-4">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    {items.length > 0 ? (
      <ul className="list-disc pl-5 space-y-1">
        {items.map((item) => (
          <li key={String(item[idKey])}>
            <Link
              to={`${linkPrefix}${item[idKey]}`}
              className="text-indigo-600 hover:underline"
            >
              {String(item[labelKey])}
            </Link>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-sm text-gray-500">목록이 없습니다.</p>
    )}
  </div>
);

const MemberDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // useQuery를 사용하여 특정 회원 정보 가져오기
  const {
    data: member,
    isLoading: isMemberLoading,
    error: memberError,
  } = useQuery<Member, Error>({
    queryKey: ['member', id],
    queryFn: () => {
      if (!id) return Promise.reject(new Error('id is required'));
      const numericId = parseInt(id, 10);
      return api.get(`/api/v1/users/${numericId}`).then((res) => res.data.result);
    },
    enabled: !!id && !isNaN(parseInt(id, 10)),
  });

  // 커스텀 훅을 사용하여 유저 활동 내역 조회
  const {
    userProjects,
    participatedProjects,
    userStudies,
    participatedStudies,
    userQuestions,
    isLoading: isActivityLoading,
    error: activityError,
  } = useMemberActivity(id);

  if (isMemberLoading || isActivityLoading) return <LoadingSpinner />;

  const error = memberError || activityError;
  if (error) {
    return (
      <div className="p-4 text-red-500">
        에러가 발생했습니다: {error.message}
      </div>
    );
  }

  if (!member) return <div className="p-4">회원 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="border-b-2 border-blue-600 mb-4" />
        <h1 className="text-2xl font-bold mb-4">회원 상세 정보</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-500 mb-1">
              ID
            </label>
            <p className="text-lg text-gray-900">{member.userId}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-500 mb-1">
              이름
            </label>
            <p className="text-lg text-gray-900">{member.userName}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-500 mb-1">
              이메일
            </label>
            <p className="text-lg text-gray-900">{member.userEmail}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-500 mb-1">
              가입일
            </label>
            <p className="text-lg text-gray-900">
              {new Date(member.registeredAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ListCard<StudyGroup, 'studyGroupId', 'studyGroupTitle'>
          title="등록한 스터디 그룹"
          items={userStudies}
          idKey="studyGroupId"
          labelKey="studyGroupTitle"
          linkPrefix="/studies/"
        />
        <ListCard<StudyGroup, 'studyGroupId', 'studyGroupTitle'>
          title="참여한 스터디 그룹"
          items={participatedStudies}
          idKey="studyGroupId"
          labelKey="studyGroupTitle"
          linkPrefix="/studies/"
        />
        <ListCard<Project, 'projectId', 'projectTitle'>
          title="등록한 사이드프로젝트"
          items={userProjects}
          idKey="projectId"
          labelKey="projectTitle"
          linkPrefix="/projects/"
        />
        <ListCard<Project, 'projectId', 'projectTitle'>
          title="참여한 사이드프로젝트"
          items={participatedProjects}
          idKey="projectId"
          labelKey="projectTitle"
          linkPrefix="/projects/"
        />
        <div className="md:col-span-2">
          <ListCard<Question, 'qnaId', 'qnaTitle'>
            title="작성한 질문"
            items={userQuestions}
            idKey="qnaId"
            labelKey="qnaTitle"
            linkPrefix="/questions/"
          />
        </div>
      </div>
    </div>
  );
};

export default MemberDetailPage;