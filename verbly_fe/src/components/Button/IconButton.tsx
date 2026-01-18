import React from "react";
import PurpleIcon from "../../assets/emoji/checkbox-dashed-purple.svg";
import GrayIcon from "../../assets/emoji/checkbox-dashed-gray.svg";
import RedIcon from "../../assets/emoji/checkbox-dashed-red.svg";

type IconButtonShape = "square" | "round";
type IconButtonSize = "large" | "medium" | "small";
type IconButtonInteraction = "normal" | "hovered" | "pressed" | "disabled" | "error";

interface IconButtonProps {
  shape?: IconButtonShape;
  size?: IconButtonSize;
  interaction?: IconButtonInteraction; // 디자인 시스템 전시용으로 강제 상태 표현 가능
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel: string;
  className?: string;
  iconSrc?: React.FC<React.SVGProps<SVGSVGElement>> | string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  shape = "square",
  size = "large",
  interaction: propInteraction = "normal",
  disabled = false,
  onClick,
  ariaLabel,
  className = "",
  iconSrc: propIconSrc,
}) => {
  // disabled가 true면 interaction은 무조건 disabled로 취급
  const interaction: IconButtonInteraction = disabled ? "disabled" : propInteraction;

  // Size-specific styles (container)
  const sizeStyles: Record<IconButtonSize, string> = {
    large: "w-[60px] h-[60px] p-[12px]",
    medium: "w-[48px] h-[48px] p-[12px]",
    small: "w-[40px] h-[40px] p-[8px]",
  };

 
  const iconSize: Record<IconButtonSize, number> = {
    large: 24,
    medium: 20,
    small: 16,
  };

  // Interaction-specific base styles (강제 상태용)
 
  const forcedInteractionStyles: Record<IconButtonInteraction, string> = {
    normal: "bg-violet-100",
    hovered: "bg-violet-90",
    pressed: "bg-violet-80",
    disabled: "bg-gray-2 border border-line1 cursor-not-allowed",
    error: "bg-gray-1 border border-[#EF1111]",
  };

  // normal일 때만 CSS pseudo로 hover/active 동작하게 (state 없이)
  const normalInteractiveStyles = "hover:bg-violet-90 active:bg-violet-80";


  // - interaction이 normal이면: 기본 bg + hover/active CSS 적용
  // - interaction이 hovered/pressed/error/disabled면: 강제 상태 고정 (hover/active 적용 안 함)
  const interactionClass =
    interaction === "normal"
      ? `${forcedInteractionStyles.normal} ${normalInteractiveStyles}`
      : forcedInteractionStyles[interaction];

  // Icon mapping
  const DefaultIcon =
    {
      normal: PurpleIcon,
      hovered: PurpleIcon,
      pressed: PurpleIcon,
      disabled: GrayIcon,
      error: RedIcon,
    }[interaction] || PurpleIcon;

  const IconContent = propIconSrc || DefaultIcon;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      aria-label={ariaLabel}
      className={`
        flex justify-center items-center aspect-square transition-colors duration-200
        ${shape === "round" ? "rounded-full" : "rounded-[8px]"}
        ${sizeStyles[size]}
        ${interactionClass}
        ${className}
      `}
    >
      {typeof IconContent === "function" ? (
        <IconContent
          width={iconSize[size]}
          height={iconSize[size]}
          aria-hidden="true"
        />
      ) : (
        <img
          src={IconContent as string}
          width={iconSize[size]}
          height={iconSize[size]}
          alt=""
          aria-hidden="true"
          className="object-contain"
        />
      )}
    </button>
  );
};
