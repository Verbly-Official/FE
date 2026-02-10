import React from "react";
import CircleProgress from "./CircleProgress";
import type { CircleProgressProps } from "./CircleProgress";
import LinearProgress from "./LinearProgress";
import type { LinearProgressProps } from "./LinearProgress";

export type ProgressIndicatorProps =
    | ({ variant: "circle" } & CircleProgressProps)
    | ({ variant: "linear" } & LinearProgressProps);

const ProgressIndicator: React.FC<ProgressIndicatorProps> = (props) => {
    if (props.variant === "circle") {
        const { variant, ...circleProps } = props;
        return <CircleProgress {...circleProps} />;
    }

    const { variant, ...linearProps } = props;
    return <LinearProgress {...linearProps} />;
};

export default ProgressIndicator;
