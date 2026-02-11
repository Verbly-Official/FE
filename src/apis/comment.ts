import instance from "./axios";
import type { CommentSliceResponse } from "../types/comment";

export const getComments = async (
  postId: number,
  page: number,
  size: number = 10
) => {
  const res = await instance.get<CommentSliceResponse>(
    `/api/posts/${postId}/comments`,
    {
      params: {
        page,
        size,
        sort: "createdAt,DESC",
      },
    }
  );

  return res.data.result;
};
