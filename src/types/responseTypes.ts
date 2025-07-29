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
  projectSummary: string;
  projectContent: string;
  projectLink: string;
  projectCreatedAt: string;
  projectUpdatedAt: string;
  projectDeletedAt: string;
  projectFinishedAt: string;
  projectStatus: string;
  projectTechStack: string[];
  projectRecruitmentRoles: string[];
  projectUserId: number;
  projectRegion: string;
}

// 프로젝트 팀원 정보 타입
export interface ProjectTeam {
  projectTeamId: number;
  projectTeamPostId: number;
  projectTeamUserId: number;
  projectTeamRole: 'LEADER' | 'MANAGER' | 'MEMBER';
  projectTeamPart:
    | 'BACKEND'
    | 'FRONTEND'
    | 'FLUTTER'
    | 'DEVOPS'
    | 'PM'
    | 'DESIGNER'
    | 'PUBLISHER';
  projectTeamMember: 'PENDING' | 'APPROVED' | 'REJECTED';
  projectTeamJoinedAt: string;
  projectTeamQuitedAt: string | null;
}

// 스터디 그룹 정보 타입
export interface StudyGroup {
  studyGroupId: number;
  studyGroupCategory: string[];
  studyGroupTitle: string;
  studyGroupSummary: string;
  studyGroupContent: string;
  studyGroupCreatedAt: string;
  studyGroupUpdatedAt: string;
  studyGroupDeletedAt: string;
  studyGroupFinishedAt: string;
  studyGroupStatus: string;
  studyGroupMembers: string[];
  studyGroupUserId: number;
  studyGroupRole: string;
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
