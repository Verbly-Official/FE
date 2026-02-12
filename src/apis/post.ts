import instance from "./axios";
import type { PostSliceResponse } from "../types/post";
import type { ApiResponse } from "../types/user";
import axios from "./axios";

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
  size: number = 10,
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

export interface CreatePostRequest {
  content: string;
  publicSetting: boolean;
  tags: string[];
}

export interface CreatePostResult {
  postId: number;
  createdAt: string;
}

export type CreatePostResponse = ApiResponse<CreatePostResult>;

export const createPost = async (body: CreatePostRequest) => {
  const res = await instance.post<CreatePostResponse>("/api/posts/home", body);

  return res.data.result;
};

export const addLike = async (postId: number) => {
  const res = await axios.post(`/api/posts/${postId}/like`);
  return res.data.result;
};

export const removeLike = async (postId: number) => {
  const res = await axios.delete(`/api/posts/${postId}/like`);
  return res.data.result;
};
