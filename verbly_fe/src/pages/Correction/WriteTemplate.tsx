import React, { useState } from "react";
import SolidButton from "../../components/Button/SolidButton";
import TextArea from "../../components/TextArea/TextArea";
import Chip from "../../components/Chip/Chip";
import AiTemplateSection from "./AITemplate";

const Correction_Template: React.FC = () => {
  const [text, setText] = useState<string>("");

  // Write 스타일과 동일한 입력 상태
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

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

  return (
    <div className="flex w-full">
      {/* 메인 카드 (Title 입력 + Tag 입력) */}
      <div className="flex-4 px-[2.5rem] py-6 border border-r-0 border-[#E5E7EB] bg-[#FBFBFB] items-center">
        {/* Title 입력 */}
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

        {/* Tag 입력 (칩 + 입력창) */}
        <div className="flex items-center gap-2 my-[1.25rem]">
          {/* Label: Figma Subtitle/Medium 20 → fs-subtitle1 + font-medium */}
          <span
            className="
              text-black font-pretendard font-medium shrink-0
              text-[length:var(--fs-subtitle1)]
              leading-[var(--lh-title)]
            "
          >
            Tag:
          </span>

          <div
            className="
              flex items-center gap-2 px-3 h-[44px] w-full
              border border-[#E5E7EB] rounded-[0.5rem] bg-white
              overflow-x-auto overflow-y-hidden
            "
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

        {/* 본문 */}
        <TextArea header="마크다운에디터" value={text} rows={18} onChange={(e) => setText(e.target.value)} maxRows={20} />
      </div>

      {/* AI section */}
      <AiTemplateSection
        title="AI 실시간 템플릿화"
        resultText="변환 결과"
        buttonLabel="템플릿 변환"
        onClickConvert={() => {
          // 변환 로직
        }}
      />
    </div>
  );
};

export default Correction_Template;
