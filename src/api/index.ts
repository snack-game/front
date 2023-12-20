import axios from 'axios';

import { ATOM_KEY } from '@constants/atom.constant';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const serializedUserState = localStorage.getItem(ATOM_KEY.USER_PERSIST);
  let accessToken;

  if (serializedUserState) {
    const parsedUserState = JSON.parse(serializedUserState);
    accessToken = parsedUserState?.userState?.accessToken;
  }

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

export default api;
