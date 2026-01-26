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
  iconColorClassName?: string;
  bgClassName?: string;
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
    bgColor: "bg-yellow-100/90",
    defaultMessage: "Please check your input.",
  },
  positive: {
    icon: PositiveIcon,
    iconColor: "text-green-500",
    bgColor: "bg-emerald-500/10",
    defaultMessage: "Post uploaded successfully!",
  },
} as const;

const Toast: React.FC<ToastProps> = React.memo(
  ({
    variant = "positive",
    message,
    className = "",
    iconColorClassName, // undefined면 기본값
    bgClassName, // undefined면 기본값
  }) => {
    const config = VARIANT_CONFIG[variant];
    const displayMessage = message ?? config.defaultMessage;

    // 사용자 지정 있으면 그거, 없으면 variant 기본값
    const finalIconColor = iconColorClassName || config.iconColor;
    const finalBgColor = bgClassName || config.bgColor;

    return (
      <div className={`flex items-center justify-center p-6 ${className}`}>
        <div
          className={`
        flex items-center gap-7 rounded-xl backdrop-blur-sm
        ${finalBgColor}  // 동적 배경!
      `}
        >
          {/* SVG는 fill="currentColor"로 수정 필요 */}
          <img src={config.icon} className={`w-5 h-5 flex-shrink-0 ${finalIconColor}`} aria-hidden="true" />

          <span className="text-white font-semibold text-sm flex-1">{displayMessage}</span>
        </div>
      </div>
    );
  },
);

Toast.displayName = "Toast";

export { Toast };
export type { ToastVariant, ToastProps };
