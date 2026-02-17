// Correction_NList.tsx (Korean user - Read Only)
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import RightSentence from "../components/R_SentenceItem";
import { instance } from "../../../apis/axios";

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

const normalizeText = (t: string) => (t ?? "").replaceAll("\\n", "\n");

const Correction_ReadOnly = () => {
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

  const selectedSentence = useMemo(() => {
    if (!detail || selectedSentenceIdx === null) return null;
    return detail.sentences.find((x) => x.sentenceIdx === selectedSentenceIdx) ?? null;
  }, [detail, selectedSentenceIdx]);

  const selectedWords = useMemo(() => {
    if (!detail || selectedSentenceIdx === null) return [];
    return (detail.words ?? []).filter((w) => w.sentenceIdx === selectedSentenceIdx);
  }, [detail, selectedSentenceIdx]);

  return (
    <div className="w-full h-full min-h-0">
      <div className="flex w-full h-[calc(100vh-64px)] bg-[#F8FAFC] overflow-hidden">
        {/* ===== Left: Sentences list ===== */}
        <aside className="w-[370px] flex-shrink-0 h-full min-h-0 bg-white border border-[#D9D9D9] overflow-y-auto scrollbar-hide">
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
        <main className="flex-1 min-w-0 h-full min-h-0 overflow-y-auto scrollbar-hide px-10 py-3 gap-[13px]">
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
            ) : selectedSentence ? (
              // ✅ 읽기 전용 상세 뷰
              <div className="flex w-full flex-col items-start gap-5 rounded-[12px] bg-white p-8">
                <span className="text-[#585858] font-pretendard text-[length:var(--fs-title2)] font-medium leading-none">Sentence #{selectedSentence.sentenceIdx + 1}</span>

                <div className="flex p-6 items-center gap-[10px] rounded-[12px] w-full border border-[#D9D9D9] bg-[#FBFBFB]">
                  <p className="whitespace-pre-wrap text-[#585858] font-pretendard text-[length:var(--fs-subtitle2)] font-semibold leading-[150%]">{normalizeText(selectedSentence.originalText)}</p>
                </div>

                <span className="text-[#585858] font-pretendard text-[length:var(--fs-title2)] font-medium leading-none">Corrected Sentence #{selectedSentence.sentenceIdx + 1}</span>

                <div className="flex flex-col p-8 items-start self-stretch gap-4 rounded-[12px] border border-[#D9D9D9] bg-white">
                  <p className="w-full whitespace-pre-wrap text-[#585858] font-pretendard text-[length:var(--fs-subtitle2)] font-semibold leading-[150%]">
                    {normalizeText(selectedSentence.correctedText)}
                  </p>

                  {/* (선택) word 구간 정보도 보여주고 싶으면 */}
                  {selectedWords.length > 0 && (
                    <div className="w-full pt-4 border-t border-[#E5E7EB]">
                      <div className="text-[#9E9E9E] font-pretendard text-[length:var(--fs-body2)] font-semibold">Edited Segments</div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {selectedWords.map((w) => (
                          <span key={w.wordId} className="px-3 py-2 rounded-[10px] border border-[#E5E7EB] bg-[#FBFBFB] text-[#585858] font-pretendard text-[length:var(--fs-body2)]">
                            {w.originalText} → {w.correctedText}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : null
          ) : null}
        </main>

        {/* ===== Right: Feedback panel (hidden when detail open) ===== */}
        {!isDetailOpen && (
          <aside className="w-[410px] flex-shrink-0 h-full min-h-0 bg-[#F8FAFC] border-l border-[#D9D9D9] flex flex-col overflow-hidden">
            <div className="bg-[#F1ECFC] flex p-5 justify-center items-center gap-[10px] w-full shrink-0">
              <span className="text-black font-pretendard text-[length:var(--fs-title2)] font-semibold leading-none">Comments & Feedback</span>
            </div>

            <div className="flex p-4 justify-between items-center w-full border-b border-[#D9D9D9] bg-white shrink-0">
              <div className="flex flex-col items-start px-2 py-1 rounded bg-[#D1FAE5]">
                <span className="text-[var(--System-Green-1,#047857)] font-pretendard text-[length:var(--fs-body1)] font-semibold leading-[150%]">{detail?.status ?? "IN_PROGRESS"}</span>
              </div>

              {/* ✅ 한국 유저용이면 보통 Submit은 숨김. 필요하면 살리기 */}
              {/* <SolidButton label="Submit Correction" className="!h-[50px] !p-4" onClick={handleSubmit} /> */}
            </div>

            {/* 댓글 리스트만 */}
            <div className="flex-1 min-h-0 w-full flex flex-col gap-4 p-4 bg-[#FBFBFB] overflow-y-auto">
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

            {/* ✅ 입력창 제거 (한국 유저는 작성 못하게) */}
            {/* <div className="flex p-6 ..."><TextField ... /></div> */}
          </aside>
        )}
      </div>
    </div>
  );
};

export default Correction_ReadOnly;
