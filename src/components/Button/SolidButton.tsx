import React from 'react';

type ButtonVariant = "primary" | "secondary" | "assistive";
type ButtonSize = "small" | "medium" | "large";
type ButtonInteraction = "normal" | "hovered" | "pressed" | "disabled";

interface SolidButtonProps {
  onClick?: () => void;
  label?: string;
  disabled?: boolean;
  error?: boolean;
  interaction?: ButtonInteraction;
  className?: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const SIZE_STYLES: Record<ButtonSize, string> = {
  large: "h-[60px] px-[32px] text-[length:var(--fs-subtitle1)] gap-[8px]",
  medium: "h-[48px] px-[24px] text-[length:var(--fs-subtitle2)] gap-[8px]",
  small: "h-[40px] px-[20px] text-[length:var(--fs-body2)] gap-[8px]",
};

const ICON_SIZE_STYLES: Record<ButtonSize, string> = {
  large: "w-auto h-[24px]",
  medium: "w-auto h-[20px]",
  small: "w-auto h-[16px]",
};

const STATIC_STYLES: Record<ButtonVariant, Record<ButtonInteraction, string>> = {
  primary: {
    normal: "bg-violet-50 text-[var(--color-white)]",
    hovered: "bg-violet-40 text-[var(--color-white)]",
    pressed: "bg-violet-30 text-[var(--color-white)]",
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
  Icon, 
  variant = "primary",
  size = "large",
  label,
}: SolidButtonProps) {

  const effectiveInteraction: ButtonInteraction = disabled ? "disabled" : interaction;

  const getColorStyle = () => {
    if (error) {
      return "bg-gray-1 text-pink-20";
    }

    const baseStyle = STATIC_STYLES[variant][effectiveInteraction];
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
      {Icon && (
        <Icon
          className={`${ICON_SIZE_STYLES[size]} fill-current`} 
        />
      )}
      {label && <span>{label}</span>}
    </button>
  );
}