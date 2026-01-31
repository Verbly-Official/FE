import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null; // 추가
  isLoggedIn: boolean;
  login: (accessToken: string, refreshToken: string) => void; // 수정
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,
      login: (accessToken, refreshToken) => 
        set({ accessToken, refreshToken, isLoggedIn: true }),
      logout: () => set({ accessToken: null, refreshToken: null, isLoggedIn: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);