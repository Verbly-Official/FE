import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getDraftCorrection, patchCorrection } from "../../../apis/correction";
import { instance } from "../../../apis/axios";
import TextArea from "../../../components/TextArea/TextArea";
import SuggestionSlider from "../components/Pagination";
import Chip from "../../../components/Chip/Chip";
import AiSection from "./AISection";
import { ContentBadge } from "../../Library/Review/components/ContentBadge";
import { ProgressIndicator } from "../../../components/ProgressIndicator";

type AiCorrectionResponse = {
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

const WriteCorrectionPage = () => {
  const [text, setText] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [aiData, setAiData] = useState<AiCorrectionResponse | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const draftId = searchParams.get("draftId");
  const isNativeRequestDisabled = !aiData;
  const [correctionId, setCorrectionId] = useState<number | null>(null);

  const ensureCorrectionId = async () => {
    if (correctionId) return correctionId;

    const draftIdParam = searchParams.get("draftId");
    const tempPostId = draftIdParam ? Number(draftIdParam) : null;
    const tagsForApi = tags.map((t) => t.replace(/^#/, ""));

    const createPayload: any = {
      title: title.trim(),
      content: text,
      tags: tagsForApi,
    };
    if (tempPostId) createPayload.tempPostId = tempPostId;

    const created = await instance.post("/api/correction", createPayload);

    const newId = created.data?.result?.correctionId ?? created.data?.result?.id ?? created.data?.correctionId ?? created.data?.id;

    if (!newId) throw new Error("correctionId 없음");

    const numericId = Number(newId);
    setCorrectionId(numericId);
    return numericId;
  };

  const normalizeTag = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return "";
    const noSpaces = trimmed.replace(/\s+/g, "");
    const withoutHash = noSpaces.startsWith("#") ? noSpaces.slice(1) : noSpaces;
    if (!withoutHash) return "";
    return `#${withoutHash}`;
  };

  const addTag = () => {
    const next = normalizeTag(tagInput);
    if (!next) return;
    setTags((prev) => (prev.includes(next) ? prev : [...prev, next]));
    setTagInput("");
  };

  const handleTagKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      addTag();
      return;
    }
    if (e.key === "Backspace" && tagInput.trim() === "" && tags.length > 0) {
      e.preventDefault();
      setTags((prev) => prev.slice(0, -1));
    }
  };

  useEffect(() => {
    const run = async () => {
      if (!draftId) return;
      try {
        const res = await getDraftCorrection(Number(draftId));
        const item = (res as any)?.result ?? res;
        setTitle(item.title ?? "");
        setText(item.content ?? "");
      } catch (e) {
        console.error(e);
        alert("임시저장 글을 불러오지 못했어요.");
      }
    };
    run();
  }, [draftId]);

  const createCorrectionAndGetId = async () => {
    const draftIdParam = searchParams.get("draftId");
    const tempPostId = draftIdParam ? Number(draftIdParam) : null;

    const tagsForApi = tags.map((t) => t.replace(/^#/, ""));

    const createPayload: any = {
      title: title.trim(),
      content: text,
      tags: tagsForApi,
    };
    if (tempPostId) createPayload.tempPostId = tempPostId;

    const created = await instance.post("/api/correction", createPayload);

    const correctionId = created.data?.result?.correctionId ?? created.data?.result?.id ?? created.data?.correctionId ?? created.data?.id;

    if (!correctionId) {
      console.error("create response:", created.data);
      throw new Error("correctionId 없음");
    }
    return { correctionId: Number(correctionId), tagsForApi };
  };

  const requestNativeCorrection = async () => {
    try {
      if (!title.trim()) return alert("제목을 입력해주세요.");
      if (!text.trim()) return alert("내용을 입력해주세요.");

      const id = await ensureCorrectionId();
      const tagsForApi = tags.map((t) => t.replace(/^#/, ""));

      await patchCorrection(id, {
        title: title.trim(),
        content: text,
        tags: tagsForApi,
      });

      navigate("/correction/ko", { state: { showToast: true } });
    } catch (e: any) {
      if (e.response?.status === 401) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }
      console.error(e);
      alert("첨삭 요청 중 오류가 발생했어요.");
    }
  };

  const saveDraft = async () => {
    try {
      const payload = {
        title: title.trim(),
        content: text,
      };

      await instance.post("/api/temp-posts", payload);
      navigate("/correction/draft");
    } catch (e: any) {
      if (e.response?.status === 401) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }
      console.error(e);
      alert("임시저장 중 오류가 발생했어요.");
      navigate("/correction/draft");
    }
  };

  const handleAiCorrect = async () => {
    if (aiLoading) return;

    try {
      setAiLoading(true);
      setAiError(null);
      setShowResult(false);

      const id = await ensureCorrectionId();
      const aiRes = await instance.post(`/api/correction/${id}/ai-assist`);

      if (!aiRes.data?.isSuccess) {
        throw new Error(aiRes.data?.message ?? "AI 첨삭 실패");
      }

      setAiData(aiRes.data);
      setShowResult(true);

      // Auto-save suggestions to Library
      if (aiRes.data.result.suggestions) {
        try {
          // Import dynamically if needed to avoid circular deps or just use top-level import
          const { createLibraryItem } = await import("../../../apis/library");

          const savePromises = aiRes.data.result.suggestions.map(async (suggestion: { revised: string; reasonKo: string; original: string }) => {
            await createLibraryItem({
              phrase: suggestion.revised,
              meaningKo: suggestion.reasonKo,
              meaningEn: suggestion.original,
            });
          });

          await Promise.allSettled(savePromises);
          console.log("Automatically saved AI suggestions to Library");
        } catch (saveError) {
          console.error("Failed to auto-save to library:", saveError);
          // Don't show alert to user as this is a background process
        }
      }
    } catch (e: any) {
      console.error(e);
      setAiError(e?.message ?? "AI 첨삭 요청 중 오류가 발생했어요.");
      setShowResult(true);
    } finally {
      setAiLoading(false);
    }
  };

  const resultNode = useMemo(() => {
    if (aiError) return <div className="text-[length:var(--fs-body2)] text-red-600">{aiError}</div>;
    if (!aiData) return <div className="text-[length:var(--fs-body2)] text-[#6B7280]">결과가 없습니다.</div>;

    const r = aiData.result;

    return (
      <div className="flex flex-col gap-4">
        {r.toneManner && (
          <div className="p-4 rounded-[12px] border border-[#D9D9D9] bg-white">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-[length:var(--fs-title4)]">Tone & Manner</div>
              <div className="text-[length:var(--fs-body2)] font-semibold text-[#1F1F1F]">{r.toneManner.grade}</div>
            </div>

            <ProgressIndicator variant="linear" value={r.toneManner.casualToFormal} />

            <div className="mt-2 text-[length:var(--fs-body2)] text-[#1F1F1F] font-semibold leading-[150%]">격식도: {r.toneManner.casualToFormal}</div>
            <div className="mt-1 text-[length:var(--fs-body2)] text-[#585858] leading-[150%]">{r.toneManner.commentKo}</div>
          </div>
        )}

        {r.suggestions && r.suggestions.length > 0 && <SuggestionSlider suggestions={r.suggestions} />}

        {r.recommendedPhrases && r.recommendedPhrases.length > 0 && (
          <div className="p-4 rounded-[12px] border border-[#D9D9D9] bg-white">
            <div className="font-semibold mb-2 text-[length:var(--fs-title4)]">추천 표현</div>
            <div className="flex flex-wrap gap-2">
              {r.recommendedPhrases.map((phrase, idx) => (
                <ContentBadge key={idx} content={phrase} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }, [aiData, aiError]);

  return (
    <div className="flex w-full">
      {/* 메인 카드 */}
      <div className="flex-4 px-[2rem] py-5 border border-r-0 border-[#E5E7EB] bg-[#FBFBFB] items-center">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full bg-transparent border-none outline-none font-pretendard font-bold text-black text-[length:var(--fs-title1)]"
        />

        <div className="flex items-center gap-2 my-[1.25rem]">
          <span className="text-black font-pretendard font-medium text-[length:var(--fs-subtitle1)]">Tag:</span>

          <div
            className="flex items-center gap-2 px-3 h-[44px] w-full border border-[#E5E7EB] rounded-[0.5rem] bg-white overflow-x-auto overflow-y-hidden"
            onClick={() => {
              const el = document.getElementById("tag-input");
              (el as HTMLInputElement | null)?.focus();
            }}
          >
            <div className="flex items-center gap-2 flex-nowrap shrink-0">
              {tags.map((t) => (
                <Chip key={t} label={t} />
              ))}
            </div>

            <input
              id="tag-input"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              className="h-full min-w-[140px] flex-1 border-none outline-none bg-transparent font-pretendard text-black text-[length:var(--fs-body2)]"
            />
          </div>
        </div>

        <div className="w-full">
          <TextArea header="마크다운에디터" value={text} rows={18} onChange={(e) => setText(e.target.value)} maxRows={20} maxWidth="" />
        </div>
      </div>

      {/* AI section */}
      <AiSection
        showResult={showResult}
        aiLoading={aiLoading}
        onClickRequestNative={requestNativeCorrection}
        onClickAiCorrect={handleAiCorrect}
        onClickTempSave={saveDraft}
        result={resultNode}
        isNativeDisabled={isNativeRequestDisabled}
      />
    </div>
  );
};

export default WriteCorrectionPage;
