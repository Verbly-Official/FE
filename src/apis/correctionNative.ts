import { api } from "./client";

export async function getNativeCorrections(params: any) {
  const cleaned = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== null));

  const res = await api.get("/api/correction-native", { params: cleaned });
  return res.data;
}

export async function addNativeCorrectionBookmark(correctionId: number) {
  const res = await api.post(`/api/correction-native/${correctionId}/bookmark`);
  return res.data;
}

export async function removeNativeCorrectionBookmark(correctionId: number) {
  const res = await api.delete(`/api/correction-native/${correctionId}/bookmark`);
  return res.data;
}
