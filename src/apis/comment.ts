import instance from "./axios";
import type {
  CommentSliceResponse,
  CreateCommentRequest,
  CreateCommentResponse,
} from "../types/comment";

export const getComments = async (
  postId: number,
  page: number,
  size: number = 10,
) => {
  const res = await instance.get<CommentSliceResponse>(
    `/api/posts/${postId}/comments`,
    {
      params: {
        page,
        size,
        sort: "createdAt,DESC",
      },
    },
  );

  return res.data.result;
};

export const createComment = async (
  postId: number,
  body: CreateCommentRequest,
) => {
  const res = await instance.post<CreateCommentResponse>(
    `/api/posts/${postId}/comments`,
    body,
  );
  return res.data.result;
};
