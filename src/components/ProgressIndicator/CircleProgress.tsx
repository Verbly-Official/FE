import React from "react";

// Assets
import bigFullGray from "../../assets/emoji/big-full-circle-gray.svg";
import bigQuarterPurple from "../../assets/emoji/big-quarter-circle-purple.svg";
import bigHalfPurple from "../../assets/emoji/big-half-circle-purple.svg";
import bigThreeQuarterPurple from "../../assets/emoji/big-three-quarter-circle-purple.svg";
import bigFullPurple from "../../assets/emoji/big-full-circle-purple.svg";

import smallFullGray from "../../assets/emoji/small-full-circle-gray.svg";
import smallQuarterPurple from "../../assets/emoji/small-quater-circle-purple.svg";
import smallHalfPurple from "../../assets/emoji/small-half-circle-purple.svg";
import smallThreeQuarterPurple from "../../assets/emoji/small-three-quarter-circle-purple.svg";
import smallFullPurple from "../../assets/emoji/small-full-circle-purple.svg";

export interface CircleProgressProps {
    value: number; // 0, 25, 50, 75, 100
    size?: "large" | "small";
    className?: string;
}

const ICON_MAP = {
    large: {
        0: bigFullGray,
        25: bigQuarterPurple,
        50: bigHalfPurple,
        75: bigThreeQuarterPurple,
        100: bigFullPurple,
    },
    small: {
        0: smallFullGray,
        25: smallQuarterPurple,
        50: smallHalfPurple,
        75: smallThreeQuarterPurple,
        100: smallFullPurple,
    },
};

const CircleProgress: React.FC<CircleProgressProps> = ({
    value,
    size = "large",
    className = "",
}) => {

    const normalizedValue = [0, 25, 50, 75, 100].reduce((prev, curr) =>
        Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    ) as keyof (typeof ICON_MAP)["large"];

    const iconSrc = ICON_MAP[size][normalizedValue];
    const bgIconSrc = ICON_MAP[size][0];
    const dimensions = size === "large" ? "w-[224px] h-[224px]" : "w-[114px] h-[114px]";

    let iconStyle = "absolute inset-0 w-full h-full object-contain";
    if (normalizedValue === 25) {
        iconStyle = "absolute top-0 right-0 w-1/2 h-1/2 object-contain";
    } else if (normalizedValue === 50) {
        iconStyle = "absolute top-0 right-0 w-1/2 h-full object-contain";
    }

    // Typography based on size
    const textStyle = size === "large"
        ? "text-title3-bold24" // Title/Bold24
        : "text-btn1-semi14"; // Btn/Semi14

    return (
        <div className={`relative flex flex-col items-center justify-center ${className}`}>
            <div className={`relative ${dimensions}`}>
                {/* Background Gray Circle (except for 100%) */}
                {normalizedValue !== 100 && (
                    <img
                        src={bgIconSrc}
                        alt="Progress Background"
                        className="absolute inset-0 w-full h-full object-contain"
                    />
                )}
                {/* Progress Circle */}
                <img
                    src={iconSrc}
                    alt={`Progress ${normalizedValue}%`}
                    className={iconStyle}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span
                        className={`${textStyle} text-center bg-clip-text text-transparent`}
                        style={{
                            fontFamily: "Pretendard",
                            backgroundImage: normalizedValue === 100 ? "var(--gradient-4)" : "var(--gradient-1-main)"
                        }}
                    >
                        {normalizedValue}%
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CircleProgress;
