// src/apis/axios.ts
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

// ✅ 환경 변수에서 API 주소 가져오기 (없을 경우 기본값 설정 가능)
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.verbly.kr';

export const instance = axios.create({
  baseURL: BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      // 재발급 요청 자체가 실패한 경우 로그아웃 처리
      if (originalRequest.url?.includes('/auth/reissue')) {
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        // ✅ 수정됨: 백틱(`)을 사용하여 환경변수와 경로 연결
        await axios.post(
          `${BASE_URL}/auth/reissue`,
          {},
          { withCredentials: true }
        );
        
        // 재발급 성공 시 원래 요청 재시도
        return instance(originalRequest);
        
      } catch (reissueError) {
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(reissueError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;