// AIHelperMenu.tsx
import React from "react";
import SolidButton from "../../../components/Button/SolidButton";
import { OutlinedButton } from "../../../components/Button";

export type AIToolKey = "tone" | "suggest" | "phrase";

type Props = {
  aiLoading: boolean;
  onSelectTool: (tool: AIToolKey) => void;
  onRunAI: () => void;
  onGoNative: () => void;
};

const AIHelperMenu: React.FC<Props> = ({ aiLoading, onSelectTool, onRunAI, onGoNative }) => {
  return (
    <>
      {/* 상단 영역 */}
      <div className="w-full">
        <div className="text-black font-pretendard text-[1.75rem] font-bold leading-none bg-[linear-gradient(90deg,#713DE3_0%,#4F46DD_100%)] bg-clip-text text-transparent">AI 도우미</div>

        <div className="mt-4 w-full flex flex-col gap-4">
          <OutlinedButton variant="assistive" className="w-full justify-start" label="Tone&Manner" onClick={() => onSelectTool("tone")} />
          <OutlinedButton variant="assistive" className="w-full justify-start" label="수정 제안" onClick={() => onSelectTool("suggest")} />
          <OutlinedButton variant="assistive" className="w-full justify-start" label="추천 표현" onClick={() => onSelectTool("phrase")} />
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div className="w-full mt-auto">
        <SolidButton className="w-full mb-3" label="원어민에게 첨삭 요청하기" onClick={onGoNative} />

        <div className="flex gap-3">
          <SolidButton variant="secondary" className="flex-1 !h-[60px]" label="임시저장" />
          <OutlinedButton className="flex-2 !h-[60px]" label={aiLoading ? "처리 중..." : "AI 첨삭하기"} onClick={onRunAI} disabled={aiLoading} />
        </div>
      </div>
    </>
  );
};

export default AIHelperMenu;
