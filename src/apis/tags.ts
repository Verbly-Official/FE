import instance from "./axios";
import type { TrendingResponse } from "../types/tags";

export const getTrendingTags = async () => {
  const res = await instance.get<TrendingResponse>("/api/tags/trending");

  return res.data.result;
};
