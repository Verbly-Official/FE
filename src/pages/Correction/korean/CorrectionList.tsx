import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import RightSentence from "../components/R_SentenceItem";
import { instance } from "../../../apis/axios";
import DetailSentence from "../components/DetailSentence";

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

type CorrectionDetail = {
  correctionId: number;
  postId: number;
  status: CorrectionStatus;
  sentences: SentenceDTO[];
  words: WordDTO[];
  feedback: FeedbackItem[];
};

const Correction_List = () => {
  const navigate = useNavigate();

  const { correctionId: paramId } = useParams<{ correctionId: string }>();

  const [searchParams] = useSearchParams();
  const queryId = searchParams.get("correctionId");

  const activeCorrectionId = useMemo(() => {
    const raw = paramId ?? queryId;
    if (!raw) return null;
    const n = Number(raw);
    return Number.isNaN(n) ? null : n;
  }, [paramId, queryId]);

  const [detail, setDetail] = useState<CorrectionDetail | null>(null);
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [selectedSentenceIdx, setSelectedSentenceIdx] = useState<number | null>(null);
  const isDetailOpen = selectedSentenceIdx !== null;

  const [activeRightIdx, setActiveRightIdx] = useState<number | null>(null);

  useEffect(() => {
    console.log("paramId/queryId:", { paramId, queryId, activeCorrectionId });
  }, [paramId, queryId, activeCorrectionId]);

  const fetchDetail = async (id: number) => {
    console.log("fetchDetail called with id:", id);
    const { data } = await instance.get(`/api/correction/${id}`);
    const result = (data?.result ?? null) as CorrectionDetail | null;
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
    return detail.sentences.find((s) => s.sentenceIdx === selectedSentenceIdx) ?? null;
  }, [detail, selectedSentenceIdx]);

  return (
    <div className="w-full h-full">
      <div className="flex w-full h-[calc(100vh-64px)] bg-[#F8FAFC]">
        {/* Left */}
        <aside className="w-[370px] flex-shrink-0 h-full bg-white border border-[#D9D9D9] overflow-y-auto no-scrollbar">
          <div className="flex p-[24px_30px] flex-col items-start gap-2 w-full border-b border-[#D9D9D9] bg-white">
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

        {/* Center */}
        <main className="flex flex-col min-w-0 h-full overflow-y-auto no-scrollbar px-10 py-3 gap-[13px] flex-1">
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
              <DetailSentence
                sentence={selectedSentence}
                words={detail.words ?? []}
                draftEdits={{}} // 유저는 편집 안 하니까
                onEditWord={() => {}}
                onResetWord={() => {}}
                onSaveEdits={() => {}}
                saving={false}
                readOnly={true}
              />
            ) : null
          ) : null}
        </main>

        {/* Right */}
        {!isDetailOpen && (
          <aside className="w-[410px] flex-shrink-0 h-full bg-[#F8FAFC] border-l border-[#D9D9D9] flex flex-col overflow-y-auto no-scrollbar">
            <div className="bg-[#F1ECFC] flex p-5 justify-center items-center gap-[10px] w-full">
              <span className="text-black font-pretendard text-[length:var(--fs-title2)] font-semibold leading-none">Comments & Feedback</span>
            </div>

            <div className="flex p-4 justify-between items-center w-full border-b border-[#D9D9D9] bg-white">
              <div className="flex flex-col items-start px-2 py-1 rounded bg-[#D1FAE5]">
                <span className="text-[var(--System-Green-1,#047857)] font-pretendard text-[length:var(--fs-body1)] font-semibold leading-[150%]">{detail?.status ?? "IN_PROGRESS"}</span>
              </div>

              <button className="text-sm text-[#6D28D9] font-semibold" onClick={() => navigate("/correction/ko")}>
                Back to List
              </button>
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
                            <span className="font-semibold text-[#1F1F1F]">{f.correctorName ?? "Corrector"}</span>
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
          </aside>
        )}
      </div>
    </div>
  );
};

export default Correction_List;
