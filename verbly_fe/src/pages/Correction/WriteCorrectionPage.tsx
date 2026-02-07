import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../apis/axios";

import GNB from "../../components/Nav/GNB";
import SideMenu from "../../components/Nav/SideMenu";
import SolidButton from "../../components/Button/SolidButton";
import Sidebar from "./SideBar";
import TextArea from "../../components/TextArea/TextArea";
import PlusIcon from "../../assets/emoji/plus.svg?react";
import BtnTabs from "../../components/Tab/BtnTabs";
import WriteIcon from "../../assets/emoji/write.svg";
import TempleteIcon from "../../assets/emoji/template.svg";
import Chip from "../../components/Chip/Chip";
import AiSection from "./AISection";

const Correction_Write = () => {
  const [text, setText] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const navigate = useNavigate();

  const requestNativeCorrection = async () => {
    try {
      // 쿠키 기반이면 Bearer 필요 없음
      const payload = {
        title: title.trim(),
        tags,
        content: text,
        folderId: null,
        templateId: null,
      };

      const res = await instance.post("/api/correction", payload);
      // 성공 후 이동
      navigate("/correction");
    } catch (e: any) {
      // 401이면 로그인 상태 아님(쿠키 없음/만료)
      if (e.response?.status === 401) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }
      console.error(e);
      alert("첨삭 요청 중 오류가 발생했어요.");
    }
  };

  const normalizeTag = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return "";
    const noSpaces = trimmed.replace(/\s+/g, ""); // 중간 공백 제거
    const withoutHash = noSpaces.startsWith("#") ? noSpaces.slice(1) : noSpaces;
    if (!withoutHash) return "";
    return `#${withoutHash}`;
  };

  const addTag = () => {
    const next = normalizeTag(tagInput);
    if (!next) return;

    setTags((prev) => (prev.includes(next) ? prev : [...prev, next]));
    setTagInput("");
  };

  const handleTagKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      addTag();
      return;
    }

    // 입력이 비어있을 때 Backspace로 마지막 태그 삭제
    if (e.key === "Backspace" && tagInput.trim() === "" && tags.length > 0) {
      e.preventDefault();
      setTags((prev) => prev.slice(0, -1));
    }
  };

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
          <div className="flex items-center p-4 h-[72px] w-full rounded-t-[0.75rem] border border-[#E5E7EB] border-b-0 bg-white">
            <BtnTabs btnTabs={["Write", "Template"]} iconSrcs={[WriteIcon, TempleteIcon]} />
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
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full bg-transparent border-none outline-none text-lg md:text-xl lg:text-2xl font-pretendard font-bold leading-none"
              />
              <div className="flex items-center gap-2 my-[1.25rem]">
                <span className="text-black font-pretendard text-[1.25rem] leading-none">Tag:</span>

                {/* 고정 높이 + 가로 스크롤 */}
                <div
                  className="flex items-center gap-2 px-3 h-[44px] w-full border border-[#E5E7EB] rounded-[0.5rem] bg-white overflow-x-auto overflow-y-hidden"
                  onClick={() => {
                    const el = document.getElementById("tag-input");
                    (el as HTMLInputElement | null)?.focus();
                  }}
                >
                  {/* chips는 줄바꿈 없이 한 줄로 */}
                  <div className="flex items-center gap-2 flex-nowrap shrink-0">
                    {tags.map((t) => (
                      <Chip key={t} label={t} />
                    ))}
                  </div>

                  {/* input 높이 고정 */}
                  <input
                    id="tag-input"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    className="h-full min-w-[140px] flex-1 border-none outline-none bg-transparent font-pretendard text-[0.95rem]"
                  />
                </div>
              </div>

              <div className="w-full">
                <TextArea header="마크다운에디터" value={text} rows={18} onChange={(e) => setText(e.target.value)} maxRows={20} maxWidth="" />
              </div>
            </div>

            {/* AI section */}
            <AiSection
              showResult={showResult}
              aiLoading={aiLoading}
              selectedTones={selectedTones}
              setSelectedTones={setSelectedTones}
              onClickRequestNative={requestNativeCorrection}
              onClickAiCorrect={() => {
                setAiLoading(true);

                setTimeout(() => {
                  setAiLoading(false);
                  setShowResult(true);
                }, 800);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Correction_Write;
