import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { type UserInfo } from '../types/user';

interface AuthState {
  // 상태 (State)
  accessToken: string | null;
  refreshToken: string | null;
  userInfo: UserInfo | null;
  isLoggedIn: boolean;

  // 액션 (Actions)
  login: (accessToken: string, refreshToken: string, userInfo: UserInfo) => void;
  logout: () => void;
  setUserInfo: (userInfo: UserInfo) => void; // 🆕 추가된 액션
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      // 초기 상태
      accessToken: null,
      refreshToken: null,
      userInfo: null,
      isLoggedIn: false,

      // 로그인: 토큰과 유저 정보를 모두 저장하고 로그인 상태로 변경
      login: (accessToken, refreshToken, userInfo) =>
        set({
          accessToken,
          refreshToken,
          userInfo,
          isLoggedIn: true,
        }),

      // 로그아웃: 모든 인증 정보를 초기화
      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          userInfo: null,
          isLoggedIn: false,
        }),

      // 유저 정보 업데이트: 토큰은 건드리지 않고 유저 정보만 갱신 (온보딩 완료 시 사용)
      setUserInfo: (userInfo) => set({ userInfo }),
    }),
    {
      name: 'auth-storage', // localStorage에 저장될 Key 이름
      storage: createJSONStorage(() => localStorage), // 저장소로 localStorage 사용
    }
  )
);