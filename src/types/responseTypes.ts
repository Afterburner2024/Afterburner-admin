// 회원 정보 타입
export interface Member {
  userId: number;
  userName: string;
  userEmail: string;
  registeredAt: string;
}

// 공지사항 정보 타입
export interface Notice {
  noticeId: number;
  noticeTitle: string;
  noticeContent: string;
  noticeStatus: string;
  noticeCreatedAt: string;
  noticeUpdatedAt: string;
}

// 프로젝트 정보 타입
export interface Project {
  projectId: number;
  projectTitle: string;
  projectContent: string;
  projectCreatedAt: string;
  projectStatus: string;
  projectLink: string;
}

// 스터디 그룹 정보 타입
export interface StudyGroup {
  studyGroupId: number;
  studyGroupTitle: string;
  studyGroupContent: string;
  studyGroupCreatedAt: string;
  studyGroupStatus: string;
  studyGroupUserId: number;
}

// 질문 정보 타입
export interface Question {
  qnaId: number;
  qnaTitle: string;
  qnaContent: string;
  qnaAnswer: string;
  qnaStatus: string;
  qnaCreatedAt: string;
  author: string;
}

export interface MemberUI {
  id: number;
  name: string;
  email: string;
  signupDate: string;
  status: '활성' | '비활성';
}

export interface NoticeUI {
  id: number;
  userName: string;
  title: string;
  content: string;
  createdAt: string; 
  updatedAt: string;
  important: boolean;
}

export interface ProjectUI {
  id: string;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  members: string[];
}

export interface StudyGroupUI {
  id: number;
  title: string;
  content: string;
  createdAt: string; 
  author: string;
  memberCount: number;
}

export interface QuestionUI {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}
