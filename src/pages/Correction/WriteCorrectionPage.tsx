import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../apis/axios";

import TextArea from "../../components/TextArea/TextArea";
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
      const payload = {
        title: title.trim(),
        tags,
        content: text,
        folderId: null,
        templateId: null,
      };

      await instance.post("/api/correction", payload);
      navigate("/correction");
    } catch (e: any) {
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
    const noSpaces = trimmed.replace(/\s+/g, "");
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

  return (
    <div className="flex w-full">
      {/* 메인 카드 */}
      <div className="flex-4 px-[2.5rem] py-6 border border-r-0 border-[#E5E7EB] bg-[#FBFBFB] items-center">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="
            w-full bg-transparent border-none outline-none
            font-pretendard font-bold text-black
            text-[length:var(--fs-title1)]
            leading-[var(--lh-title)]
          "
        />

        <div className="flex items-center gap-2 my-[1.25rem]">
          {/* Figma: Subtitle/Medium 20 → fs-subtitle1 + font-medium */}
          <span
            className="
              text-black font-pretendard font-medium
              text-[length:var(--fs-subtitle1)]
              leading-[var(--lh-title)]
            "
          >
            Tag:
          </span>

          <div
            className="flex items-center gap-2 px-3 h-[44px] w-full border border-[#E5E7EB] rounded-[0.5rem] bg-white overflow-x-auto overflow-y-hidden"
            onClick={() => {
              const el = document.getElementById("tag-input");
              (el as HTMLInputElement | null)?.focus();
            }}
          >
            <div className="flex items-center gap-2 flex-nowrap shrink-0">
              {tags.map((t) => (
                <Chip key={t} label={t} />
              ))}
            </div>

            <input
              id="tag-input"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              className="
                h-full min-w-[140px] flex-1
                border-none outline-none bg-transparent
                font-pretendard text-black
                text-[length:var(--fs-body2)]
                leading-[var(--lh-body)]
              "
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
  );
};

export default Correction_Write;
