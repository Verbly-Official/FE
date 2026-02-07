// src/utils/cookieUtils.ts

/**
 * 쿠키에서 특정 키의 값을 가져옵니다
 */
export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift();
    return cookieValue ? decodeURIComponent(cookieValue) : null;
  }
  return null;
};

/**
 * 특정 쿠키를 삭제합니다
 */
export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

/**
 * 여러 쿠키를 한 번에 삭제합니다
 */
export const deleteMultipleCookies = (names: string[]): void => {
  names.forEach((name) => deleteCookie(name));
};

/**
 * 백엔드가 설정한 OAuth 관련 쿠키들을 정리합니다
 * 참고: accessToken, refreshToken은 HttpOnly이므로 프론트에서 삭제 불가
 *       백엔드의 /auth/logout API에서 삭제 처리
 */
export const clearOAuthInfoCookies = (): void => {
  const cookiesToClear = [
    'status',      // 백엔드가 설정한 사용자 상태
    'userId',      // 백엔드가 설정한 사용자 ID
    'provider',    // OAuth 제공자
    'nickname',    // 사용자 닉네임
    'profileImage',// 프로필 이미지
    'email',       // 이메일
  ];
  
  deleteMultipleCookies(cookiesToClear);
  console.log('🗑️ OAuth 정보 쿠키 정리 완료');
};