import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import type { Notice } from '../types/responseTypes';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
  timeout: 10000, // 10 seconds timeout
});

api.interceptors.request.use((config) => {
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

export default api;