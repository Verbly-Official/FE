import React from "react";
import { useState } from "react";
import GNB from "../../components/Nav/GNB";
import SideMenu from "../../components/Nav/SideMenu";
import SolidButton from "../../components/Button/SolidButton";
import Plus from "../../assets/emoji/plus.svg?react";
import Sidebar from "./SideBar";
import { TextField } from "../../components/TextArea/TextField";
import TextArea from "../../components/TextArea/TextArea";

const Correction_Write = () => {
  return (
    <div className="min-h-screen ">
      {/* 1. GNB */}
      <div className="w-full max-w-[1920px] mx-auto">
        <GNB variant="home" />
      </div>

      {/* 2. 좌측 아이콘바 + 컨텐츠 */}
      <div className="flex w-full max-w-[1920px] mx-auto">
        {/* 가장 왼쪽 사이드바(컴포넌트) */}
        <SideMenu variant="small" />

        {/* 컨텐츠 영역 */}
        <div className="flex-1 px-[28px] py-[30px] bg-[#F8FAFC]">
          <div className="flex">
            {/* 왼쪽 메뉴 카드 */}
            <div className="w-[278px] h-[940px] px-[20px] py-9 bg-white rounded-l-[12px] border border-r-0 border-[#E5E7EB]">
              <SolidButton size="large" className="w-full mb-8">
                <Plus className="w-[18px] h-[18px] text-white" />새 글 작성하기
              </SolidButton>
              <Sidebar />
            </div>

            {/* 메인 카드 */}
            <div className="flex-2 px-[40px] py-6 min-h-[940px] border border-r-0 border-[#E5E7EB] bg-[#FBFBFB] items-center">
              <div className="text-black font-pretendard text-[28px] font-bold leading-none">Title</div>
              <div className="flex items-center gap-[8px] my-[20px]">
                <span className="text-black font-pretendard text-[20px] leading-none">Tag: </span>
                <TextField placeholder="" />
              </div>

              <TextArea header="마크다운에디터" />
            </div>

            {/* AI section */}
            <div className="flex-1 px-[40px] py-6 min-w-[480px] rounded-r-[12px] border border-[#E5E7EB] bg-[#FBF9FF] items-center">
              <div
                className="text-black font-pretendard text-[28px] font-bold leading-none
                bg-[linear-gradient(90deg,#713DE3_0%,#4F46DD_100%)] bg-clip-text text-transparent"
              >
                AI 도우미
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Correction_Write;
