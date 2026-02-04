// src/apis/auth.ts
import { instance } from './axios';
import { useAuthStore } from '../store/useAuthStore';
import { type ApiResponse, type UserInfo } from '../types/user';
import { withdrawApi } from './user';

/**
 * 내 정보 조회 API
 * ✅ 쿠키 및 Authorization 헤더 기반 인증
 * 백엔드 엔드포인트: GET /user/me
 */
export const getMyProfileApi = async () => {
  const response = await instance.get<ApiResponse<UserInfo>>('/api/user/me');
  return response.data;
};

/**
 * 로그아웃 API (서버 통신용)
 * 백엔드 엔드포인트: POST /auth/logout
 * - 서버 측의 refreshToken 쿠키 및 세션 제거를 요청합니다.
 */
export const logoutApi = async () => {
  try {
    const response = await instance.post('/auth/logout');
    return response.data;
  } catch (error) {
    console.error('서버 로그아웃 요청 실패:', error);
    throw error;
  }
};

/**
 * 통합 로그아웃 처리 함수
 * - 서버 로그아웃 요청 후, 성공 여부와 관계없이 프론트엔드 상태를 초기화합니다.
 * - HttpOnly 쿠키는 프론트에서 직접 지울 수 없으므로 서버 요청이 필수입니다.
 * 
 * @param redirectToLogin 로그아웃 후 로그인 페이지로 리다이렉트 여부 (기본값: true)
 */
export const handleLogout = async (redirectToLogin: boolean = true) => {
  try {
    // 백엔드의 CookieUtils.clearCookie()가 실행되어 브라우저 쿠키가 삭제됩니다.
    await instance.post('/auth/logout');
    console.log('✅ 서버 로그아웃 성공');
  } catch (error) {
    console.error('❌ 서버 로그아웃 실패:', error);
  } finally {
    // 서버 응답과 관계없이 프론트 상태 초기화
    useAuthStore.getState().logout();
    
    if (redirectToLogin) {
      window.location.href = '/login';
    }
  }
};

/**
 * 회원 탈퇴 처리 함수
 */
export const handleWithdrawal = async () => {
  try {
    // 1. 백엔드에 탈퇴 요청
    await withdrawApi();
    console.log('✅ 회원 탈퇴 성공');
  } catch (error) {
    console.error('❌ 회원 탈퇴 실패:', error);
    alert('회원 탈퇴 처리 중 오류가 발생했습니다.');
    throw error; // 에러를 다시 던져서 호출하는 쪽에서 처리할 수 있게 함
  } finally {
    // 2. 성공 여부와 관계없이 클라이언트 로그아웃 처리
    // (스토어 초기화, 로컬스토리지 삭제, 로그인 페이지 이동)
    useAuthStore.getState().logout();
    window.location.href = '/login';
  }
};