import type { ApiResponse } from "./user";

export interface CommentItemType {
  userImageUrl: string;
  nickname: string;
  uuid: string;
  postId: number;
  content: string;
  createdAt: string;
}

export interface CommentSlice {
  content: CommentItemType[];
  last: boolean;
  number: number;
}

export type CommentSliceResponse = ApiResponse<CommentSlice>;
