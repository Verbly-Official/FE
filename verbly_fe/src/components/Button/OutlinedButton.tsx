import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "assistive";
type ButtonSize = "small" | "medium" | "large";
type ButtonInteraction = "normal" | "hovered" | "pressed" | "disabled";

interface OutlinedButtonProps {
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
  large: "h-[60px] px-[20px] py-[32px] text-[18px] gap-[8px]",
  medium: "h-[48px] px-[12px] py-[24px] text-[16px] gap-[8px]",
  small: "h-[40px] px-[8px] py-[20px] text-[14px] gap-[8px]",
};

const ICON_SIZE_STYLES: Record<ButtonSize, string> = {
  large: "w-auto h-[24px]",
  medium: "w-auto h-[20px]",
  small: "w-auto h-[16px]",
};

// [수정] 기본 상태별 스타일 통합
const STATIC_STYLES: Record<ButtonVariant, Record<ButtonInteraction, string>> = {
  primary: {
    normal: "border border-violet-50 text-violet-50 bg-white",
    hovered: "border border-violet-50 text-violet-50 bg-violet-100",
    pressed: "border border-violet-50 text-violet-50 bg-violet-90",
    disabled: "bg-gray-2 text-gray-9 cursor-not-allowed border-none",
  },
  secondary: {
    normal: "border border-[#D9D9D9] text-violet-50 bg-white",
    hovered: "border border-[#D9D9D9] text-violet-50 bg-gray-1",
    pressed: "border border-[#D9D9D9] text-violet-50 bg-gray-2",
    disabled: "bg-gray-2 text-gray-9 cursor-not-allowed border-none",
  },
  assistive: {
    normal: "border border-[#D9D9D9] text-gray-9 bg-white",
    hovered: "border border-[#D9D9D9] text-gray-9 bg-gray-1",
    pressed: "border border-[#D9D9D9] text-gray-9 bg-gray-2",
    disabled: "bg-gray-2 text-gray-9 cursor-not-allowed border-none",
  },
};

// normal 상태 인터랙션 클래스
const INTERACTION_PSEUDO_CLASSES: Record<ButtonVariant, string> = {
  primary: "hover:bg-violet-100 active:bg-violet-90",
  secondary: "hover:bg-gray-1 active:bg-gray-2",
  assistive: "hover:bg-gray-1 active:bg-gray-2",
};

export default function OutlinedButton({
  onClick,
  disabled = false,
  error = false,
  interaction = "normal",
  className = "",
  iconSrc,
  variant = "primary",
  size = "large",
  children,
}: OutlinedButtonProps) {
  
  const effectiveInteraction: ButtonInteraction = disabled ? "disabled" : interaction;

  const getColorStyle = () => {
    if (error) {
      return "border border-[#EF1111] bg-gray-1 text-[#EF1111]";
    }
    
    // Static 스타일을 기본으로 사용
    const baseStyle = STATIC_STYLES[variant][effectiveInteraction];
    
    // normal 상태일 때만 hover/active 클래스 결합
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
        font-medium transition-colors duration-200
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