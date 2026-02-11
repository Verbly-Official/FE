import React from "react";
import SolidButton from "../../components/Button/SolidButton";
import TextArea from "../../components/TextArea/TextArea";
import AiIcon from "../../assets/emoji/ai.svg?react";

type AiTemplateSectionProps = {
  title?: string;
  resultText?: string;
  onClickConvert?: () => void;
  buttonLabel?: string;
  className?: string;
  isDisabled?: boolean;
};

const AiTemplateSection: React.FC<AiTemplateSectionProps> = ({
  title = "AI 실시간 템플릿화",
  resultText = "변환 결과",
  onClickConvert,
  buttonLabel = "템플릿화 하기",
  className = "",
  isDisabled = false,
}) => {
  return (
    <div className="flex flex-col min-w-[24rem] px-[2.5rem] py-6 rounded-r-[0.75rem] border border-[#E5E7EB] bg-[#FBF9FF] items-start gap-4">
      <div className="text-black font-pretendard text-[length:var(--fs-title1)] font-bold leading-[var(--lh-title)] bg-[linear-gradient(90deg,#713DE3_0%,#4F46DD_100%)] bg-clip-text text-transparent w-full">
        {title}
      </div>

      <TextArea className="w-full" value={resultText} rows={20} maxRows={20} />
      <SolidButton className="w-full mt-auto" label={buttonLabel} onClick={onClickConvert} disabled={isDisabled} Icon={AiIcon} />
    </div>
  );
};

export default AiTemplateSection;
