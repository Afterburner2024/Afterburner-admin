import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import type { Notice, ProjectTeam, Project, StudyGroup, Question } from '../types/responseTypes';
import type { AxiosRequestHeaders } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  timeout: 10000,
});

let csrfToken: string | null = null;

export const setCsrfToken = (token: string) => {
  csrfToken = token;
  api.defaults.headers.common['X-XSRF-TOKEN'] = token;
};

export const fetchCsrfToken = async (): Promise<void> => {
  try {
    const res = await api.get('/csrf-token');
    if (res.data?.token) {
      setCsrfToken(res.data.token as string);
    }
  } catch {
    console.error('CSRF token 요청 실패');
  }
};

api.interceptors.request.use((config) => {
  if (csrfToken) {
    config.headers = config.headers || {};
    (config.headers as AxiosRequestHeaders)['X-XSRF-TOKEN'] = csrfToken;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export const fetcher = async (url: string) => {
  const res = await api.get(url);
  return res.data.result ?? res.data;
};

export const getNotices = async (): Promise<Notice[]> => {
  const response = await api.get('/api/v1/notice');
  return response.data.result ?? [];
};

export const getNotice = async (id: string): Promise<Notice> => {
  const response = await api.get(`/api/v1/notice/${id}`);
  return response.data.result ?? null;
};

export const createNotice = async (notice: { noticeTitle: string; noticeContent: string }): Promise<Notice> => {
  const response = await api.post('/api/v1/notice', notice);
  return response.data.result ?? null;
};

export const updateNotice = async (id: string, notice: { noticeTitle: string; noticeContent: string }): Promise<Notice> => {
  const response = await api.put(`/api/v1/notice/${id}`, notice);
  return response.data.result ?? null;
};

export const deleteNotice = async (id: string): Promise<void> => {
  await api.delete(`/api/v1/notice/${id}`);
};

export const getProjectTeamMembers = async (
  projectId: string
): Promise<ProjectTeam[]> => {
  const response = await api.get(`/api/v1/project/${projectId}/member`);
  return response.data.result ?? [];
};

export const updateProjectTeamMember = async (
  projectId: string,
  teamId: string,
  data: Partial<ProjectTeam>
): Promise<ProjectTeam> => {
  const response = await api.put(
    `/api/v1/project/${projectId}/member/${teamId}`,
    data
  );
  return response.data.result ?? null;
};

export const deleteProjectTeamMember = async (
  projectId: string,
  teamId: string
): Promise<void> => {
  await api.delete(`/api/v1/project/${projectId}/member/${teamId}`);
};

// 사용자별 게시글 및 참여 정보 조회 API
export const getUserProjects = async (userId: string): Promise<Project[]> => {
  const res = await api.get(`/api/v1/users/${userId}/projects`);
  return res.data.result ?? [];
};

export const getUserParticipatedProjects = async (
  userId: string,
): Promise<Project[]> => {
  const res = await api.get(`/api/v1/users/${userId}/participated-projects`);
  return res.data.result ?? [];
};

export const getUserStudies = async (userId: string): Promise<StudyGroup[]> => {
  const res = await api.get(`/api/v1/users/${userId}/studies`);
  return res.data.result ?? [];
};

export const getUserParticipatedStudies = async (
  userId: string,
): Promise<StudyGroup[]> => {
  const res = await api.get(`/api/v1/users/${userId}/participated-studies`);
  return res.data.result ?? [];
};

export const getUserQuestions = async (userId: string): Promise<Question[]> => {
  const res = await api.get(`/api/v1/users/${userId}/questions`);
  return res.data.result ?? [];
};

export const updateStudyGroupMember = async (
  studyGroupId: string,
  memberId: string,
  data: Partial<StudyGroupMember>
): Promise<StudyGroupMember> => {
  const response = await api.put(
    `/api/v1/study-group/${studyGroupId}/member/${memberId}`,
    data
  );
  return response.data.result ?? null;
};

export const deleteStudyGroupMember = async (
  studyGroupId: string,
  memberId: string
): Promise<void> => {
  await api.delete(`/api/v1/study-group/${studyGroupId}/member/${memberId}`);
};

export default api;