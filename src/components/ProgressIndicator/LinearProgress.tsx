
import React from "react";

export interface LinearProgressProps {
    value: number; // 0 ~ 100
    size?: "large" | "medium" | "small";
    labelLeft?: string;
    labelRight?: string;
    fillGradient?: "main" | "point";
    className?: string;
}

const LinearProgress: React.FC<LinearProgressProps> = ({
    value,
    size = "small",
    labelLeft,
    labelRight,
    fillGradient = "point",
    className = "",
}) => {
    const heightClass =
        size === "large" ? "h-[24px]" :
            size === "medium" ? "h-[20px]" :
                "h-[16px]";

    const trackWidthClass = "w-full max-w-[612px]";

    const backgroundStyle = {
        backgroundImage: fillGradient === "main" ? "var(--gradient-1-main)" : "var(--gradient-4)"
    };

    return (
        <div className={`flex flex-col gap-[4px] ${className}`}>
            {(labelLeft || labelRight) && (
                <div className="flex justify-between items-center">
                    <span className="text-body2-semi15 text-gray-10">
                        {labelLeft}
                    </span>
                    <span className="text-body2-semi15 text-gray-10">
                        {labelRight}
                    </span>
                </div>
            )}

            <div className={`relative ${trackWidthClass} ${heightClass} bg-gray-2 rounded-[20px] overflow-hidden`}>
                <div
                    className="absolute top-0 left-0 h-full rounded-[12px] transition-all duration-300"
                    style={{
                        width: `${value}%`,
                        ...backgroundStyle
                    }}
                />
            </div>
        </div>
    );
};

export default LinearProgress;
