import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import type { Notice, ProjectTeam } from '../types/responseTypes';
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
  return response.data.result ?? response.data;
};

export const getNotice = async (id: string): Promise<Notice> => {
  const response = await api.get(`/api/v1/notice/${id}`);
  return response.data.result ?? response.data;
};

export const createNotice = async (notice: { noticeTitle: string; noticeContent: string }): Promise<Notice> => {
  const response = await api.post('/api/v1/notice', notice);
  return response.data.result ?? response.data;
};

export const updateNotice = async (id: string, notice: { noticeTitle: string; noticeContent: string }): Promise<Notice> => {
  const response = await api.put(`/api/v1/notice/${id}`, notice);
  return response.data.result ?? response.data;
};

export const deleteNotice = async (id: string): Promise<void> => {
  await api.delete(`/api/v1/notice/${id}`);
};

export const getProjectTeamMembers = async (
  projectId: string
): Promise<ProjectTeam[]> => {
  const response = await api.get(`/api/v1/project/${projectId}/member`);
  return response.data.result ?? response.data;
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
  return response.data.result ?? response.data;
};

export const deleteProjectTeamMember = async (
  projectId: string,
  teamId: string
): Promise<void> => {
  await api.delete(`/api/v1/project/${projectId}/member/${teamId}`);
};

export default api;