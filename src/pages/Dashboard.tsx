import React from 'react';
import { RecentMembersTable } from '../components/RecentMembersTable';
import { RecentProjectsTable } from '../components/RecentProjectsTable';
import { RecentStudiesTable } from '../components/RecentStudiesTable';
import { NoticesList } from '../components/NoticesList';

const Dashboard: React.FC = () => {
  const recentMembers: Member[] = [
    { id: 1, name: '김민준', email: 'minjun@example.com', joinDate: '2025-06-28', status: '활성' },
    { id: 2, name: '이지현', email: 'jihyun@example.com', joinDate: '2025-06-27', status: '활성' },
    { id: 3, name: '박서연', email: 'seoyeon@example.com', joinDate: '2025-06-26', status: '활성' },
    { id: 4, name: '최준호', email: 'junho@example.com', joinDate: '2025-06-25', status: '활성' },
    { id: 5, name: '정수빈', email: 'subin@example.com', joinDate: '2025-06-24', status: '대기중' },
  ];

  const recentProjects: Project[] = [
    { id: 1, title: '핀테크 앱 개발 프로젝트', author: '김민준', date: '2025-06-28', views: 42 },
    { id: 2, title: 'AI 기반 건강관리 서비스', author: '이지현', date: '2025-06-27', views: 38 },
    { id: 3, title: '블록체인 기반 중고거래 플랫폼', author: '박서연', date: '2025-06-26', views: 35 },
    { id: 4, title: '실시간 협업 툴 개발', author: '최준호', date: '2025-06-25', views: 31 },
    { id: 5, title: '친환경 제품 쇼핑몰', author: '정수빈', date: '2025-06-24', views: 29 },
  ];

  const recentStudies: Study[] = [
    { id: 1, title: 'React 심화 스터디', author: '김민준', date: '2025-06-28', members: 8 },
    { id: 2, title: 'AI/ML 기초 스터디', author: '이지현', date: '2025-06-27', members: 12 },
    { id: 3, title: '알고리즘 문제풀이 모임', author: '박서연', date: '2025-06-26', members: 10 },
    { id: 4, title: '클라우드 인프라 스터디', author: '최준호', date: '2025-06-25', members: 6 },
    { id: 5, title: 'UX/UI 디자인 스터디', author: '정수빈', date: '2025-06-24', members: 9 },
  ];

  const recentNotices: Notice[] = [
    { id: 1, title: '서비스 업데이트 안내', date: '2025-06-28', important: true },
    { id: 2, title: '개인정보 처리방침 변경 안내', date: '2025-06-25', important: true },
    { id: 3, title: '여름 휴가 기간 고객센터 운영 안내', date: '2025-06-22', important: false },
    { id: 4, title: '신규 기능 베타 테스트 참여자 모집', date: '2025-06-20', important: false },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <RecentMembersTable data={recentMembers} />
      <RecentProjectsTable data={recentProjects} />
      <RecentStudiesTable data={recentStudies} />
      <NoticesList data={recentNotices} />
    </div>
  );
};

export default Dashboard;
