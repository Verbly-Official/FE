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

export interface CreateCommentRequest {
  content: string;
}

export interface CreateCommentResult {
  uuid: string;
  nickname: string;
  userImageUrl: string;
  content: string;
  createdAt: string;
  totalComments: number;
  postId: number;
}

export type CreateCommentResponse = ApiResponse<CreateCommentResult>;
