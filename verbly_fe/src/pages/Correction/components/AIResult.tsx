import React from "react";
import SolidButton from "../../../components/Button/SolidButton";
import type { AIToolKey } from "./AIMenu";
import { Badge } from "../../../components/Badge/ContentBadge";
import ProgressIndicator from "../../../components/ProgressIndicator/ProgressIndicator";

type Props = {
  loading: boolean;
  tool: AIToolKey | null;
  result: string | null;
  onBack: () => void;

  /** 선택: 결과를 에디터에 적용하는 액션 연결하고 싶을 때 */
  onApply?: () => void;
};

export const RECOMMENDED_EXPRESSIONS = ["Sincerely", "Best regards", "Looking forward to"] as const;

const toolLabel: Record<AIToolKey, string> = {
  tone: "Tone&Manner",
  suggest: "수정 제안",
  phrase: "추천 표현",
};

const StatusBadge = ({ status }: { status: string }) => {
  const getVariantClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "!bg-[var(--System-Orange-2,#FFECD4)] !text-[var(--System-Orange-1,#FFA938)]";
      case "good":
        return "!bg-[var(--System-Green-2,#D1FAE5)] !text-[var(--System-Green-1,#047857)]";
      case "in progress":
        return "!bg-[var(--Point-Blue-90,#E0EBFF)] !text-[var(--point-blue-60-normal,#4F46DD)]";
      default:
        return "!bg-gray-100 !text-gray-800";
    }
  };

  return <Badge content={status} size="small" className={getVariantClass(status)} />;
};

const AIResultPanel: React.FC<Props> = ({ loading, tool, result, onBack, onApply }) => {
  return (
    <div className="w-full flex flex-col h-full gap-4">
      <div className="w-full flex items-center justify-between">
        <div className="text-black font-pretendard text-[1.75rem] font-bold leading-none bg-[linear-gradient(90deg,#713DE3_0%,#4F46DD_100%)] bg-clip-text text-transparent">AI 도우미</div>
      </div>

      {/* Tone&Manner*/}
      <div
        className="flex flex-col h-[189px] p-6 items-start gap-4 self-stretch
            rounded-xl border border-[#D9D9D9] bg-white"
      >
        <div className="flex gap-2">
          <span className="text-[#1F1F1F] font-pretendard text-[20px] font-semibold leading-none">Tone&Manner</span>
          <StatusBadge status="good" />
        </div>
        <div className="w-full">
          <ProgressIndicator variant="linear" value={40} labelLeft="tag1" labelRight="tag2" />
        </div>
        <span className="text-[#1F1F1F] font-pretendard text-[16px] font-semibold leading-[150%]">전반적으로 정중하고 전문적인 어조입니다. 비즈니스 이메일로 적합합니다.</span>
      </div>

      {/* 수정 제안 */}
      <div
        className="flex flex-col h-[189px] p-6 items-start gap-4 self-stretch
            rounded-xl border border-[#D9D9D9] bg-white"
      >
        <span className="text-[#1F1F1F] font-pretendard text-[20px] font-semibold leading-none">수정 제안</span>
        <span className="text-[#EF1111] font-pretendard text-[16px] font-semibold leading-[150%]">I want to apply this job because I like Google very much.</span>
        <Badge
          content="I am applying for this position because I have a strong interest in Google and its work."
          className="!bg-[var(--System-Green-2,#D1FAE5)] !text-[var(--System-Green-1,#047857)] !whitespace-normal !break-words !w-full !justify-start !text-left"
        />
        <span className="text-[#1F1F1F] font-pretendard text-[16px] font-semibold leading-[150%]">더 격식 있는 표현을 사용하는 것이 좋습니다</span>
      </div>

      {/* 추천 표현 */}
      <div
        className="flex flex-col h-[189px] p-6 items-start gap-4 self-stretch
            rounded-xl border border-[#D9D9D9] bg-white"
      >
        <span className="text-[#1F1F1F] font-pretendard text-[20px] font-semibold leading-none">추천 표현</span>
        <div className="flex gap-3">
          {RECOMMENDED_EXPRESSIONS.map((text) => (
            <Badge key={text} content={text} />
          ))}
        </div>
      </div>

      <div className="flex gap-3 mt-auto w-full">
        <SolidButton className="flex flex-1 w-full" variant="secondary" label="임시저장" onClick={onApply} disabled={loading || !onApply} />
        <SolidButton className="flex flex-2 w-full" label="원어민에게 첨삭 요청하기" />
      </div>
    </div>
  );
};

export default AIResultPanel;
