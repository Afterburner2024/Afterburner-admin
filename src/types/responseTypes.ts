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
