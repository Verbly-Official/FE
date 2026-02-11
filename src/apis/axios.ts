import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { reissueTokenApi } from './auth'; 

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const instance = axios.create({
  baseURL: BASE_URL, 
  withCredentials: true, 
});

// ✅ Request Interceptor (개선된 버전)
instance.interceptors.request.use(
  (config) => {
    // FormData인 경우 Content-Type 헤더를 완전히 제거
    if (config.data instanceof FormData) {
      // 방법 1: delete 사용 (가장 확실한 방법)
      if (config.headers) {
        delete config.headers['Content-Type'];
        // axios 내부적으로 사용하는 키도 제거
        delete config.headers['content-type'];
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (기존 유지)
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url?.includes('/auth/reissue')) {
        useAuthStore.getState().logout();
        window.location.href = '/login'; 
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        await reissueTokenApi();
        return instance(originalRequest);
      } catch (reissueError) {
        console.error('토큰 재발급 실패:', reissueError);
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(reissueError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;