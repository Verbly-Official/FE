import { api } from "./client";

export type CorrectionStatus = "COMPLETED" | "IN_PROGRESS" | "PENDING";
export type CorrectorType = "AI_ASSISTANT" | "NATIVE_SPEAKER";

export type GetCorrectionsParams = {
  page?: number;
  size?: number;
  bookmark?: boolean;
  sort?: boolean;
  status?: CorrectionStatus;
  corrector?: CorrectorType;
};

export type CorrectionItem = {
  correctionId?: number;
  postId?: number;
  title?: string;
  status?: CorrectionStatus;
  bookmark?: boolean;
  correctorType?: CorrectorType | null;
  correctorName?: string | null;
  wordCount?: number;
  relativeTime?: string;
  correctionCreatedAt?: string;
  correctionUpdatedAt?: string;

  id?: number;
  createdAt?: string;
  bookmarked?: boolean;
};

export type PageResponse<T> = {
  items: T[];
  page: number;
  totalPages: number;
  totalElements: number;
};

function normalizePageResponse(raw: any, page?: number, size: number = 10): PageResponse<CorrectionItem> {
  const d0 = raw?.data ?? raw;

  const resultObj = d0?.result;
  if (resultObj && Array.isArray(resultObj?.corrections)) {
    const totalElements = typeof resultObj.total === "number" ? resultObj.total : resultObj.corrections.length;
    const totalPages = Math.max(1, Math.ceil(totalElements / (size || 10)));
    const curPage = typeof page === "number" ? page + 1 : 1;

    return {
      items: resultObj.corrections,
      page: curPage,
      totalPages,
      totalElements,
    };
  }

  if (Array.isArray(d0?.result)) {
    return {
      items: d0.result,
      page: 1,
      totalPages: 1,
      totalElements: d0.result.length,
    };
  }

  const d = d0;
  if (d?.items && typeof d?.totalPages === "number") return d;

  if (d?.content && typeof d?.totalPages === "number") {
    return {
      items: d.content,
      page: (d.number ?? 0) + 1,
      totalPages: d.totalPages,
      totalElements: d.totalElements ?? d.totalElementsCount ?? 0,
    };
  }

  if (Array.isArray(d)) {
    return { items: d, page: 1, totalPages: 1, totalElements: d.length };
  }

  return { items: [], page: 1, totalPages: 1, totalElements: 0 };
}

export async function getCorrections(params: GetCorrectionsParams) {
  const cleaned = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== null));
  const res = await api.get("/api/correction", { params: cleaned });
  return normalizePageResponse(res.data, cleaned.page as number | undefined, (cleaned.size as number | undefined) ?? 10);
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
