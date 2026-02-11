import instance from "./axios";
import type { PostSliceResponse } from "../types/post";

export const getPosts = async (page: number, size: number = 10) => {
  const res = await instance.get<PostSliceResponse>("/api/posts", {
    params: {
      page,
      size,
      sort: "createdAt,DESC",
    },
  });

  return res.data.result;
};

export const getHotPosts = async () => {
  const res = await instance.get("/api/posts/hot");
  return res.data.result;
};

export const getUserPosts = async (
  uuid: string,
  page: number,
  size: number = 10
) => {
  const res = await instance.get(`/api/posts/${uuid}`, {
    params: {
      page,
      size,
      sort: "createdAt,DESC",
    },
  });

  return res.data.result;
};
