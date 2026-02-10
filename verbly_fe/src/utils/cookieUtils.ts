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
 * 쿠키를 설정합니다
 */
export const setCookie = (name: string, value: string, options: any = {}) => {
  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
  if (!options.path) {
    options.path = '/';
  }

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
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
 * OAuth 임시 정보 삭제 (토큰 제외)
 */
export const clearOAuthInfoCookies = (): void => {
  const cookiesToClear = [
    'status',
    'userId',
    'provider',
    'nickname',
    'profileImage',
    'email',
  ];
  
  deleteMultipleCookies(cookiesToClear);
  console.log('🗑️ OAuth 정보 쿠키 정리 완료');
};