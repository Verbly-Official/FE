import React from "react";
import SolidButton from "../../../components/Button/SolidButton";
import { OutlinedButton } from "../../../components/Button";
import AIIcon from "../../../assets/emoji/ai.svg?react";
import SendIcon from "../../../assets/emoji/send-outlined.svg?react";

type Props = {
  showResult: boolean;
  aiLoading: boolean;

  onClickRequestNative: () => void;
  onClickAiCorrect: () => void;
  onClickTempSave: () => void;

  result?: React.ReactNode;
  className?: string;
  isNativeDisabled?: boolean;
};

const AiSection = ({ showResult, aiLoading, onClickRequestNative, onClickAiCorrect, onClickTempSave, result, isNativeDisabled }: Props) => {
  return (
    <div className="flex flex-col flex-1 min-w-[24rem] px-[2rem] py-5 rounded-r-[0.75rem] border border-[#E5E7EB] bg-[#FBF9FF] items-start gap-4">
      <div className="text-black font-pretendard text-[length:var(--fs-title1)] font-bold leading-[var(--lh-title)] bg-[linear-gradient(90deg,#713DE3_0%,#4F46DD_100%)] bg-clip-text text-transparent w-full">
        AI 도우미
      </div>

      {showResult ? (
        <div className="w-full flex-1">{result ?? <div className="w-full h-full flex items-center justify-center text-sm text-[#6B7280]">AI 결과 영역 (추후 구현)</div>}</div>
      ) : (
        <div className="w-full flex flex-col gap-4">
          <OutlinedButton variant="assistive" className={`w-full justify-start `} label="Tone&Manner" />
          <OutlinedButton variant="assistive" className={`w-full justify-start `} label="수정 제안" />
          <OutlinedButton variant="assistive" className={`w-full justify-start`} label="추천 표현" />
        </div>
      )}

      <div className="w-full mt-auto flex flex-col gap-3">
        <SolidButton className="w-full" label="수정 저장 및 원어민 첨삭 요청" Icon={SendIcon} onClick={onClickRequestNative} disabled={isNativeDisabled} />
        <div className="flex gap-3">
          <SolidButton variant="secondary" className="flex-[1] !h-[60px]" label="임시저장" onClick={onClickTempSave} />
          <OutlinedButton
            className="!h-[60px]"
            label={aiLoading ? "처리 중..." : "AI 첨삭하기"}
            Icon={AIIcon}
            onClick={() => {
              console.log("AI click");
              onClickAiCorrect();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AiSection;
