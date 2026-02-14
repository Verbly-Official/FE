import type { NotiItem, NotiResponse } from "../types/notification";
import instance from "./axios";

export const getNoti = async (page: number, size: number) => {
  const res = await instance.get("/api/notifications", {
    params: {
      page,
      size,
      sort: "createdAt,DESC",
    },
  });

  return res.data.result as NotiItem[];
};

export const markAllRead = async (page: number, size: number) => {
  const res = await instance.patch("/api/notifications", null, {
    params: {
      page,
      size,
      sort: "createdAt,DESC",
    },
  });

  return res.data.result as NotiItem[];
};
