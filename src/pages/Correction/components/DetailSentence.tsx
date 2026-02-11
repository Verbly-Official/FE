import React, { useState } from "react";
import { OutlinedButton, SolidButton } from "../../../components/Button";
import SendIcon from "../../../assets/emoji/send-outlined.svg?react";
import { Toast } from "../../../components/Toast/Toast";

interface DetailSentenceProps {
  index: number;
  text: string;
}

const DetailSentence: React.FC<DetailSentenceProps> = ({ index, text }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState<"positive" | "cautionary">("positive");

  const handleSend = () => {
    console.log("Sending sentence", index);
    setToastVariant("positive");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCancel = () => {
    console.log("Cancel");
  };

  return (
    <>
      <div className="flex w-full flex-col items-start gap-5 rounded-[12px] bg-white p-8">
        <span className="text-[#585858] font-pretendard text-[length:var(--fs-title1)] font-medium leading-none">Sentence #{index + 1}</span>

        <div className="flex p-6 items-center gap-[10px] rounded-[12px] w-full border border-[#D9D9D9] bg-[#FBFBFB]">
          <p className="text-[#585858] font-pretendard text-[length:var(--fs-subtitle2)] font-semibold leading-[150%]">{text}</p>
        </div>

        <span className="text-[#585858] font-pretendard text-[length:var(--fs-title1)] font-medium leading-none">Corrected Sentence #{index + 1}</span>

        <div className="flex flex-col p-8 items-start self-stretch gap-6 rounded-[12px] border border-[#D9D9D9] bg-white">
          <div>{/* 수정된 문장 입력 영역 */}</div>

          <div className="flex w-full gap-[10px] justify-end">
            <OutlinedButton label="Cancel" className="h-[60px]" onClick={handleCancel} />
            <SolidButton label="Send" Icon={SendIcon} className="h-[60px]" onClick={handleSend} />
          </div>
        </div>
      </div>

      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <Toast variant={toastVariant} message={`Correction file sent!`} />
        </div>
      )}
    </>
  );
};

export default DetailSentence;
