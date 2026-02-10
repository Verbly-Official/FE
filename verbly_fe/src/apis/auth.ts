import axios from 'axios'; 
import { instance } from './axios';
import { useAuthStore } from '../store/useAuthStore';
import { type ApiResponse, type UserInfo } from '../types/user';

// 환경 변수 가져오기 (axios.ts와 동일하게 사용)
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/*
 * 토큰 재발급 API
 * 백엔드 엔드포인트: POST /auth/reissue
 */
export const reissueTokenApi = async () => {
  return await axios.post(
    `${BASE_URL}/api/auth/reissue`,
    {},
    { withCredentials: true }
  );
};

/**
 * 내 정보 조회 API
 * 백엔드 엔드포인트: GET /user/me
 */
export const getMyProfileApi = async () => {
  const response = await instance.get<ApiResponse<UserInfo>>('/api/user/me'); 
  return response.data;
};

/**
 * 로그아웃 API (서버 통신용)
 * 백엔드 엔드포인트: POST /auth/logout
 */
export const logoutApi = async () => {
  try {
    const response = await instance.post('/api/auth/logout');
    return response.data;
  } catch (error) {
    console.error('서버 로그아웃 요청 실패:', error);
    throw error;
  }
};

/**
 * 통합 로그아웃 처리 함수
 */
export const handleLogout = async (redirectToLogin: boolean = true) => {
  try {
    await instance.post('/api/auth/logout');
    console.log('✅ 서버 로그아웃 성공');
  } catch (error) {
    console.error('❌ 서버 로그아웃 실패:', error);
  } finally {
    useAuthStore.getState().logout();
    
    if (redirectToLogin) {
      window.location.href = '/login';
    }
  }
};