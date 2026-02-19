// Correction_NList.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SolidButton } from "../../../components/Button";
import { TextField } from "../../../components/TextArea/TextField";
import DetailSentence from "../components/DetailSentence";
import RightSentence from "../components/R_SentenceItem";
import { instance } from "../../../apis/axios";
import { submitNativeCorrection, saveNativeWordEdits } from "../../../apis/correctionNative";

type FeedbackItem = {
  feedbackId?: number;
  content: string;
  sentenceIdx?: number | null;
  createdAt?: string;
  correctorName?: string;
};

type CorrectionStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

type SentenceDTO = {
  sentenceIdx: number;
  originalText: string;
  correctedText: string;
};

type WordDTO = {
  wordId: number;
  sentenceIdx: number;
  startIdx: number;
  endIdx: number;
  originalText: string;
  correctedText: string;
};

type CorrectionNativeDetail = {
  correctionId: number;
  postId: number;
  status: CorrectionStatus;
  sentences: SentenceDTO[];
  words: WordDTO[];
  feedback: FeedbackItem[];
};

type WordEdit = { wordId: number; correctedText: string | null };

const Correction_NList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const correctionId = searchParams.get("correctionId");

  const activeCorrectionId = useMemo(() => {
    if (!correctionId) return null;
    const n = Number(correctionId);
    return Number.isNaN(n) ? null : n;
  }, [correctionId]);

  const [detail, setDetail] = useState<CorrectionNativeDetail | null>(null);
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [selectedSentenceIdx, setSelectedSentenceIdx] = useState<number | null>(null);
  const isDetailOpen = selectedSentenceIdx !== null;

  const [activeRightIdx, setActiveRightIdx] = useState<number | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [sending, setSending] = useState(false);

  // wordId 기반 draft edits: wordId -> correctedText (null이면 삭제)
  const [draftEdits, setDraftEdits] = useState<Record<number, string | null>>({});
  const [savingEdits, setSavingEdits] = useState(false);

  const fetchDetail = async (id: number) => {
    const { data } = await instance.get(`/api/correction-native/${id}`);
    const result = (data?.result ?? null) as CorrectionNativeDetail | null;
    setDetail(result);
    setFeedbacks(result?.feedback ?? []);
  };

  useEffect(() => {
    if (!activeCorrectionId) {
      setErrorMsg("correctionId가 없습니다. 올바른 경로로 접근해주세요.");
      return;
    }

    const run = async () => {
      setLoading(true);
      setErrorMsg(null);

      try {
        await fetchDetail(activeCorrectionId);
        setSelectedSentenceIdx(null);
      } catch (e: any) {
        setErrorMsg(e?.response?.data?.message ?? "상세 조회에 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [activeCorrectionId]);

  const formatDate = (iso?: string) => {
    if (!iso) return "";
    const date = new Date(iso);
    return new Intl.DateTimeFormat("ko-KR", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  // 제출 버튼
  const handleSubmit = async () => {
    if (!activeCorrectionId) return;

    try {
      await submitNativeCorrection(activeCorrectionId);
      alert("제출이 완료되었습니다.");
      navigate("/correction/native");

      await fetchDetail(activeCorrectionId);
    } catch (error) {
      console.error(error);
      alert("제출 중 오류가 발생했습니다.");
    }
  };

  // 피드백 전송
  const submitFeedback = async () => {
    if (!activeCorrectionId) return;

    const content = feedbackText.trim();
    if (!content) return;

    setSending(true);
    try {
      const payload: { content: string; sentenceIdx?: number } = { content };
      if (activeRightIdx !== null) payload.sentenceIdx = Number(activeRightIdx);

      const { data } = await instance.post(`/api/correction-native/${activeCorrectionId}/feedback`, payload);

      const newItem = (data?.result ?? data) as FeedbackItem | null;

      if (newItem && typeof newItem === "object" && "content" in newItem) {
        setFeedbacks((prev) => [...prev, newItem]);
      } else {
        await fetchDetail(activeCorrectionId);
      }

      setFeedbackText("");
      setActiveRightIdx(null);
    } catch (e: any) {
      console.error("STATUS:", e?.response?.status);
      console.error("ERROR RESPONSE:", e?.response?.data);
      console.error("ERROR MESSAGE:", e?.message);
    } finally {
      setSending(false);
    }
  };

  const handleEditWord = (wordId: number, correctedText: string | null) => {
    setDraftEdits((prev) => ({ ...prev, [wordId]: correctedText }));
  };

  // 특정 wordId draft 제거(Reset)
  const handleResetWord = (wordId: number) => {
    setDraftEdits((prev) => {
      const next = { ...prev };
      delete next[wordId];
      return next;
    });
  };

  // 택 문장에 해당하는 edits만 저장
  const handleSaveEdits = async ({ sentenceIdx, edits }: { sentenceIdx: number; edits: WordEdit[] }) => {
    if (!activeCorrectionId) return;
    if (!edits?.length) return;

    setSavingEdits(true);
    try {
      const payload = { edits };

      console.log("[saveNativeWordEdits] correctionId:", activeCorrectionId);
      console.log("[saveNativeWordEdits] payload:", payload);
      console.log("[saveNativeWordEdits] payload(JSON):", JSON.stringify(payload, null, 2));

      await saveNativeWordEdits(activeCorrectionId, { edits });

      // 저장 후 상세 재조회(서버 상태로 동기화)
      await fetchDetail(activeCorrectionId);

      // 저장한 wordId들만 draft에서 제거
      setDraftEdits((prev) => {
        const next = { ...prev };
        edits.forEach((e) => delete next[e.wordId]);
        return next;
      });

      // Auto-save to Library
      try {
        const { createLibraryItem } = await import("../../../apis/library");

        const savePromises = edits.map(async (edit) => {
          if (!edit.correctedText) return; // Skip deletions

          // Try to find original text from detail.words
          const originalWord = detail?.words?.find(w => w.wordId === edit.wordId);
          const originalText = originalWord ? originalWord.originalText : "";

          await createLibraryItem({
            phrase: edit.correctedText,
            meaningKo: "원어민 교정", // Placeholder as agreed
            meaningEn: originalText ? `Original: ${originalText}` : "",
          });
        });

        await Promise.allSettled(savePromises);
        console.log("Automatically saved Native edits to Library");

      } catch (saveError) {
        console.error("Failed to auto-save to library:", saveError);
      }

    } catch (e) {
      console.error(e);
      alert("저장에 실패했습니다.");
    } finally {
      setSavingEdits(false);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex w-full h-[calc(100vh-64px)] bg-[#F8FAFC]">
        {/* ===== Left: Sentences list ===== */}
        <aside className="w-[370px] flex-shrink-0 h-full bg-white border border-[#D9D9D9] overflow-y-auto scrollbar-hide">
          <div className="flex p-[24px_30px] flex-col items-start gap-4 w-full border-b border-[#D9D9D9] bg-white">
            <span className="text-[#585858] font-pretendard text-[length:var(--fs-body1)] font-semibold leading-[150%]">SENTENCES ({detail?.sentences?.length ?? 0})</span>
          </div>

          {detail?.sentences?.map((s) => {
            const isActive = selectedSentenceIdx === s.sentenceIdx;

            return (
              <button
                key={s.sentenceIdx}
                className={`w-full text-left p-4 border-b border-[#eee] ${isActive ? "bg-[#F1ECFC]" : "bg-white"}`}
                onClick={() => setSelectedSentenceIdx((prev) => (prev === s.sentenceIdx ? null : s.sentenceIdx))}
              >
                <div className="font-pretendard text-[length:var(--fs-subtitle3)] font-semibold text-[#585858] leading-[150%]">Sentence #{s.sentenceIdx + 1}</div>

                <div className="font-pretendard text-[length:var(--fs-body2)] text-[#8a8a8a] leading-[150%] line-clamp-2">{s.originalText}</div>
              </button>
            );
          })}
        </aside>

        {/* ===== Center: Main content ===== */}
        <main className="flex flex-col min-w-0 h-full overflow-y-auto scrollbar-hide px-10 py-3 gap-[13px] flex-1 relative">
          {loading && <div className="p-4">Loading...</div>}
          {!loading && errorMsg && <div className="p-4 text-red-500">{errorMsg}</div>}

          {!loading && !errorMsg && detail?.sentences?.length ? (
            selectedSentenceIdx === null ? (
              <div className="flex flex-col gap-4">
                {detail.sentences.map((s) => (
                  <RightSentence
                    key={s.sentenceIdx}
                    text={s.originalText}
                    index={s.sentenceIdx}
                    active={activeRightIdx === s.sentenceIdx}
                    onClick={() => setActiveRightIdx((prev) => (prev === s.sentenceIdx ? null : s.sentenceIdx))}
                  />
                ))}
              </div>
            ) : (
              (() => {
                const sentence = detail.sentences.find((x) => x.sentenceIdx === selectedSentenceIdx);
                if (!sentence) return null;

                return (
                  <DetailSentence
                    sentence={sentence}
                    words={detail.words ?? []}
                    draftEdits={draftEdits}
                    onEditWord={handleEditWord}
                    onResetWord={handleResetWord}
                    onSaveEdits={handleSaveEdits}
                    saving={savingEdits}
                  />
                );
              })()
            )
          ) : null}
        </main>

        {/* ===== Right: Feedback panel (hidden when detail open) ===== */}
        {!isDetailOpen && (
          <aside className="w-[410px] flex-shrink-0 h-full bg-[#F8FAFC] border-l border-[#D9D9D9] flex flex-col">
            <div className="bg-[#F1ECFC] flex p-5 justify-center items-center gap-[10px] w-full">
              <span className="text-black font-pretendard text-[length:var(--fs-title2)] font-semibold leading-none">Comments & Feedback</span>
            </div>

            <div className="flex p-4 justify-between items-center w-full border-b border-[#D9D9D9] bg-white">
              <div className="flex flex-col items-start px-2 py-1 rounded bg-[#D1FAE5]">
                <span className="text-[var(--System-Green-1,#047857)] font-pretendard text-[length:var(--fs-body1)] font-semibold leading-[150%]">{detail?.status ?? "IN_PROGRESS"}</span>
              </div>
              <SolidButton label="Submit Correction" className="!h-[50px] !p-4" onClick={handleSubmit} />
            </div>

            <div className="flex-1 w-full flex flex-col gap-4 p-4 bg-[#FBFBFB] overflow-y-auto">
              {feedbacks.map((f, i) => {
                const key = f.feedbackId ?? `${f.sentenceIdx ?? "all"}-${i}`;
                const hasSentence = f.sentenceIdx !== null && f.sentenceIdx !== undefined;

                return (
                  <div key={key} className="w-full">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#EAEAEA]" />
                      <div className="flex-1">
                        <div className="bg-[#F1ECFC] rounded-2xl p-4">
                          <div className="flex items-baseline gap-2">
                            <span className="font-semibold text-[#1F1F1F]">{f.correctorName ?? "Mark"}</span>
                            <span className="text-xs text-[#8a8a8a]">{formatDate(f.createdAt)}</span>
                          </div>
                          <p className="mt-2 text-[#585858]">{f.content}</p>
                        </div>

                        {hasSentence ? (
                          <button className="mt-2 text-[#6D28D9] text-sm" onClick={() => setSelectedSentenceIdx(f.sentenceIdx as number)}>
                            Sentence#{(f.sentenceIdx as number) + 1}
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex p-6 flex-col items-start gap-[10px] w-full border-t border-[#D9D9D9] bg-white">
              <TextField showBtn={true} value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} onSendClick={submitFeedback} disabled={sending} />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default Correction_NList;
