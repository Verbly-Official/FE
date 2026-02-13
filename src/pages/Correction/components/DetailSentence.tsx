import React, { useMemo, useState } from "react";
import { OutlinedButton, SolidButton } from "../../../components/Button";
import SendIcon from "../../../assets/emoji/send-outlined.svg?react";
import { Toast } from "../../../components/Toast/Toast";

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

interface DetailSentenceProps {
  sentence: SentenceDTO; // 선택된 문장 하나
  words?: WordDTO[]; // 전체 words (옵션)
  onSend?: (payload: { sentenceIdx: number; correctedText: string }) => Promise<void> | void;
}

const normalizeText = (t: string) => (t ?? "").replaceAll("\\n", "\n");

const DetailSentence: React.FC<DetailSentenceProps> = ({ sentence, words = [], onSend }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState<"positive" | "cautionary">("positive");

  const [edited, setEdited] = useState<string>(() => normalizeText(sentence.correctedText));
  const wordsOfSentence = useMemo(() => words.filter((w) => w.sentenceIdx === sentence.sentenceIdx), [words, sentence.sentenceIdx]);

  const handleSend = async () => {
    try {
      await onSend?.({ sentenceIdx: sentence.sentenceIdx, correctedText: edited });
      setToastVariant("positive");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (e) {
      setToastVariant("cautionary");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleCancel = () => {
    setEdited(normalizeText(sentence.correctedText));
  };

  return (
    <>
      <div className="flex w-full flex-col items-start gap-5 rounded-[12px] bg-white p-8">
        <span className="text-[#585858] font-pretendard text-[length:var(--fs-title1)] font-medium leading-none">Sentence #{sentence.sentenceIdx + 1}</span>

        <div className="flex p-6 items-center gap-[10px] rounded-[12px] w-full border border-[#D9D9D9] bg-[#FBFBFB]">
          <p className="whitespace-pre-wrap text-[#585858] font-pretendard text-[length:var(--fs-subtitle2)] font-semibold leading-[150%]">{normalizeText(sentence.originalText)}</p>
        </div>

        {wordsOfSentence.length > 0 && <div className="w-full text-xs text-[#585858]">Words: {wordsOfSentence.length}</div>}

        <span className="text-[#585858] font-pretendard text-[length:var(--fs-title1)] font-medium leading-none">Corrected Sentence #{sentence.sentenceIdx + 1}</span>

        <div className="flex flex-col p-8 items-start self-stretch gap-6 rounded-[12px] border border-[#D9D9D9] bg-white">
          <textarea
            className="w-full min-h-[140px] resize-none outline-none whitespace-pre-wrap text-[#585858] font-pretendard text-[length:var(--fs-subtitle2)] font-semibold leading-[150%]"
            value={edited}
            onChange={(e) => setEdited(e.target.value)}
            placeholder="Edit corrected sentence..."
          />

          <div className="flex w-full gap-[10px] justify-end">
            <OutlinedButton label="Cancel" className="h-[60px]" onClick={handleCancel} />
            <SolidButton label="Send" Icon={SendIcon} className="h-[60px]" onClick={handleSend} />
          </div>
        </div>
      </div>

      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <Toast variant={toastVariant} message={toastVariant === "positive" ? "Saved!" : "Failed to save"} />
        </div>
      )}
    </>
  );
};

export default DetailSentence;
