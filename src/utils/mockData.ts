import type { Member, Notice, Project, StudyGroup, Question } from '../types/api';

export const mockMembers: Member[] = [
  { id: 1, name: '김민준', email: 'mj.kim@example.com', signupDate: '2023-01-15', status: '활성' },
  { id: 2, name: '이서연', email: 'sy.lee@example.com', signupDate: '2023-01-14', status: '활성' },
  { id: 3, name: '박현우', email: 'hw.park@example.com', signupDate: '2023-01-13', status: '대기중' },
  { id: 4, name: '최지아', email: 'ja.choi@example.com', signupDate: '2023-01-12', status: '활성' },
  { id: 5, name: '정태양', email: 'ty.jung@example.com', signupDate: '2023-01-11', status: '활성' },
];

export const mockProjects: Project[] = [
  { id: 1, title: '사이드 프로젝트 팀원 구합니다', author: '김민준', createdAt: '2023-01-15', views: 128 },
  { id: 2, title: '토이프로젝트 같이 하실 분', author: '이서연', createdAt: '2023-01-14', views: 256 },
  { id: 3, title: '앱 개발 스터디원 모집', author: '박현우', createdAt: '2023-01-13', views: 98 },
  { id: 4, title: '프론트엔드 개발자 구해요', author: '최지아', createdAt: '2023-01-12', views: 312 },
  { id: 5, title: '백엔드 개발자 찾습니다', author: '정태양', createdAt: '2023-01-11', views: 178 },
];

export const mockStudyGroups: StudyGroup[] = [
  { id: 1, title: 'React 스터디', author: '김민준', createdAt: '2023-01-15', memberCount: 4 },
  { id: 2, title: '알고리즘 스터디', author: '이서연', createdAt: '2023-01-14', memberCount: 6 },
  { id: 3, title: 'CS 스터디', author: '박현우', createdAt: '2023-01-13', memberCount: 5 },
  { id: 4, title: 'TypeScript 스터디', author: '최지아', createdAt: '2023-01-12', memberCount: 3 },
  { id: 5, title: 'Node.js 스터디', author: '정태양', createdAt: '2023-01-11', memberCount: 4 },
];

export const mockNotices: Notice[] = [
  { id: 1, title: '서비스 점검 안내', createdAt: '2023-01-15', important: true },
  { id: 2, title: '신규 기능 업데이트', createdAt: '2023-01-14', important: false },
  { id: 3, title: '개인정보처리방침 변경 안내', createdAt: '2023-01-13', important: true },
  { id: 4, title: '커뮤니티 이용규칙 안내', createdAt: '2023-01-12', important: false },
  { id: 5, title: '서버 안정화 작업 안내', createdAt: '2023-01-11', important: false },
];

export const mockQuestions: Question[] = [
    { id: 1, title: 'React Query 질문', content: 'React Query에서 prefetching은 어떻게 사용하나요?', author: '김민준', createdAt: '2023-01-15' },
    { id: 2, title: 'Next.js 라우팅 질문', content: 'Next.js에서 동적 라우팅은 어떻게 구현하나요?', author: '이서연', createdAt: '2023-01-14' },
    { id: 3, title: 'TypeScript 타입 에러', content: 'TypeScript에서 "any" 타입을 사용하지 않으려면 어떻게 해야 하나요?', author: '박현우', createdAt: '2023-01-13' },
    { id: 4, title: 'JavaScript 비동기 처리', content: 'JavaScript에서 async/await는 어떻게 동작하나요?', author: '최지아', createdAt: '2023-01-12' },
    { id: 5, title: 'CSS 레이아웃 질문', content: 'Flexbox와 Grid의 차이점은 무엇인가요?', author: '정태양', createdAt: '2023-01-11' },
];
