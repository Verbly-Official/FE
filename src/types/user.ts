// src/types/user.ts

/**
 * 사용자 정보 타입 (전체 정보)
 */
export interface UserInfo {
  userId: number;       
  nickname: string;
  profileImage: string;
  email: string;
  bio?: string;        
  phoneNumber?: string; 
  status?: 'NEED_ONBOARDING' | 'ACTIVE' | 'INACTIVE' | string; 
  nativeLang?: string;
  learningLang?: string;

  // 통계/활동 정보
  streakDays: number;
  point: number;
  level: number;
  followCount: number;
  totalPosts: number;
  correctionsGiven: number;
  correctionsReceived: number;
}

/**
 * 프론트엔드 UI용 사용자 모델
 */
export interface User {
  id: string;
  name: string;
  profileImg: string;
  bio: string;
}

/**
 * 로그인 성공 시 응답
 */
export interface LoginResult extends UserInfo {
  accessToken: string;
  refreshToken: string;
}

/**
 * 온보딩 요청 DTO
 */
export interface OnboardingRequest {
  nickname: string;
  profileImage: string;
  nativeLang: string;
  learningLang: string;
}

/**
 * 온보딩 완료 응답 DTO
 */
export interface OnboardingResult {
  accessToken: string;
  refreshToken: string;
  userId: number;
  nickname: string;
  profileImage: string;
  learningLang: string;
  nativeLang: string;
  status: string;
}

/**
 * 프로필 수정 완료 응답 DTO
 * (백엔드가 UserInfo 전체가 아닌 일부 필드만 반환하므로 별도 정의)
 */
export interface UpdateProfileResult {
  userId: number;
  profileImage: string;
  nickname: string;
  bio: string;
  email: string;
  phoneNumber: string;
}

/**
 * 백엔드 API 공통 응답 형식
 */
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

/**
 * 프로필 수정 요청 파라미터
 */
export interface UpdateProfileParams {
  nickname: string;
  bio: string;
  email: string;
  phoneNumber: string;
}