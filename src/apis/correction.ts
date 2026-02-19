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

export type CreateCorrectionPayload = {
  title: string;
  content: string;
  tags: string[];
  tempPostId?: number;
};

export async function createCorrection(payload: CreateCorrectionPayload) {
  const { data } = await api.post("/api/correction", payload);
  return data;
}

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

export type PatchCorrectionPayload = {
  title?: string;
  content?: string;
  tags?: string[] | null; // null이면 유지, []면 전체 삭제 (백 명세)
};

export const patchCorrection = async (correctionId: number, payload: PatchCorrectionPayload) => {
  const { data } = await api.patch(`/api/correction/${correctionId}`, payload);
  return data;
};

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

export async function getDraftCorrection(postId: number) {
  const res = await api.get(`/api/temp-posts/${postId}`);
  return res.data;
}

export async function postDraftCorrections(params: any) {
  const res = await api.post(`/api/temp-posts`, params);
  return res.data;
}

export async function removeDraftCorrection(postId: number) {
  const res = await api.delete(`/api/temp-posts/${postId}`);
  return res.data;
}

// api/correction.ts
export type AiCorrectionResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    toneManner?: {
      grade: "GOOD" | "NORMAL" | "BAD";
      casualToFormal: number;
      commentKo: string;
    };
    suggestionCount?: number;
    suggestions?: Array<{
      original: string;
      revised: string;
      reasonKo: string;
    }>;
    recommendedPhrases?: string[];
  };
};

export async function requestAiCorrection(correctionId: number) {
  const { data } = await api.post(`/api/correction/${correctionId}/ai-assist`);

  if (!data.isSuccess) {
    throw new Error(data.message ?? "AI 요청 실패");
  }

  return data;
}
