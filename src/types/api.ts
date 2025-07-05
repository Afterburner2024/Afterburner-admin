// 회원 정보 타입
export interface Member {
  id: number;
  name: string;
  email: string;
  signupDate: string;
}

// 공지사항 정보 타입
export interface Notice {
  id: number;
  title: string;
  content: string;
  createdAt: string; 
}

// 프로젝트 정보 타입
export interface Project {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

// 스터디 그룹 정보 타입
export interface StudyGroup {
  id: number;
  title: string;
  content: string;
  createdAt: string; 
}

// 질문 정보 타입
export interface Question {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}
