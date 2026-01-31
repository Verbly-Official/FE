import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터는 기존과 동일하게 유지
instance.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 발생 시 재발급 로직 추가
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { refreshToken, logout, login } = useAuthStore.getState();

      if (refreshToken) {
        try {
          // 1. 새 토큰 재발급 요청 (명세서 기준)
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/reissue`, {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });

          if (response.data.isSuccess) {
            const newAccessToken = response.data.result.accessToken;
            
            // 2. 스토어 갱신 (명세에 따라 refreshToken도 같이 오면 갱신, 아니면 기존 유지)
            login(newAccessToken, refreshToken);

            // 3. 원래 요청의 헤더를 새 토큰으로 교체 후 재요청
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return instance(originalRequest);
          }
        } catch (reissueError) {
          // 재발급 실패 (refreshToken 만료/조작 등) 시 로그아웃 및 이동
          logout();
          window.location.href = '/login';
          return Promise.reject(reissueError);
        }
      } else {
        // refreshToken이 없는 경우
        logout();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default instance;