import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SolidButton } from "../../../components/Button";
import { TextField } from "../../../components/TextArea/TextField";
import DetailSentence from "../components/DetailSentence";
import RightSentence from "../components/R_SentenceItem";
import { instance } from "../../../apis/axios";

type FeedbackItem = {
  feedbackId?: number;
  content: string;
  sentenceIdx?: number | null;
  createdAt?: string;
  correctorName?: string;
};

type CorrectionNativeDetail = {
  correctionId: number;
  postId: number;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  sentences: { sentenceIdx: number; originalText: string; correctedText: string }[];
  words: {
    wordId: number;
    sentenceIdx: number;
    startIdx: number;
    endIdx: number;
    originalText: string;
    correctedText: string;
  }[];
  feedback: FeedbackItem[];
};

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

  useEffect(() => {
    if (!activeCorrectionId) {
      setErrorMsg("correctionId가 없습니다. 올바른 경로로 접근해주세요.");
      return;
    }

    const run = async () => {
      setLoading(true);
      setErrorMsg(null);

      try {
        const { data } = await instance.get(`/api/correction-native/${activeCorrectionId}`);
        const result = (data?.result ?? null) as CorrectionNativeDetail | null;

        setDetail(result);
        setFeedbacks(result?.feedback ?? []);
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
        const { data: refreshed } = await instance.get(`/api/correction-native/${activeCorrectionId}`);
        const refreshedResult = (refreshed?.result ?? null) as CorrectionNativeDetail | null;
        setFeedbacks(refreshedResult?.feedback ?? []);
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

  return (
    <div className="w-full h-full">
      <div className="flex w-full h-[calc(100vh-64px)] bg-[#F8FAFC]">
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
                <div className="text-sm font-semibold text-[#585858]">Sentence #{s.sentenceIdx + 1}</div>
                <div className="text-xs text-[#8a8a8a] line-clamp-2">{s.originalText}</div>
              </button>
            );
          })}
        </aside>

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
                    onSend={async ({ sentenceIdx, correctedText }) => {
                      console.log("send", sentenceIdx, correctedText);
                    }}
                  />
                );
              })()
            )
          ) : null}
        </main>

        {!isDetailOpen && (
          <aside className="w-[410px] flex-shrink-0 h-full bg-[#F8FAFC] border-l border-[#D9D9D9] flex flex-col">
            <div className="bg-[#F1ECFC] flex p-5 justify-center items-center gap-[10px] w-full">
              <span className="text-black font-pretendard text-[length:var(--fs-title2)] font-semibold leading-none">Comments & Feedback</span>
            </div>

            <div className="flex p-4 justify-between items-center w-full border-b border-[#D9D9D9] bg-white">
              <div className="flex flex-col items-start px-2 py-1 rounded bg-[#D1FAE5]">
                <span className="text-[var(--System-Green-1,#047857)] font-pretendard text-[length:var(--fs-body1)] font-semibold leading-[150%]">{detail?.status ?? "In Progress"}</span>
              </div>
              <SolidButton label="Submit Correction" className="!h-[50px] !p-4" />
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
