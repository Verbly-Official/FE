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


const MAIN_GRADIENT = "var(--gradient-1-main)";
const PRESSED_GRADIENT = "linear-gradient(0deg,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.20)_100%),var(--gradient-1-main)";

const INTERACTION_STYLES: Record<GradientButtonInteraction, string> = {
    normal: `bg-[image:${MAIN_GRADIENT}] text-white hover:shadow-[0_2px_8px_0_rgba(0,0,0,0.20)] active:bg-[image:${PRESSED_GRADIENT}] active:shadow-[0_2px_8px_0_rgba(0,0,0,0.12)] transition-all duration-200`,
    hovered: `bg-[image:${MAIN_GRADIENT}] text-white shadow-[0_2px_8px_0_rgba(0,0,0,0.20)]`,
    pressed: `bg-[image:${PRESSED_GRADIENT}] text-white shadow-[0_2px_8px_0_rgba(0,0,0,0.12)]`,
    disabled: "bg-gray-2 text-gray-6 opacity-50 cursor-not-allowed",
};

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

    const classes = [
        "inline-flex justify-center items-center rounded-[var(--8,8px)]",
        SIZE_STYLES[size],
        INTERACTION_STYLES[effectiveInteraction],
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