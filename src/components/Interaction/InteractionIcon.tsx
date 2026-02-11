import React from "react";
import type { InteractionIconProps } from "../../types/interaction";

// SVG Assets
import CheckboxFalse from "../../assets/emoji/checkbox-false.svg";
import CheckboxTrue from "../../assets/emoji/checkbox-true.svg";
import StarFalse from "../../assets/emoji/star-false.svg";
import StarTrue from "../../assets/emoji/star-true.svg";
import BookmarkFalse from "../../assets/emoji/bookmark-false.svg";
import BookmarkTrue from "../../assets/emoji/bookmark-true.svg";
import HeartFalse from "../../assets/emoji/heart-false.svg";
import HeartTrue from "../../assets/emoji/heart-true.svg";

const iconMap = {
    checkbox: { false: CheckboxFalse, true: CheckboxTrue },
    star: { false: StarFalse, true: StarTrue },
    bookmark: { false: BookmarkFalse, true: BookmarkTrue },
    heart: { false: HeartFalse, true: HeartTrue },
};

export const InteractionIcon: React.FC<InteractionIconProps> = ({
    type,
    selected,
    onToggle,
    className = "",
}) => {
    const Icon = iconMap[type][selected ? "true" : "false"];
    const defaultAriaLabel = `${type} icon`;

    const handleClick = () => {
        if (onToggle) {
            onToggle(!selected);
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            aria-label={defaultAriaLabel}
            className={`
        flex items-center justify-center p-1 rounded-md transition-colors duration-200
        cursor-pointer
        ${className}
      `}
        >
            <img
                src={Icon}
                alt=""
                aria-hidden="true"
                className="w-6 h-6 object-contain"
            />
        </button>
    );
};
