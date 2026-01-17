import React from "react";
import FeatherIcon from "../../assets/emoji/feather-white.svg";

export type GradientButtonSize = "large" | "medium" | "small";
export type GradientButtonInteraction = "normal" | "hovered" | "pressed" | "disabled";

export interface GradientButtonProps {
  size?: GradientButtonSize;
  interaction?: GradientButtonInteraction;
  disabled?: boolean;
  icon?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
}

const SIZE_STYLES: Record<GradientButtonSize, string> = {
  large: "h-[60px] px-[32px] py-[20px] gap-[8px] text-title3-bold24",
  medium: "h-[48px] px-[24px] py-[12px] gap-[4px] text-subtitle6-semi18",
  small: "h-[40px] px-[20px] py-[8px] gap-[4px] text-btn1-semi14",
};

const ICON_SIZE_CLASS: Record<GradientButtonSize, string> = {
  large: "w-[24px] h-[24px]",
  medium: "w-[20px] h-[20px]",
  small: "w-[16px] h-[16px]",
};

const INTERACTION_STYLES: Record<GradientButtonInteraction, string> = {
  // 색 관련 값 유지 (그대로)
  normal: "bg-gradient-to-r from-[#713DE3] to-[#4F46DD] text-white",
  hovered: "text-white shadow-[0_2px_8px_0_rgba(0,0,0,0.20)]",
  pressed: "text-white shadow-[0_2px_8px_0_rgba(0,0,0,0.12)]",
  disabled: "bg-[#E6E6E6] text-gray-6 opacity-50 cursor-not-allowed",
};

// 색 관련 값 유지 (그대로)
const HOVERED_GRADIENT =
  "linear-gradient(0deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.1) 100%), linear-gradient(90deg, #713DE3 0%, #4F46DD 100%)";
const PRESSED_GRADIENT =
  "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(90deg, #713DE3 0%, #4F46DD 100%)";

// normal 상태에서만 적용되는 hover/active 배경 이미지 (색 관련 값 유지 그대로)
const NORMAL_HOVER_ACTIVE_BG =
  "hover:[background-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.1)),linear-gradient(90deg,#713DE3_0%,#4F46DD_100%)] " +
  "active:[background-image:linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(90deg,#713DE3_0%,#4F46DD_100%)]";

export const GradientButton: React.FC<GradientButtonProps> = ({
  size = "large",
  interaction = "normal",
  disabled = false,
  icon = true,
  children,
  onClick,
  ariaLabel,
  className = "",
}) => {
  const effectiveInteraction: GradientButtonInteraction = disabled ? "disabled" : interaction;

  // normal일 때만 hover/active shadow/transition 적용 (색 유지)
  const dynamicClasses =
    effectiveInteraction === "normal"
      ? "hover:shadow-[0_2px_8px_0_rgba(0,0,0,0.20)] active:shadow-[0_2px_8px_0_rgba(0,0,0,0.12)] transition-all duration-200"
      : "";

  // hovered/pressed 강제 상태일 때만 inline background 적용 (색 유지)
  const style: React.CSSProperties | undefined =
    effectiveInteraction === "hovered"
      ? { background: HOVERED_GRADIENT }
      : effectiveInteraction === "pressed"
        ? { background: PRESSED_GRADIENT }
        : undefined;

  const classes = [
    "inline-flex justify-center items-center rounded-[8px]",
    SIZE_STYLES[size],
    INTERACTION_STYLES[effectiveInteraction],
    dynamicClasses,
    effectiveInteraction === "normal" && !disabled ? NORMAL_HOVER_ACTIVE_BG : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      style={style}
      className={classes}
    >
      {icon && (
        <img
          src={FeatherIcon}
          alt=""
          aria-hidden="true"
          className={[
            ICON_SIZE_CLASS[size],
            effectiveInteraction === "disabled" ? "brightness-0 opacity-40" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        />
      )}
      <span>{children}</span>
    </button>
  );
};
