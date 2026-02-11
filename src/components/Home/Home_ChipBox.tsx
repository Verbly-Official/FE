import { useState } from "react";
import Chip from "../Chip/Chip";

interface HomeChipBoxProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function Home_ChipBox({ tags, setTags }: HomeChipBoxProps) {
  const [inputValue, setInputValue] = useState("");

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;

    const value = inputValue.trim();
    if (!value || tags.includes(value)) return;

    setTags((prev) => [...prev, value]);
    setInputValue("");
  }

  function removeChip(index: number) {
    setTags((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="flex min-w-[220px] h-[48px] px-[12px] py-[8px] rounded-[8px] border-[1px] border-line1 bg-white overflow-hidden">
      <div className="w-full flex flex-row justify-center">
        <input
          id="tag"
          placeholder="#tag"
          onKeyDown={handleKeyDown}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          className="flex-1 min-w-[80px] h-full outline-none placeholder:text-gray-400"
        />
        <div className="flex flex-1 flex-row gap-[4px]">
          {/* Chip Elements */}
          {tags.map((tag, index) => (
            <Chip
              key={tag}
              label={`${tag}`}
              onRemove={() => removeChip(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
