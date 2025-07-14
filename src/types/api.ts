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
  title: string;
  content: string;
  createdAt: string; 
  important: boolean; // 중요 공지 여부
}

// 프로젝트 정보 타입
export interface Project {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  author: string;
  views: number;
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
