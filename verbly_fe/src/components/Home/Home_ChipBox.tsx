import { useState } from "react";
import Chip from "../Chip/Chip";

export default function Home_ChipBox() {
  const [chips, setChips] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;

    const value = inputValue.trim();
    if (!value || chips.includes(value)) return;

    setChips([...chips, value]);
    setInputValue("");
  }

  function removeChip(index: number) {
    setChips(chips.filter((_, i) => i !== index));
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
          {chips.map((chip, index) => (
            <Chip
              key={chip}
              label={`${chip}`}
              onRemove={() => removeChip(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
