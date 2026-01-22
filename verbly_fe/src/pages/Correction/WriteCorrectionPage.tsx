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
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [showResult, setShowResult] = useState(false);

  // 세 버튼 선택 상태
  const [selectedTones, setSelectedTones] = useState({
    toneAndManner: false,
    suggestion: false,
    expression: false,
  });

  // 토글 함수
  const toggleTone = (tone: keyof typeof selectedTones) => {
    setSelectedTones((prev) => ({
      ...prev,
      [tone]: !prev[tone],
    }));
  };

  // 하나라도 선택됐는지 확인
  const isAnySelected = Object.values(selectedTones).some((v) => v);

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
        <div className="flex-1 px-[1.75rem] py-[1.875rem] bg-[#F8FAFC]">
          {/* 버튼 탭 영역 */}
          <div className="h-[72px] w-full rounded-t-[0.75rem] border border-[#E5E7EB] border-b-0 bg-white" />

          <div className="flex">
            {/* 왼쪽 메뉴 카드 */}
            <div className="w-[278px] h-[940px] px-[1.25rem] py-9 bg-white border border-r-0 border-[#E5E7EB]">
              <SolidButton size="large" className="w-full mb-8">
                <Plus className="w-[18px] h-[18px] text-white" />새 글 작성하기
              </SolidButton>
              <Sidebar />
            </div>

            {/* 메인 카드 */}
            <div className="flex-2 px-[2.5rem] py-6 min-h-[940px] border border-r-0 border-[#E5E7EB] bg-[#FBFBFB] items-center">
              <div className="text-black font-pretendard text-[1.75rem] font-bold leading-none">Title</div>
              <div className="flex items-center gap-2 my-[1.25rem]">
                <span className="text-black font-pretendard text-[1.25rem] leading-none">Tag: </span>
                <TextField placeholder="" />
              </div>
              <TextArea header="마크다운에디터" value={text} rows={18} onChange={(e) => setText(e.target.value)} maxRows={20} />
            </div>

            {/* AI section - 수정됨 */}
            <div className="flex flex-col flex-1 px-[2.5rem] py-6 min-w-[30rem] rounded-r-[0.75rem] border border-[#E5E7EB] bg-[#FBF9FF] items-start gap-4">
              <div className="text-black font-pretendard text-[1.75rem] font-bold leading-none bg-[linear-gradient(90deg,#713DE3_0%,#4F46DD_100%)] bg-clip-text text-transparent">AI 도우미</div>

              {/* 세 버튼 - 토글 추가 */}
              {!showResult && (
                <div className="w-full flex flex-col gap-4">
                  <OutlinedButton
                    variant="assistive"
                    className={`w-full justify-start ${selectedTones.toneAndManner ? "bg-violet-100 text-violet-50" : ""}`}
                    onClick={() => toggleTone("toneAndManner")}
                  >
                    Tone&Manner
                  </OutlinedButton>

                  <OutlinedButton variant="assistive" className={`w-full justify-start ${selectedTones.suggestion ? "bg-violet-100 text-violet-50" : ""}`} onClick={() => toggleTone("suggestion")}>
                    수정 제안
                  </OutlinedButton>

                  <OutlinedButton variant="assistive" className={`w-full justify-start ${selectedTones.expression ? "bg-violet-100 text-violet-50" : ""}`} onClick={() => toggleTone("expression")}>
                    추천 표현
                  </OutlinedButton>
                </div>
              )}

              {/* AI 결과 표시 - AIFeedbackResult 추가예정 */}

              {!showResult && (
                <div className="w-full mt-auto">
                  <SolidButton className="w-full mb-3">원어민에게 첨삭 요청하기</SolidButton>
                  <div className="flex gap-3">
                    <SolidButton variant="secondary" className="flex-1 !h-[60px]">
                      임시저장
                    </SolidButton>
                    <OutlinedButton className="flex-2 !h-[60px]" disabled={!isAnySelected || aiLoading}>
                      {aiLoading ? "처리 중..." : "AI 첨삭하기"}
                    </OutlinedButton>
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
