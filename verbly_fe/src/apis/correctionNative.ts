import { api } from "./client";

export async function getNativeCorrections(params: any) {
  // undefined/null 제거(안전)
  const cleaned = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== null));

  const res = await api.get("/api/correction-native", { params: cleaned });
  return res.data;
}
