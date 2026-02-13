import React from "react";


export type TextButtonVariant = "primary" | "secondary";
export type TextButtonSize = "large" | "medium" | "small";
export type TextButtonIcon = "none" | "leading" | "trailing" | "both";
export type TextButtonInteraction = "normal" | "hovered" | "pressed" | "disabled" | "error";

export interface TextButtonProps {
    variant?: TextButtonVariant;
    size?: TextButtonSize;
    icon?: TextButtonIcon;
    interaction?: TextButtonInteraction;
    disabled?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    ariaLabel?: string;
    className?: string;
    /** Custom icon source (svg path) to override default icons */
    iconSrc?: string;
}

export const TextButton: React.FC<TextButtonProps> = ({
    variant = "primary",
    size = "large",
    icon = "none",
    interaction = "normal",
    disabled = false,
    children,
    onClick,
    ariaLabel,
    className = "",
    iconSrc,
}) => {
    // Determine effective interaction state
    const effectiveInteraction = disabled ? "disabled" : interaction;
    const isError = effectiveInteraction === "error";
    const isDisabled = effectiveInteraction === "disabled";

    // Variant-specific text colors
    const variantTextColors = {
        primary: "text-violet-50",
        secondary: "text-gray-6",
    };

    // Interaction-specific text colors (overrides variant if needed)
    const interactionTextColors = {
        normal: "",
        hovered: "",
        pressed: "",
        disabled: "text-gray-4",
        error: "text-[#EF1111]", // var(--System-Red-1, #EF1111)
    };

    // Typography styles
    const typographyStyles = {
        large: "text-subtitle6-semi18",
        medium: "text-btn1-semi14",
        small: "text-btn2-medium14",
    };

    // Background styles for hovered/pressed
    const interactionBgStyles = {
        normal: "bg-transparent",
        hovered: "bg-violet-100",
        pressed: "bg-violet-90",
        disabled: "bg-transparent",
        error: "bg-transparent",
    };

    // Icon sizes
    const iconSize = {
        large: 24,
        medium: 20,
        small: 16,
    }[size];

    const textColorClass = interactionTextColors[effectiveInteraction] || variantTextColors[variant];

    const renderIcon = () => {
        if (!iconSrc) return null;

        return (
            <img
                src={iconSrc}
                width={iconSize}
                height={iconSize}
                alt=""
                aria-hidden="true"
                className={`object-contain ${isDisabled ? "opacity-40" : ""}`}
            />
        );
    };

    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            aria-label={ariaLabel}
            className={`
        flex justify-center items-center transition-all duration-200
        p-[4px] rounded-[4px]
        ${typographyStyles[size]}
        ${textColorClass}
        ${interactionBgStyles[effectiveInteraction]}
        ${effectiveInteraction === "normal" && !disabled ? "hover:bg-violet-100 active:bg-violet-90" : ""}
        ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}
        gap-[8px]
        ${className}
      `}
        >
            {(icon === "leading" || icon === "both" || isError) && renderIcon()}
            <span>{children}</span>
            {(icon === "trailing" || icon === "both") && !isError && renderIcon()}
        </button>
    );
};

