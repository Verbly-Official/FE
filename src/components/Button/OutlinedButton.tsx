import React from 'react';

type ButtonVariant = "primary" | "secondary" | "assistive";
type ButtonSize = "small" | "medium" | "large";
type ButtonInteraction = "normal" | "hovered" | "pressed" | "disabled";

interface OutlinedButtonProps {
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
    normal: "border border-violet-50 text-violet-50 bg-[var(--color-white)]",
    hovered: "border border-violet-50 text-violet-50 bg-violet-100",
    pressed: "border border-violet-50 text-violet-50 bg-violet-90",
    disabled: "bg-gray-2 text-gray-9 cursor-not-allowed border-none",
  },
  secondary: {
    normal: "border border-line1 text-violet-50 bg-[var(--color-white)]",
    hovered: "border border-line1 text-violet-50 bg-gray-1",
    pressed: "border border-line1 text-violet-50 bg-gray-2",
    disabled: "bg-gray-2 text-gray-9 cursor-not-allowed border-none",
  },
  assistive: {
    normal: "border border-line1 text-gray-9 bg-[var(--color-white)]",
    hovered: "border border-line1 text-gray-9 bg-gray-1",
    pressed: "border border-line1 text-gray-9 bg-gray-2",
    disabled: "bg-gray-2 text-gray-9 cursor-not-allowed border-none",
  },
};

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
  Icon, 
  variant = "primary",
  size = "large",
  label,
}: OutlinedButtonProps) {
  
  const effectiveInteraction: ButtonInteraction = disabled ? "disabled" : interaction;

  const getColorStyle = () => {
    if (error) {
      return "border border-pink-20 bg-gray-1 text-pink-20";
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
        font-medium transition-colors duration-200
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