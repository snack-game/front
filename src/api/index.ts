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
      const { action } = error.response.data;

      switch (action) {
        case 'REISSUE': {
          await authApi.tokenReIssue();
          api.request(error.config);
          break;
        }
      }
    }
    // 처리되지 않은 오류는 그대로 반환
    return Promise.reject(error);
  },
);

export default api;
