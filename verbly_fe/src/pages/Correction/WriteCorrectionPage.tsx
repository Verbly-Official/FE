import React, { useState } from "react";
import GNB from "../../components/Nav/GNB";
import SideMenu from "../../components/Nav/SideMenu";
import SolidButton from "../../components/Button/SolidButton";
import { OutlinedButton } from "../../components/Button";
import Sidebar from "./SideBar";
import { TextField } from "../../components/TextArea/TextField";
import TextArea from "../../components/TextArea/TextArea";
import PlusIcon from "../../assets/emoji/plus.svg?react";
import BtnTabs from "../../components/Tab/BtnTabs";

const Correction_Write = () => {
  const [text, setText] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [activeMode, setActiveMode] = useState<"write" | "template">("write");

  const [selectedTones, setSelectedTones] = useState({
    toneAndManner: false,
    suggestion: false,
    expression: false,
  });

  const isAnySelected = Object.values(selectedTones).some((v) => v);

  return (
    <div className="min-h-screen">
      {/* 1. GNB */}
      <div className="w-full max-w-[1920px] mx-auto">
        <GNB variant="home" />
      </div>

      {/* 2. 좌측 아이콘바 + 컨텐츠 */}
      <div className="flex w-full max-w-[1920px] mx-auto">
        <SideMenu variant="small" />

        {/* 컨텐츠 영역 */}
        <div className="flex-1 px-[1.75rem] py-[1.875rem] bg-[#F8FAFC]">
          {/* 버튼 탭 영역 (상단만 둥글게) */}
          <div className="h-[72px] w-full rounded-t-[0.75rem] border border-[#E5E7EB] border-b-0 bg-white">
            <BtnTabs btnTabs={["Write", "Template"]} />
          </div>

          {/* 좌우 3개 카드 영역 - 모니터 높이에 맞춰 자동 확장 */}
          <div className="flex">
            {/* 왼쪽 메뉴 카드 */}
            <div className="w-[200px] flex-1 px-[1.25rem] py-9 bg-white border border-r-0 border-[#E5E7EB]">
              <SolidButton size="large" className="w-full mb-8" Icon={PlusIcon} label="새 글 작성하기" />
              <Sidebar locale="ko" />
            </div>

            {/* 메인 카드 */}
            <div className="flex-4 px-[2.5rem] py-6 border border-r-0 border-[#E5E7EB] bg-[#FBFBFB] items-center">
              <div className="text-lg md:text-xl lg:text-2xl font-pretendard font-bold leading-none">Title</div>

              <div className="flex items-center gap-2 my-[1.25rem]">
                <span className="text-black font-pretendard text-[1.25rem] leading-none">Tag:</span>
                <TextField placeholder="" />
              </div>

              <div className="w-full">
                <TextArea header="마크다운에디터" value={text} rows={18} onChange={(e) => setText(e.target.value)} maxRows={20} maxWidth="" />
              </div>
            </div>

            {/* AI section */}
            <div className="flex flex-col flex-1.5 px-[2.5rem] py-6 rounded-r-[0.75rem] border border-[#E5E7EB] bg-[#FBF9FF] items-start gap-4">
              <div className="text-black font-pretendard text-[1.75rem] font-bold leading-none bg-[linear-gradient(90deg,#713DE3_0%,#4F46DD_100%)] bg-clip-text text-transparent">AI 도우미</div>

              {/* 세 버튼 - 토글 */}
              {!showResult && (
                <div className="w-full flex flex-col gap-4">
                  <OutlinedButton variant="assistive" className={`w-full justify-start`} label="Tone&Manner" />
                  <OutlinedButton variant="assistive" className={`w-full justify-start`} label="수정 제안" />
                  <OutlinedButton variant="assistive" className={`w-full justify-start`} label="추천 표현" />
                </div>
              )}

              {/* AI 결과 표시 - 추후 추가 */}

              {!showResult && (
                <div className="w-full mt-auto">
                  <SolidButton className="w-full mb-3" label="원어민에게 첨삭 요청하기" />

                  <div className="flex gap-3">
                    <SolidButton variant="secondary" className="flex-1 !h-[60px]" label="임시저장" />

                    <OutlinedButton className="flex-1 !h-[60px]" label={aiLoading ? "처리 중..." : "AI 첨삭하기"} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Correction_Write;
