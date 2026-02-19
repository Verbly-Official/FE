import type { ComponentType, SVGProps } from "react";

import FileIcon from "../../../assets/emoji/file.svg?react";
import AIIcon from "../../../assets/emoji/ai.svg?react";
import PersonIcon from "../../../assets/emoji/person.svg?react";

type BtnTabItem = {
  key: "all" | "ai" | "native";
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

type BtnTabProps = {
  value: "all" | "ai" | "native";
  onChange?: (key: "all" | "ai" | "native") => void;
  className?: string;
};

const BTN_TABS: BtnTabItem[] = [
  { key: "all", label: "All", Icon: FileIcon },
  { key: "ai", label: "AI Assistant", Icon: AIIcon },
  { key: "native", label: "Native Speakers", Icon: PersonIcon },
];

export default function BtnTab_C({ value, onChange, className = "" }: BtnTabProps) {
  return (
    <div className={`flex gap-[8px] ${className}`}>
      {BTN_TABS.map((tab) => {
        const isSelected = value === tab.key;
        const Icon = tab.Icon;

        return (
          <button
            key={tab.key}
            onClick={() => onChange?.(tab.key)}
            className={`
              inline-flex items-center gap-[6px]
              px-[14px] py-[8px] rounded-[24px]
              border transition
              font-pretendard font-semibold
              text-[length:var(--fs-button1)]
              ${isSelected ? "bg-violet-50 border-violet-50 text-white" : "bg-white border-[#E5E7EB] text-[var(--gray-6-active,#777)]"}
            `}
          >
            <Icon className="w-[18px] h-[18px]" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
