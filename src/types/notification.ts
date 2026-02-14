import type { ApiResponse } from "./user";

export interface NotiItem {
  id: number;
  content: string;
  url?: string;
  type?: string;
  createdAt: string;
  isRead: boolean;
}

export interface NotiSlice {
  page: number;
  size: number;
  sort: string[];
}

export type NotiResponse = ApiResponse<NotiItem[]>;
