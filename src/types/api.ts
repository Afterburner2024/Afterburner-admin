// 회원 정보 타입
export interface Member {
  id: number;
  name: string;
  email: string;
  signupDate: string;
  status: '활성' | '비활성';
}

// 공지사항 정보 타입
export interface Notice {
  id: number;
  userName: string;
  title: string;
  content: string;
  createdAt: string; 
  updatedAt: string;
  important: boolean; // 중요 공지 여부
}

// 프로젝트 정보 타입
export interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  members: string[];
}

// 스터디 그룹 정보 타입
export interface StudyGroup {
  id: number;
  title: string;
  content: string;
  createdAt: string; 
  author: string;
  memberCount: number;
}

// 질문 정보 타입
export interface Question {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}
