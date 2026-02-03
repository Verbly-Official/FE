// src/apis/auth.ts
import { instance } from './axios';

// 로그아웃 API 요청
export const logoutApi = async () => {
  try {
    // 서버 세션/쿠키 만료 요청
    const response = await instance.post('/auth/logout');
    return response.data;
  } catch (error) {
    console.error('로그아웃 서버 요청 실패 (클라이언트 처리는 계속 진행됨):', error);
    // 서버 요청이 실패하더라도 프론트엔드 로그아웃은 진행되어야 함
    return null;
  }
};