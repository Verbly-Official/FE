import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "assistive";
type ButtonSize = "small" | "medium" | "large";
type ButtonInteraction = "normal" | "hovered" | "pressed" | "disabled";

interface SolidButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  error?: boolean;
  interaction?: ButtonInteraction;
  className?: string;
  iconSrc?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: ReactNode;
}

const SIZE_STYLES: Record<ButtonSize, string> = {
  large: "h-[60px] px-[32px] text-[18px] gap-[8px]",
  medium: "h-[48px] px-[24px] text-[16px] gap-[8px]",
  small: "h-[40px] px-[20px] text-[14px] gap-[8px]",
};

const ICON_SIZE_STYLES: Record<ButtonSize, string> = {
  large: "w-auto h-[24px]",
  medium: "w-auto h-[20px]",
  small: "w-auto h-[16px]",
};

// [수정] 기본 상태별 스타일 (Source of Truth)
const STATIC_STYLES: Record<ButtonVariant, Record<ButtonInteraction, string>> = {
  primary: {
    normal: "bg-violet-50 text-white",
    hovered: "bg-violet-40 text-white",
    pressed: "bg-violet-30 text-white",
    disabled: "bg-gray-2 text-gray-4 cursor-not-allowed",
  },
  secondary: {
    normal: "bg-violet-100 text-gray-9",
    hovered: "bg-violet-90 text-gray-9",
    pressed: "bg-violet-80 text-gray-9",
    disabled: "bg-gray-2 text-gray-4 cursor-not-allowed",
  },
  assistive: {
    normal: "bg-gray-1 text-gray-9",
    hovered: "bg-gray-2 text-gray-9",
    pressed: "bg-gray-3 text-gray-9",
    disabled: "bg-gray-2 text-gray-4 cursor-not-allowed",
  },
};

// normal 상태일 때 추가될 인터랙션 클래스
const INTERACTION_PSEUDO_CLASSES: Record<ButtonVariant, string> = {
  primary: "hover:bg-violet-40 active:bg-violet-30",
  secondary: "hover:bg-violet-90 active:bg-violet-80",
  assistive: "hover:bg-gray-2 active:bg-gray-3",
};

export default function SolidButton({
  onClick,
  disabled = false,
  error = false,
  interaction = "normal",
  className = "",
  iconSrc,
  variant = "primary",
  size = "large",
  children
}: SolidButtonProps) {

  const effectiveInteraction: ButtonInteraction = disabled ? "disabled" : interaction;

  // 스타일 계산 로직 간소화
  const getColorStyle = () => {
    if (error) {
      return "bg-gray-1 text-[#EF1111]";
    }

    // 기본적으로 Static 스타일을 사용
    const baseStyle = STATIC_STYLES[variant][effectiveInteraction];
    
    // normal 상태일 때만 hover/active 클래스 추가
    const interactionStyle = effectiveInteraction === "normal" 
      ? INTERACTION_PSEUDO_CLASSES[variant] 
      : "";

    return `${baseStyle} ${interactionStyle}`;
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-pressed={effectiveInteraction === "pressed"}
      className={`
        inline-flex justify-center items-center rounded-[8px]
        font-normal transition-colors duration-200
        ${SIZE_STYLES[size]}
        ${getColorStyle()} 
        ${effectiveInteraction === "normal" ? "cursor-pointer" : ""} 
        ${className}
      `}
    >
      {iconSrc && (
        <img
          src={iconSrc}
          alt="icon"
          className={`${ICON_SIZE_STYLES[size]} object-contain`}
        />
      )}
      {children}
    </button>
  );
}