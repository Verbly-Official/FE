import React from "react";

type TextSize = "small" | "medium";
type TextState = "default" | "wrong" | "right" | "suggestion" | "highlight";

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: TextSize;
  state?: TextState;
}

const SIZE_CLASS = {
  small: "text-sm font-semibold leading-[150%]",
  medium: "text-base font-semibold leading-[150%] px-2 py-1 rounded-[4px]",
};

const STATE_CLASS: Record<TextState, string> = {
  default: "text-[var(--Gray-9,#353535)]",

  wrong: "text-[var(--System-Red-1,#EF1111)] font-bold line-through",

  right: "text-[var(--System-Green-1,#047857)]",

  suggestion: `text-[var(--Gray-9,#353535)] 
               underline
               decoration-[#FFB1C4]
               decoration-[1px]
               underline-offset-[4px]`,

  highlight: "text-[var(--Gray-10,#1F1F1F)]",
};

const BG_CLASS: Partial<Record<TextState, string>> = {
  wrong: "bg-[var(--Secondary-Pink-80,#FFF3F6)]",
  right: "bg-[var(--System-Green-2,#D1FAE5)]",
  suggestion: "bg-[var(--Secondary-Pink-80,#FFF3F6)]",
  highlight: "bg-[var(--Main-Violet-90,#EAE2FB)]",
};

export const Text: React.FC<TextProps> = ({ size = "small", state = "default", className = "", children, ...props }) => {
  const showBg = size === "medium" && state !== "default";

  return (
    <span
      {...props}
      className={`
        inline-flex items-center
        ${SIZE_CLASS[size]}
        ${STATE_CLASS[state]}
        ${showBg ? BG_CLASS[state] ?? "" : ""}
        ${className}
      `}
    >
      {children}
    </span>
  );
};
