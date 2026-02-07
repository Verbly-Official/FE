// src/types/user.ts

/**
 * 사용자 정보 타입
 * 백엔드 /user/me API 응답 구조
 * ⚠️ accessToken은 여기에 포함되지 않음 (LoginResult에만 있음)
 */
export interface UserInfo {
  memberId: number;
  nickname: string;
  profileImage: string;
  email: string;
  provider: string;
  status: 'NEED_ONBOARDING' | 'ACTIVE' | 'INACTIVE';
  nativeLang?: string;
  learningLang?: string;
}

/**
 * 로그인 성공 시 백엔드에서 전달받는 JSON 응답 구조
 * OAuth 콜백 URL의 쿼리 파라미터로 accessToken이 전달됨
 * ⚠️ 실제로는 UserInfo + accessToken 형태가 아니라, 
 * URL 파라미터로 accessToken을 받고 API로 UserInfo를 조회함
 */
export interface LoginResult extends UserInfo {
  accessToken: string;
  refreshToken: string;
}

/**
 * 온보딩 요청 DTO
 * 백엔드 POST /user/onboarding 요청 형식
 */
export interface OnboardingRequest {
  nativeLang: string;   // @NotBlank, @Size(max=3)
  learningLang: string; // @NotBlank, @Size(max=3)
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
 * 온보딩 완료 응답 DTO
 */
export interface OnboardingResult {
  memberId: number;
  nativeLang: string;
  learningLang: string;
  status: string;
}
