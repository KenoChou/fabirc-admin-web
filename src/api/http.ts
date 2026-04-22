import axios from 'axios';
import { message } from 'antd';
import { STORAGE_KEYS } from '../constants';

const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

export const http = axios.create({
  baseURL,
  timeout: 15000,
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.token);
  if (token && config.url?.startsWith('/api/v1/compute/')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status as number | undefined;
    if (status === 401) {
      localStorage.removeItem(STORAGE_KEYS.token);
      localStorage.removeItem(STORAGE_KEYS.username);
      localStorage.removeItem(STORAGE_KEYS.role);
      message.error('登录态已失效，请重新登录。');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    } else {
      const msg = error?.response?.data?.message ?? error.message ?? '请求失败';
      message.error(msg);
    }
    return Promise.reject(error);
  },
);
