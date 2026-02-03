import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/useAuthStore';

// 1. Axios 인스턴스 생성
export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000,
});

// 2. 요청 인터셉터
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. 응답 인터셉터 (토큰 재발급)
instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      const authStore = useAuthStore.getState();
      // userInfo도 구조분해 할당으로 가져옵니다.
      const { refreshToken, logout, login, userInfo } = authStore; 

      if (!refreshToken) {
        handleLogout(logout);
        return Promise.reject(error);
      }

      try {
        console.log('🔄 토큰 재발급 시도...');
        
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/reissue`,
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
            withCredentials: true,
          }
        );

        if (response.data.isSuccess) {
          console.log('✅ 토큰 재발급 성공');
          
          const newAccessToken = response.data.result.accessToken;
          const newRefreshToken = response.data.result.refreshToken || refreshToken;

          // 🛠️ 수정된 부분: userInfo 객체 내부 값에 접근
          // 기존 userInfo가 null일 경우를 대비해 안전하게 접근하거나 빈 값을 할당
          const currentUserInfo = {
            userId: userInfo?.userId || '',
            nickname: userInfo?.nickname || '',
            profileImage: userInfo?.profileImage || '',
            email: userInfo?.email,
            provider: userInfo?.provider, // 👈 authStore.provider -> userInfo.provider 로 변경
            status: userInfo?.status,
            nativeLang: userInfo?.nativeLang,
            learningLang: userInfo?.learningLang
          };

          // 스토어 갱신
          login(newAccessToken, newRefreshToken, currentUserInfo);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        } else {
          throw new Error('Token reissue failed');
        }
      } catch (reissueError) {
        console.error('❌ 토큰 재발급 실패:', reissueError);
        handleLogout(logout);
        return Promise.reject(reissueError);
      }
    }

    return Promise.reject(error);
  }
);

const handleLogout = (logoutAction: () => void) => {
  logoutAction();
  localStorage.removeItem('auth-storage');
  window.location.href = '/login';
};

export default instance;