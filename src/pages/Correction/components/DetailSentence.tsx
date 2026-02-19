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

type WordEdit = { wordId: number; correctedText: string | null };

interface DetailSentenceProps {
  sentence: SentenceDTO;
  words?: WordDTO[];

  draftEdits: Record<number, string | null>;
  onEditWord: (wordId: number, correctedText: string | null) => void;
  onResetWord: (wordId: number) => void;

  onSaveEdits: (payload: { sentenceIdx: number; edits: WordEdit[] }) => Promise<void> | void;

  saving?: boolean;
  readOnly?: boolean;
}

const normalizeText = (t: string) => (t ?? "").replaceAll("\\n", "\n");

const DetailSentence: React.FC<DetailSentenceProps> = ({ sentence, words = [], draftEdits, onEditWord, onResetWord, onSaveEdits, saving, readOnly = false }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState<"positive" | "cautionary">("positive");

  const sentenceWords = useMemo(() => words.filter((w) => w.sentenceIdx === sentence.sentenceIdx), [words, sentence.sentenceIdx]);
  const [activeWordId, setActiveWordId] = useState<number | null>(null);

  const activeWord = useMemo(() => sentenceWords.find((w) => w.wordId === activeWordId) ?? null, [sentenceWords, activeWordId]);

  const activeValue = useMemo(() => {
    if (!activeWord) return "";

    const draft = draftEdits[activeWord.wordId];
    if (draft === null) return "";
    if (typeof draft === "string") return draft;

    return (activeWord.correctedText ?? activeWord.originalText) as string;
  }, [activeWord, draftEdits]);

  const handleSave = async () => {
    if (readOnly) return;

    try {
      const edits: WordEdit[] = sentenceWords.filter((w) => Object.prototype.hasOwnProperty.call(draftEdits, w.wordId)).map((w) => ({ wordId: w.wordId, correctedText: draftEdits[w.wordId] }));

      if (edits.length === 0) return;

      await onSaveEdits({ sentenceIdx: sentence.sentenceIdx, edits });

      setToastVariant("positive");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (e) {
      setToastVariant("cautionary");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleCancelSentenceDraft = () => {
    if (readOnly) return;
    sentenceWords.forEach((w) => onResetWord(w.wordId));
  };

  return (
    <>
      <div className="flex w-full flex-col items-start gap-5 rounded-[12px] bg-white p-8">
        <span className="text-[#585858] font-pretendard text-[length:var(--fs-title2)] font-medium leading-none">Sentence #{sentence.sentenceIdx + 1}</span>

        <div className="flex p-6 items-center gap-[10px] rounded-[12px] w-full border border-[#D9D9D9] bg-[#FBFBFB]">
          <p className="whitespace-pre-wrap text-[#585858] font-pretendard text-[length:var(--fs-subtitle2)] font-semibold leading-[150%]">{normalizeText(sentence.originalText)}</p>
        </div>

        <span className="text-[#585858] font-pretendard text-[length:var(--fs-title2)] font-medium leading-none">{readOnly ? "Segments" : "Segments (click to edit)"}</span>

        <div className="flex flex-col p-8 items-start self-stretch gap-6 rounded-[12px] border border-[#D9D9D9] bg-white">
          {/* 구간 리스트 */}
          <div className="flex flex-wrap gap-2">
            {sentenceWords.map((w) => {
              const draft = draftEdits[w.wordId];
              const isDeleted = draft === null;
              const isEdited = typeof draft === "string";

              return (
                <button
                  key={w.wordId}
                  type="button"
                  onClick={() => {
                    setActiveWordId(w.wordId);
                  }}
                  className={[
                    "px-3 py-2 rounded-[10px] border text-sm font-pretendard",
                    activeWordId === w.wordId ? "bg-[#F1ECFC] border-[#6D28D9]" : "bg-white border-[#D9D9D9]",
                    isEdited ? "border-[#6D28D9]" : "",
                    isDeleted ? "opacity-60 line-through" : "",
                  ].join(" ")}
                >
                  {w.originalText}
                </button>
              );
            })}
          </div>

          {activeWord && readOnly && (
            <div className="w-full flex flex-col gap-3">
              <div className="text-sm text-[#585858] font-pretendard">
                Selected: <span className="font-semibold">{activeWord.originalText}</span>
              </div>

              <div className="w-full border border-[#D9D9D9] rounded-[10px] px-4 py-3 font-pretendard bg-[#FBFBFB]">
                {activeWord.correctedText ?? <span className="text-[#8a8a8a]">아직 교정이 없습니다.</span>}
              </div>
            </div>
          )}

          {activeWord && !readOnly && (
            <div className="w-full flex flex-col gap-3">
              <div className="text-sm text-[#585858] font-pretendard">
                Selected: <span className="font-semibold">{activeWord.originalText}</span>
              </div>

              <input
                className="w-full border border-[#D9D9D9] rounded-[10px] px-4 py-3 outline-none font-pretendard"
                value={activeValue}
                onChange={(e) => onEditWord(activeWord.wordId, e.target.value)}
                placeholder="수정 텍스트 입력"
              />

              <div className="flex gap-2 justify-end">
                <OutlinedButton label="Reset" className="!h-[46px]" onClick={() => onResetWord(activeWord.wordId)} />
                <OutlinedButton label="Delete" className="!h-[46px]" onClick={() => onEditWord(activeWord.wordId, null)} />
              </div>
            </div>
          )}

          {!readOnly && (
            <div className="flex w-full gap-[10px] justify-end">
              <OutlinedButton label="Cancel" className="!h-[50px]" onClick={handleCancelSentenceDraft} />
              <SolidButton label="Save" Icon={SendIcon} className="!h-[50px]" onClick={handleSave} disabled={saving} />
            </div>
          )}
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
