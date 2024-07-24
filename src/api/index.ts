import axios from 'axios';

import PATH from '@constants/path.constant';

import authApi from './auth.api';
import { ATOM_KEY } from '@constants/atom.constant';

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

      if (status === 401 && code === 'TOKEN_EXPIRED_EXCEPTION') {
        try {
          if (window.navigator.userAgent.includes('SnackgameApp')) {
            await appRefresh();
          } else {
            await authApi.tokenReIssue();
          }
        } catch (error) {
          await authApi.logOut();
          localStorage.removeItem(ATOM_KEY.USER_PERSIST);
          window.dispatchEvent(new Event('loggedOut'));
          window.location.reload();
        }
        return api.request(originalRequest);
      }
      if (
        status === 401 &&
        originalRequest.method === 'patch' &&
        originalRequest.url === '/tokens/me' &&
        code === 'REFRESH_TOKEN_EXPIRED_EXCEPTION'
      ) {
        await authApi.logOut();
        localStorage.removeItem(ATOM_KEY.USER_PERSIST);
        window.dispatchEvent(new Event('loggedOut'));
        window.location.reload();
      }
      if (
        status === 401 &&
        localStorage.getItem(ATOM_KEY.USER_PERSIST) &&
        code === 'TOKEN_UNRESOLVABLE_EXCEPTION'
      ) {
        localStorage.removeItem(ATOM_KEY.USER_PERSIST);
        window.dispatchEvent(new Event('loggedOut'));
        window.location.reload();
      }
    }
    // 처리되지 않은 오류는 그대로 반환
    return Promise.reject(error);
  },
);

function appRefresh(): Promise<void> {
  dispatchEvent(new CustomEvent('app-refresh-requested'));
  return new Promise((resolve, reject) => {
    const successHandler = () => {
      cleanup();
      resolve();
    };
    const failureHandler = () => {
      cleanup();
      reject(new Error('app logged out'));
    };
    window.addEventListener('app-refreshed', successHandler);
    window.addEventListener('app-refresh-failed', failureHandler);

    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error('app refresh timeout'));
    }, 5000);

    const cleanup = () => {
      window.removeEventListener('app-refreshed', successHandler);
      window.removeEventListener('app-refresh-failed', failureHandler);
      clearTimeout(timeout);
    };
  });
}

export default api;
