import axios from 'axios';

import authApi from './auth.api';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      const status = error.response.status;
      const { code } = error.response.data;
      const originalRequest = error.config;
      if (!originalRequest._retry) {
        // _retry 플래그를 사용하여 무한 재시도 방지
        originalRequest._retry = true;

        if (status === 401 && code === 'TOKEN_EXPIRED_EXCEPTION') {
          await authApi.tokenReIssue();
          return api.request(originalRequest);
        }
        if (status === 401 && code === 'REFRESH_TOKEN_EXPIRED_EXCEPTION') {
          await authApi.tokenReIssue();
          return api.request(originalRequest);
        }
      }
    }
    // 처리되지 않은 오류는 그대로 반환
    return Promise.reject(error);
  },
);

export default api;
