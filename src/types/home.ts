// src/types/home.ts

import type { ApiResponse } from "./user";

/**
 * 홈 화면 - 현재 로그인한 유저 정보
 * GET /api/home/viewer/info
 */
export interface ViewerInfo {
  userId: number;
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
  userId: number;
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
}

/**
 * 홈 유저 정보 API 응답 타입
 */
export type ViewerInfoResponse = ApiResponse<ViewerInfo>;
export type UuserInfoResponse = ApiResponse<UuserInfo>;
