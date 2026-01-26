import React, { useState, useEffect } from "react";
import { OutlinedButton } from "../../../components/Button";
import { SolidButton } from "../../../components/Button";
import SendIcon from "../../../assets/emoji/send-outlined.svg";
import { Toast } from "../../../components/Toast/Toast";

interface DetailSentenceProps {
  index: number;
  text: string;
}

const DetailSentence: React.FC<DetailSentenceProps> = ({ index, text }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState<"positive" | "cautionary">("positive");

  // Send 버튼 핸들러
  const handleSend = () => {
    // 실제 send 로직...
    console.log("Sending sentence", index);

    setToastVariant("positive");
    setShowToast(true);

    // 3초 후 Toast 사라짐
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Cancel 버튼 핸들러
  const handleCancel = () => {
    console.log("Cancel");
    // 취소 로직...
  };

  return (
    <>
      <div className="flex w-full flex-col items-start gap-5 rounded-[12px] bg-white p-8">
        <span className="text-[#585858] font-pretendard text-2xl font-medium leading-none">Sentence #{index + 1}</span>

        <div className="flex p-6 items-center gap-[10px] rounded-[12px] w-full border border-[#D9D9D9] bg-[#FBFBFB]">
          <p className="text-[#585858] font-pretendard text-base font-semibold leading-[150%]">{text}</p>
        </div>

        <span className="text-[#585858] font-pretendard text-2xl font-medium leading-none">Corrected Sentence #{index + 1}</span>

        <div className="flex flex-col p-8 items-start self-stretch gap-6 rounded-[12px] border border-[#D9D9D9] bg-white">
          <div>
            {" "}
            {/* 수정된 문장 입력 영역 */}
            {/* 여기에 TextField 등 추가 */}
          </div>

          <div className="flex w-full gap-[10px] justify-end">
            <OutlinedButton label="Cancel" className="h-[60px]" onClick={handleCancel} />
            <SolidButton label="Send" iconSrc={SendIcon} className="h-[60px]" onClick={handleSend} />
          </div>
        </div>
      </div>

      {/* Toast 표시 (상단 중앙 고정) */}
      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <Toast variant={toastVariant} message={`Correction file sent!`} />
        </div>
      )}
    </>
  );
};

export default DetailSentence;
