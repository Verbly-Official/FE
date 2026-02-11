import { api } from "./client";

export type CorrectionStatus = "COMPLETED" | "IN_PROGRESS" | "PENDING";
export type CorrectorType = "AI_ASSISTANT" | "NATIVE_SPEAKER";

export type GetCorrectionsParams = {
  page?: number; // 1-based로 쓰고 있으면 그대로
  size?: number; // optional
  bookmark?: boolean; // 즐겨찾기만 보기
  sort?: boolean; // 최근 항목 (true면 최신순이라는 의미로 가정)
  status?: CorrectionStatus;
  corrector?: CorrectorType;
};

export type CorrectionItem = {
  id: number;
  title: string;
  correctorName?: string; // "AI Assistant" 같은 표시용
  correctorType?: CorrectorType;
  createdAt?: string; // ISO
  status: CorrectionStatus;
  wordCount?: number;
  bookmarked?: boolean;
};

export type PageResponse<T> = {
  items: T[];
  page: number;
  totalPages: number;
  totalElements: number;
};

function normalizePageResponse(raw: any): PageResponse<CorrectionItem> {
  // 케이스0) { isSuccess, result: [...] }
  const d0 = raw?.data ?? raw;
  if (Array.isArray(d0?.result)) {
    return {
      items: d0.result,
      page: 1,
      totalPages: 1,
      totalElements: d0.result.length,
    };
  }

  // 케이스1) { data: { items, page, totalPages, totalElements } }
  const d = d0;
  if (d?.items && typeof d?.totalPages === "number") return d;

  // 케이스2) Spring Pageable: { content, number, totalPages, totalElements }
  if (d?.content && typeof d?.totalPages === "number") {
    return {
      items: d.content,
      page: (d.number ?? 0) + 1,
      totalPages: d.totalPages,
      totalElements: d.totalElements ?? d.totalElementsCount ?? 0,
    };
  }

  // 케이스3) 배열만 오는 경우
  if (Array.isArray(d)) {
    return { items: d, page: 1, totalPages: 1, totalElements: d.length };
  }

  return { items: [], page: 1, totalPages: 1, totalElements: 0 };
}

export async function getCorrections(params: any) {
  const cleaned = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== null));

  const res = await api.get("/api/correction", { params: cleaned });
  return normalizePageResponse(res.data);
}

export async function addCorrectionBookmark(correctionId: number) {
  const res = await api.patch(`/api/correction/${correctionId}/bookmark`);
  return res.data;
}

export async function removeCorrectionBookmark(correctionId: number) {
  const res = await api.delete(`/api/correction/${correctionId}/bookmark`);
  return res.data;
}

export async function getDraftCorrections(params: any) {
  const res = await api.get("/api/temp-posts", {
    params,
  });
  return res.data;
}
