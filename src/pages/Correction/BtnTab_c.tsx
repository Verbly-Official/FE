import { useState } from "react";
import type { ComponentType, SVGProps } from "react";

import FileIcon from "../../assets/emoji/file.svg?react";
import AIIcon from "../../assets/emoji/ai.svg?react";
import PersonIcon from "../../assets/emoji/person.svg?react";

type BtnTabItem = {
  key: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

type BtnTabProps = {
  onChange?: (key: string) => void; // 선택 값 외부로 전달용 (선택)
  className?: string;
};

const BTN_TABS: BtnTabItem[] = [
  { key: "all", label: "All", Icon: FileIcon },
  { key: "ai", label: "AI Assistant", Icon: AIIcon },
  { key: "native", label: "Native Speakers", Icon: PersonIcon },
];

export default function BtnTab_C({ onChange, className = "" }: BtnTabProps) {
  const [selectedKey, setSelectedKey] = useState("all");

  const handleClick = (key: string) => {
    setSelectedKey(key);
    onChange?.(key);
  };

  return (
    <div className={`flex gap-[8px] ${className}`}>
      {BTN_TABS.map((tab) => {
        const isSelected = selectedKey === tab.key;
        const Icon = tab.Icon;

        return (
          <button
            key={tab.key}
            onClick={() => handleClick(tab.key)}
            className={`inline-flex items-center gap-[6px] px-[14px] py-[8px] rounded-[24px]
        border transition font-pretendard text-[14px] font-semibold
        ${isSelected ? "bg-violet-50 border-violet-50 text-white" : "bg-white border-[#E5E7EB] text-[var(--gray-6-active,#777)]"}`}
          >
            <Icon className="w-[18px] h-[18px]" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
