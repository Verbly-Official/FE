import React from "react";
import DefaultIcon from "../../assets/emoji/checkbox-dashed.svg";
import CautionaryIcon from "../../assets/emoji/notice.svg";
import PositiveIcon from "../../assets/emoji/checkbox-rounded.svg";

type ToastVariant = "default" | "cautionary" | "positive";

interface ToastVariantConfig {
  icon: string;
  iconColor: string;
  bgColor: string;
  textColor: string;
  defaultMessage: string;
}

interface ToastProps {
  variant?: ToastVariant;
  message?: string;
  className?: string;
  iconColorClassName?: string;
  bgClassName?: string;
  textClassName?: string;
  iconSrc?: string; // 아이콘 교체 가능
}

const VARIANT_CONFIG: Record<ToastVariant, ToastVariantConfig> = {
  default: {
    icon: DefaultIcon,
    iconColor: "text-white",
    bgColor: "bg-black/65",
    textColor: "text-white",
    defaultMessage: "Post uploaded successfully.",
  },
  cautionary: {
    icon: CautionaryIcon,
    iconColor: "text-black",
    bgColor: "bg-black/80",
    textColor: "text-white",
    defaultMessage: "Please check your input.",
  },
  positive: {
    icon: PositiveIcon,
    iconColor: "text-[#27CE18]",
    bgColor: "bg-black/65",
    textColor: "text-white",
    defaultMessage: "Post uploaded successfully!",
  },
} as const;

const Toast: React.FC<ToastProps> = React.memo(({ variant = "default", message, className = "", iconColorClassName, bgClassName, textClassName, iconSrc }) => {
  const config = VARIANT_CONFIG[variant];
  const displayMessage = message ?? config.defaultMessage;

  // 우선순위: 사용자 props > variant 기본값
  const finalIconSrc = iconSrc || config.icon;
  const finalIconColor = iconColorClassName || config.iconColor;
  const finalBgColor = bgClassName || config.bgColor;
  const finalTextColor = textClassName || config.textColor;

  return (
    <div className="flex items-center justify-center">
      <div
        className={`
          flex items-center gap-7 p-6 rounded-xl backdrop-blur-sm
          ${finalBgColor}
          ${className}
        `}
        role="alert"
        aria-live="polite"
      >
        <img src={finalIconSrc} alt="" className={`w-5 h-5 flex-shrink-0 ${finalIconColor}`} draggable={false} />

        <span className={`font-pretendard text-[16px] font-semibold leading-none flex-1 min-w-0 max-w-[320px] ${finalTextColor}`}>{displayMessage}</span>
      </div>
    </div>
  );
});

Toast.displayName = "Toast";

export { Toast };
export type { ToastVariant, ToastProps };