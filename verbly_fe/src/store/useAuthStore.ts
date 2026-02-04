// src/store/useAuthStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { type UserInfo } from '../types/user';

/**
 * 쿠키 기반 인증 스토어
 * 
 * ⚠️ 중요: accessToken과 refreshToken은 HttpOnly 쿠키로 관리되므로
 * 이 스토어에서는 저장하지 않습니다.
 * 
 * - accessToken: 백엔드가 쿠키로 설정, 브라우저가 자동으로 전송
 * - refreshToken: 백엔드가 쿠키로 설정, 브라우저가 자동으로 전송
 * - userInfo: 사용자 정보만 스토어에 저장
 */
interface AuthState {
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
  
  /**
   * 로그인 처리
   * @param userInfo 사용자 정보 (토큰은 쿠키로 이미 설정됨)
   */
  login: (userInfo: UserInfo) => void;
  
  /**
   * 로그아웃 처리
   * - 스토어 초기화
   * - 로컬스토리지 삭제
   * - 실제 쿠키 삭제는 백엔드 /auth/logout API에서 처리
   */
  logout: () => void;
  
  /**
   * 사용자 정보 업데이트 (온보딩 등)
   */
  updateUserInfo: (updates: Partial<UserInfo>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      userInfo: null,

      login: (userInfo) => {
        console.log('✅ 로그인 성공 - 사용자 정보 저장');
        console.log('- memberId:', userInfo.memberId);
        console.log('- status:', userInfo.status);
        
        set({ 
          isLoggedIn: true, 
          userInfo
        });
      },

      logout: () => {
        console.log('🚪 로그아웃 - 스토어 초기화');
        
        set({ isLoggedIn: false, userInfo: null });
        
        // 로컬 스토리지 명시적 삭제
        localStorage.removeItem('auth-storage');
        localStorage.removeItem('learningLanguage');
        localStorage.removeItem('nativeLanguage');
        
        // 쿠키는 백엔드 /auth/logout API에서 삭제
      },

      updateUserInfo: (updates) => {
        console.log('📝 사용자 정보 업데이트:', updates);
        
        set((state) => ({
          userInfo: state.userInfo ? { ...state.userInfo, ...updates } : null
        }));
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      
      // accessToken을 저장하려고 시도하는 것을 방지
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        userInfo: state.userInfo,
        // accessToken은 제외
      }),
    }
  )
);