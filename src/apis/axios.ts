import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import { reissueTokenApi } from "./auth";

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
      if (config.headers) {
        delete config.headers["Content-Type"];
        delete config.headers["content-type"];
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      // ✅ 핵심 수정: 이미 로그아웃 상태면 재발급 시도 없이 바로 종료
      // 로그아웃 후 마운트된 컴포넌트들의 잔여 API 요청이 401을 받아도
      // logout() → 렌더링 → 재요청 → 401 의 무한 루프가 발생하지 않음
      if (!useAuthStore.getState().isLoggedIn) {
        return Promise.reject(error);
      }

      if (originalRequest.url?.includes("/auth/reissue")) {
        useAuthStore.getState().logout();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        await reissueTokenApi();
        return instance(originalRequest);
      } catch (reissueError) {
        console.error("토큰 재발급 실패:", reissueError);
        useAuthStore.getState().logout();
        window.location.href = "/login";
        return Promise.reject(reissueError);
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
