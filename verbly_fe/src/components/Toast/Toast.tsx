import React from "react";
import DefaultIcon from "@/assets/emoji/checkbox-dashed.svg?react";
import CautionaryIcon from "@/assets/emoji/notice.svg?react";
import PositiveIcon from "@/assets/emoji/checkbox-rounded.svg?react";

// 타입 정의
type ToastVariant = "default" | "cautionary" | "positive";

interface ToastVariantConfig {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
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
  } as const,
  cautionary: {
    icon: CautionaryIcon,
    iconColor: "text-black",
    defaultMessage: "Please check your input.",
  } as const,
  positive: {
    icon: PositiveIcon,
    iconColor: "text-[#27CE18]",
    defaultMessage: "Post uploaded successfully!",
  } as const,
} as const;

const Toast: React.FC<ToastProps> = React.memo(({ variant = "default", message, className = "" }) => {
  const config = VARIANT_CONFIG[variant];
  const displayMessage = message ?? config.defaultMessage;
  const IconComponent = config.icon;

  return (
    <div className={`flex items-center justify-center`}>
      <div
        className={`
        flex items-center justify-center gap-7 p-6 rounded-xl bg-black/65 backdrop-blur-sm
        ${className}
      `}
        role="alert"
        aria-live="polite"
      >
        {/* 타입별 아이콘 */}
        <IconComponent className={`w-5 h-5 flex-shrink-0 ${config.iconColor}`} />

        {/* 메시지 */}
        <span className="text-white font-pretendard text-[16px] font-semibold leading-none flex-1 min-w-0 max-w-[320px]">{displayMessage}</span>
      </div>
    </div>
  );
});

Toast.displayName = "Toast";

export { Toast };
export type { ToastVariant, ToastProps };
