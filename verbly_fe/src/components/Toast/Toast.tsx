import React from "react";
import DefaultIcon from "../../assets/emoji/checkbox-dashed.svg";
import CautionaryIcon from "../../assets/emoji/notice.svg";
import PositiveIcon from "../../assets/emoji/checkbox-rounded.svg";

type ToastVariant = "default" | "cautionary" | "positive";

interface ToastVariantConfig {
  icon: string;
  iconColor: string;
  bgColor: string;
  defaultMessage: string;
}

interface ToastProps {
  variant?: ToastVariant;
  message?: string;
  className?: string;
  iconColorClassName?: string; // 아이콘 색
  bgClassName?: string; // 배경 색
}

const VARIANT_CONFIG: Record<ToastVariant, ToastVariantConfig> = {
  default: {
    icon: DefaultIcon,
    iconColor: "text-white",
    bgColor: "bg-black/65",
    defaultMessage: "Post uploaded successfully.",
  },
  cautionary: {
    icon: CautionaryIcon,
    iconColor: "text-gray-900",
    bgColor: "bg-yellow-100",
    defaultMessage: "Please check your input.",
  },
  positive: {
    icon: PositiveIcon,
    iconColor: "text-green-500",
    bgColor: "bg-black/65",
    defaultMessage: "Post uploaded successfully!",
  },
} as const;

const Toast: React.FC<ToastProps> = React.memo(({ variant = "positive", message, className = "", iconColorClassName, bgClassName }) => {
  const config = VARIANT_CONFIG[variant];
  const displayMessage = message ?? config.defaultMessage;

  const iconColor = iconColorClassName ?? config.iconColor;
  const bgColor = bgClassName ?? config.bgColor;

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center">
        <div
          className={`
              flex items-center gap-7 p-6 rounded-xl backdrop-blur-sm
              ${bgColor}
              ${className}
            `}
          role="alert"
          aria-live="polite"
        >
          <img src={config.icon} alt="" className={`w-5 h-5 flex-shrink-0 ${iconColor}`} aria-hidden="true" />
          <span className="text-white font-pretendard text-[16px] font-semibold leading-none flex-1 min-w-0 max-w-[320px]">{displayMessage}</span>
        </div>
      </div>
    </div>
  );
});

Toast.displayName = "Toast";

export { Toast };
export type { ToastVariant, ToastProps };
