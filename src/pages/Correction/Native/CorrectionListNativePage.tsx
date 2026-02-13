import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SolidButton } from "../../../components/Button";
import { TextField } from "../../../components/TextArea/TextField";
import DetailSentence from "../components/DetailSentence";
import File from "../../../assets/emoji/file.svg?react";
import { instance } from "../../../apis/axios";

type CorrectionNativeDetail = {
  correctionId: number;
  postId: number;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  sentences: { sentenceIdx: number; originalText: string; correctedText: string }[];
  words: { wordId: number; sentenceIdx: number; startIdx: number; endIdx: number; originalText: string; correctedText: string }[];
  feedback: any[];
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
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 선택된 문장 index
  const [selectedSentenceIdx, setSelectedSentenceIdx] = useState(0);

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
        const result = data?.result ?? null;
        setDetail(result);

        // detail 바뀌면 selectedSentenceIdx 보정
        const len = result?.sentences?.length ?? 0;
        if (len > 0) setSelectedSentenceIdx((prev) => Math.min(prev, len - 1));
        else setSelectedSentenceIdx(0);
      } catch (e: any) {
        setErrorMsg(e?.response?.data?.message ?? "상세 조회에 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [activeCorrectionId]);

  return (
    <div className="w-full h-full">
      <div className="flex w-full h-[calc(100vh-64px)] bg-[#F8FAFC]">
        {/* LEFT */}
        <aside className="w-[370px] flex-shrink-0 h-full bg-white border border-[#D9D9D9] overflow-y-auto scrollbar-hide">
          <div className="flex p-[24px_30px] flex-col items-start gap-4 w-full border-b border-[#D9D9D9] bg-white">
            <span className="text-[#585858] font-pretendard text-[length:var(--fs-body1)] font-semibold leading-[150%]">SENTENCES ({detail?.sentences?.length ?? 0})</span>
          </div>

          {detail?.sentences?.map((s) => (
            <button
              key={s.sentenceIdx}
              className={`w-full text-left p-4 border-b border-[#eee] ${selectedSentenceIdx === s.sentenceIdx ? "bg-[#F1ECFC]" : "bg-white"}`}
              onClick={() => setSelectedSentenceIdx(s.sentenceIdx)}
            >
              <div className="text-sm font-semibold text-[#585858]">Sentence #{s.sentenceIdx + 1}</div>
              <div className="text-xs text-[#8a8a8a] line-clamp-2">{s.originalText}</div>
            </button>
          ))}
        </aside>

        {/* CENTER */}
        <main className="flex flex-col min-w-0 h-full overflow-y-auto scrollbar-hide px-10 py-3 gap-[13px] flex-1 relative">
          {loading && <div className="p-4">Loading...</div>}
          {!loading && errorMsg && <div className="p-4 text-red-500">{errorMsg}</div>}

          {!loading && !errorMsg && detail?.sentences?.length ? (
            <DetailSentence
              sentence={detail.sentences[selectedSentenceIdx]}
              words={detail.words}
              onSend={async ({ sentenceIdx, correctedText }) => {
                console.log("send", sentenceIdx, correctedText);
              }}
            />
          ) : null}

          <div className="absolute bottom-5 right-5 z-10">
            <SolidButton label="Correction List" Icon={File} onClick={() => navigate("/correction/native/list")} />
          </div>
        </main>

        {/* RIGHT */}
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

          <div className="flex-1 w-full flex flex-col items-center gap-8 bg-[#FBFBFB] overflow-y-auto" />

          <div className="flex p-6 flex-col items-start gap-[10px] w-full border-t border-[#D9D9D9] bg-white">
            <TextField showBtn={true} />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Correction_NList;
