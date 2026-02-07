import React, { useState } from "react";
import SolidButton from "../../components/Button/SolidButton";
import { TextField } from "../../components/TextArea/TextField";
import TextArea from "../../components/TextArea/TextArea";

const Correction_Templete: React.FC = () => {
  const [text, setText] = useState<string>("");

  return (
    <>
      {/* 메인 카드 */}
      <div className="flex-2 px-[2.5rem] py-6 min-h-[940px] border border-r-0 border-[#E5E7EB] bg-[#FBFBFB] items-center">
        <div className="text-black font-pretendard text-[1.75rem] font-bold leading-none">Title</div>

        <div className="flex items-center gap-2 my-[1.25rem]">
          <span className="text-black font-pretendard text-[1.25rem] leading-none">Tag:</span>
          <TextField placeholder="" />
        </div>

        <TextArea header="마크다운에디터" value={text} rows={18} onChange={(e) => setText(e.target.value)} maxRows={20} />
      </div>

      {/* AI section */}
      <div className="flex flex-col flex-1 h-full px-[2.5rem] py-6 min-w-[30rem] rounded-r-[0.75rem] border border-[#E5E7EB] bg-[#FBF9FF] gap-4 items-stretch">
        <div className="text-black font-pretendard text-[1.75rem] font-bold leading-none bg-[linear-gradient(90deg,#713DE3_0%,#4F46DD_100%)] bg-clip-text text-transparent w-full">
          AI 실시간 템플릿화
        </div>

        <div className="w-full flex-1">
          <TextArea className="w-full h-full" value="변환 결과" rows={20} maxRows={20} />
        </div>

        <SolidButton className="w-full mt-auto" label="템플릿 변환" />
      </div>
    </>
  );
};

export default Correction_Templete;
