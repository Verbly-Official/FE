import React from "react";
import { useNavigate } from "react-router-dom";
import SolidButton from "../../components/Button/SolidButton";
import { OutlinedButton } from "../../components/Button";
import AIIcon from "../../assets/emoji/ai.svg?react";
import SendIcon from "../../assets/emoji/send-outlined.svg?react";

type SelectedTones = {
  toneAndManner: boolean;
  suggestion: boolean;
  expression: boolean;
};

type Props = {
  showResult: boolean;
  aiLoading: boolean;

  selectedTones: SelectedTones;
  setSelectedTones: React.Dispatch<React.SetStateAction<SelectedTones>>;

  onClickRequestNative: () => void;
  onClickAiCorrect: () => void;
  onClickTempSave: () => void;

  result?: React.ReactNode;
  className?: string;
};

const AiSection = ({ showResult, aiLoading, selectedTones, setSelectedTones, onClickRequestNative, onClickAiCorrect, onClickTempSave, result }: Props) => {
  const toggleTone = (key: keyof SelectedTones) => {
    setSelectedTones((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col flex-1 min-w-[24rem] px-[2.5rem] py-6 rounded-r-[0.75rem] border border-[#E5E7EB] bg-[#FBF9FF] items-start gap-4">
      <div className="text-black font-pretendard text-[length:var(--fs-title1)] font-bold leading-[var(--lh-title)] bg-[linear-gradient(90deg,#713DE3_0%,#4F46DD_100%)] bg-clip-text text-transparent w-full">
        AI 도우미
      </div>

      {showResult ? (
        <div className="w-full flex-1">{result ?? <div className="w-full h-full flex items-center justify-center text-sm text-[#6B7280]">AI 결과 영역 (추후 구현)</div>}</div>
      ) : (
        <>
          <div className={`w-full flex flex-col gap-4 ${showResult ? "invisible" : ""}`}>
            <OutlinedButton
              variant="assistive"
              className={`w-full justify-start ${selectedTones.toneAndManner ? "!border-[#713DE3]" : ""}`}
              label="Tone&Manner"
              onClick={() => toggleTone("toneAndManner")}
            />
            <OutlinedButton variant="assistive" className={`w-full justify-start ${selectedTones.suggestion ? "!border-[#713DE3]" : ""}`} label="수정 제안" onClick={() => toggleTone("suggestion")} />
            <OutlinedButton variant="assistive" className={`w-full justify-start ${selectedTones.expression ? "!border-[#713DE3]" : ""}`} label="추천 표현" onClick={() => toggleTone("expression")} />
          </div>
        </>
      )}

      <div className="w-full mt-auto flex flex-col gap-3">
        <SolidButton className="w-full" label="원어민에게 첨삭 요청하기" Icon={SendIcon} onClick={onClickRequestNative} />
        <div className="flex gap-3">
          <SolidButton variant="secondary" className="flex-[1] !h-[60px]" label="임시저장" onClick={onClickTempSave} />
          <OutlinedButton className="!h-[60px]" label={aiLoading ? "처리 중..." : "AI 첨삭하기"} Icon={AIIcon} onClick={onClickAiCorrect} />
        </div>
      </div>
    </div>
  );
};

export default AiSection;
