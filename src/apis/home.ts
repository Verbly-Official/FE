import instance from "./axios";
import { type UuserInfoResponse, type ViewerInfoResponse } from "../types/home";

export const getViewerInfo = async () => {
  const res = await instance.get<ViewerInfoResponse>("/api/home/viewer/info");
  return res.data.result;
};

export const getUuserInfo = async (uuid: string) => {
  const res = await instance.get<UuserInfoResponse>(`/api/home/users/${uuid}`);
  return res.data.result;
};
