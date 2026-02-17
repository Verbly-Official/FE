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

export const submitNativeCorrection = async (correctionId: number) => {
  const response = await api.post(`/api/correction-native/${correctionId}/submit`);
  return response.data;
};

export type NativeWordEdit = { wordId: number; correctedText: string | null };
export type SaveNativeWordEditsPayload = { edits: NativeWordEdit[] };

export const saveNativeWordEdits = async (correctionId: number, payload: SaveNativeWordEditsPayload) => {
  const { data } = await api.patch(`/api/correction-native/${correctionId}/words`, payload);
  return data;
};
