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
      const { action } = error.response.data;
      const originalRequest = error.config;
      if (!originalRequest._retry) {
        // _retry 플래그를 사용하여 무한 재시도 방지
        originalRequest._retry = true;

        switch (status) {
          case 401: {
            switch (action) {
              case 'REISSUE': {
                await authApi.tokenReIssue();
                return api.request(originalRequest);
              }
              case null: {
                await authApi.logOut();
                break;
              }
            }
          }
        }
      }
    }
    // 처리되지 않은 오류는 그대로 반환
    return Promise.reject(error);
  },
);

export default api;
