import type { ApiResponse } from "./user";

export interface PostItem {
  userImageUrl: string;
  nickname: string;
  isFollowing: boolean;
  uuid: string;
  userIdId: number;
  postId: number;
  content: string;
  status: "PENDING" | "COMPLETED" | string;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  tags: string[];
  isLiked: boolean;
}

export interface PostSlice {
  content: PostItem[];
  last: boolean;
  number: number; // 현재 페이지
  size: number;
}

export type PostSliceResponse = ApiResponse<PostSlice>;
