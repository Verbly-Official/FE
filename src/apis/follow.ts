import { instance } from './axios';
import type { ApiResponse, UserInfo } from '../types/user';

// 팔로우 하기
export const followUser = async (followeeId: string | number) => {
  const response = await instance.post(`/api/following/${followeeId}`, {});
  return response.data;
};

// 언팔로우 하기
export const unfollowUser = async (followeeId: string | number) => {
  const response = await instance.delete(`/api/following/${followeeId}`);
  return response.data;
};

// 추천 팔로우 목록 조회
export const getRecommendedUsers = async () => {
  const response = await instance.get<ApiResponse<UserInfo[]>>('/api/following/recommend');
  return response.data;
};