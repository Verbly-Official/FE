import React from "react";
import DefaultIcon from "../../assets/emoji/checkbox-dashed.svg";
import CautionaryIcon from "../../assets/emoji/notice.svg";
import PositiveIcon from "../../assets/emoji/checkbox-rounded.svg";

type ToastVariant = "default" | "cautionary" | "positive";

interface ToastVariantConfig {
  icon: string;
  iconColor: string;
  defaultMessage: string;
}

interface ToastProps {
  variant?: ToastVariant;
  message?: string;
  className?: string;
}

const VARIANT_CONFIG: Record<ToastVariant, ToastVariantConfig> = {
  default: {
    icon: DefaultIcon,
    iconColor: "text-white",
    defaultMessage: "Post uploaded successfully.",
  },
  cautionary: {
    icon: CautionaryIcon,
    iconColor: "text-black",
    defaultMessage: "Please check your input.",
  },
  positive: {
    icon: PositiveIcon,
    iconColor: "text-[#27CE18]",
    defaultMessage: "Post uploaded successfully!",
  },
} as const;

const Toast: React.FC<ToastProps> = React.memo(({ variant = "positive", message, className = "" }) => {
  const config = VARIANT_CONFIG[variant];
  const displayMessage = message ?? config.defaultMessage;

  return (
    <div className="flex items-center justify-center">
      <div
        className={`
            flex items-center justify-center gap-7 p-6 rounded-xl bg-black/65 backdrop-blur-sm
            ${className}
          `}
        role="alert"
        aria-live="polite"
      >
        <img src={config.icon} alt="" className="w-5 h-5 flex-shrink-0" draggable={false} />

        <span className="text-white font-pretendard text-[16px] font-semibold leading-none flex-1 min-w-0 max-w-[320px]">{displayMessage}</span>
      </div>
    </div>
  );
});

Toast.displayName = "Toast";

export { Toast };
export type { ToastVariant, ToastProps };
