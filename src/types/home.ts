// src/types/home.ts
import type { ApiResponse } from "./user";

/**
 * 홈 화면 - 현재 로그인한 유저 정보
 * GET /api/home/viewer/info
 */
export interface ViewerInfo {
  imageUrl: string;
  nickname: string;
  following: number;
  streak: number;
  point: number;
  correctionReceived: number;
  level: string; // "LV1"
}

/**
 * 홈 화면 - 선택된 프로필 유저 정보
 * GET /api/home/users/{uuid}
 */
export interface UuserInfo {
  imageUrl: string;
  nickname: string;
  nativeLang: string;
  description: string;
  totalPosts: number;
  follower: number;
  following: number;
  isFollowing: boolean;
  correctionReceived: number;
  correctionGiven: number;
  userId: number; // [수정] API 응답에 필수로 포함된다고 가정
}

/**
 * 홈 유저 정보 API 응답 타입
 */
export type ViewerInfoResponse = ApiResponse<ViewerInfo>;
export type UuserInfoResponse = ApiResponse<UuserInfo>;