import type { ApiResponse } from "./user";

export interface Trending {
  tagId: number;
  tagName: string;
  count: number;
  ranking: number;
}

export type TrendingResponse = ApiResponse<Trending[]>;
