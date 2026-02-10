import { api } from './client';
import type { ApiResponse, UserInfo } from '../types/user';

// 팔로우 하기
export const followUser = async (followeeId: number) => {
  const response = await api.post(`/api/following/${followeeId}`);
  return response.data;
};

// 언팔로우 하기
export const unfollowUser = async (followeeId: number) => {
  const response = await api.delete(`/api/following/${followeeId}`);
  return response.data;
};

/**
 * 추천 팔로우 목록 조회
 * GET /following/recommend
 */
export const getRecommendedUsers = async () => {
  const response = await api.get<ApiResponse<UserInfo[]>>('/api/following/recommend');
  return response.data;
};