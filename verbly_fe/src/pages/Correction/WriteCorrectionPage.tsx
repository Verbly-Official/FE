import React from "react";
import { useState } from "react";
import GNB from "../../components/Nav/GNB";
import SideMenu from "../../components/Nav/SideMenu";
import SolidButton from "../../components/Button/SolidButton";
import { OutlinedButton } from "../../components/Button";
import Plus from "../../assets/emoji/plus.svg?react";
import Sidebar from "./SideBar";
import { TextField } from "../../components/TextArea/TextField";
import TextArea from "../../components/TextArea/TextArea";

const Correction_Write = () => {
  const [text, setText] = useState("");

  return (
    <div className="min-h-screen">
      {/* 1. GNB */}
      <div className="w-full max-w-[1920px] mx-auto">
        <GNB variant="home" />
      </div>

      {/* 2. 좌측 아이콘바 + 컨텐츠 */}
      <div className="flex w-full max-w-[1920px] mx-auto">
        {/* 가장 왼쪽 사이드바 */}
        <SideMenu variant="small" />

        {/* 컨텐츠 영역 */}
        <div className="flex-1 px-[1.75rem] py-[1.875rem] bg-[#F8FAFC]">
          {" "}
          {/* 28px→1.75rem, 30px→1.875rem */}
          <div className="flex">
            {/* 왼쪽 메뉴 카드 */}
            <div className="w-[278px] h-[940px] px-[1.25rem] py-9 bg-white rounded-l-[0.75rem] border border-r-0 border-[#E5E7EB]">
              {/* 20px→1.25rem, 12px→0.75rem */}
              <SolidButton size="large" className="w-full mb-8">
                <Plus className="w-[18px] h-[18px] text-white" />새 글 작성하기
              </SolidButton>
              <Sidebar />
            </div>

            {/* 메인 카드 */}
            <div className="flex-2 px-[2.5rem] py-6 min-h-[940px] border border-r-0 border-[#E5E7EB] bg-[#FBFBFB] items-center">
              {/* 40px→2.5rem */}
              <div className="text-black font-pretendard text-[1.75rem] font-bold leading-none">Title</div> {/* 28px→1.75rem */}
              <div className="flex items-center gap-2 my-[1.25rem]">
                {" "}
                {/* 8px→gap-2, 20px→1.25rem */}
                <span className="text-black font-pretendard text-[1.25rem] leading-none">Tag: </span> {/* 20px→1.25rem */}
                <TextField placeholder="" />
              </div>
              <TextArea header="마크다운에디터" value={text} rows={18} onChange={(e) => setText(e.target.value)} maxRows={20} />
            </div>

            {/* AI section */}
            <div className="flex flex-1 flex-col px-[2.5rem] py-6 min-w-[30rem] rounded-r-[0.75rem] border border-[#E5E7EB] bg-[#FBF9FF] items-start gap-4">
              {/* 40px→2.5rem, 480px→30rem, 12px→0.75rem */}
              <div className="text-black font-pretendard text-[1.75rem] font-bold leading-none bg-[linear-gradient(90deg,#713DE3_0%,#4F46DD_100%)] bg-clip-text text-transparent">
                AI 도우미 {/* 28px→1.75rem */}
              </div>
              <OutlinedButton variant="assistive" className="w-full justify-start">
                Tone&Manner
              </OutlinedButton>
              <OutlinedButton variant="assistive" className="w-full justify-start">
                수정 제안
              </OutlinedButton>
              <OutlinedButton variant="assistive" className="w-full justify-start">
                추천 표현
              </OutlinedButton>

              <div className="w-full mt-auto">
                <SolidButton className="w-full mb-3">원어민에게 첨삭 요청하기</SolidButton>
                <div className="flex gap-3">
                  <SolidButton variant="secondary" className="flex-1 !h-[60px]">
                    임시저장
                  </SolidButton>
                  <OutlinedButton className="flex-2 !h-[60px]">AI 첨삭하기</OutlinedButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Correction_Write;
