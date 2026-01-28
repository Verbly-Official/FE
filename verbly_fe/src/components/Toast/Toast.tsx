import React from "react";
import DefaultIcon from "../../assets/emoji/checkbox-dashed.svg?react";
import CautionaryIcon from "../../assets/emoji/notice.svg?react";
import PositiveIcon from "../../assets/emoji/checkbox-rounded.svg?react";

type ToastVariant = "default" | "cautionary" | "positive";

interface ToastVariantConfig {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
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
  iconSrc?: string;
}

const VARIANT_CONFIG: Record<ToastVariant, ToastVariantConfig> = {
  default: {
    icon: DefaultIcon,
    iconColor: "text-white",
    bgColor: "bg-black/80",
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
    bgColor: "bg-black/80",
    textColor: "text-white",
    defaultMessage: "Post uploaded successfully!",
  },
} as const;

const Toast: React.FC<ToastProps> = React.memo(({ variant = "default", message, className = "", iconColorClassName, bgClassName, textClassName, iconSrc }) => {
  const config = VARIANT_CONFIG[variant];
  const displayMessage = message ?? config.defaultMessage;

  const finalIconColor = iconColorClassName || config.iconColor;
  const finalBgColor = bgClassName || config.bgColor;
  const finalTextColor = textClassName || config.textColor;

  // iconSrc 있으면 img 태그, 없으면 variant 기본 icon 컴포넌트
  const renderIcon = () => {
    if (iconSrc) {
      return <img src={iconSrc} alt="" className={`w-5 h-5 flex-shrink-0 brightness-0 invert-[.08] ${finalIconColor}`} draggable={false} />;
    }

    const Icon = config.icon;
    return <Icon className={`w-5 h-5 flex-shrink-0 ${finalIconColor}`} aria-hidden />;
  };

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
        {renderIcon()}

        <span
          className={`
            font-pretendard text-[16px] font-semibold leading-none
            flex-1 min-w-0 max-w-[320px] ${finalTextColor}
          `}
        >
          {displayMessage}
        </span>
      </div>
    </div>
  );
});

Toast.displayName = "Toast";

export { Toast };
export type { ToastVariant, ToastProps };
