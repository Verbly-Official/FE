import React from "react";
import { Avatar } from "../Avatar/Avatar";

interface CommentItemProps {
    variant?: "others" | "my";
    author: string;
    time: string;
    content: string;
    avatarUrl?: string;
    sentence?: boolean;
    className?: string;
}

export const CommentItem: React.FC<CommentItemProps> = ({
    variant = "others",
    author,
    time,
    content,
    avatarUrl,
    sentence = false,
    className = "",
}) => {

    const bgColor = variant === "my"
        ? "bg-violet-100" 
        : "bg-bg2"; 

    return (
        <div className={`flex gap-3 ${className}`}>
            {/* Avatar */}
            <Avatar src={avatarUrl} alt={`${author} profile`} />

            {/* Comment Bubble*/}
            <div
                className={`
          flex flex-col
          flex-1
          min-w-[200px]
          max-w-[680px]
          rounded-[20px]
          pt-[8px] pr-[20px] pb-[8px] pl-[20px]
          gap-[4px]
          ${bgColor}
        `}
            >
                {/* First Line: Author + Time */}
                <div className="flex items-center gap-2">

                    {/*Author*/}
                    <span
                        className="font-medium text-[20px] leading-[100%] text-gray-10"
                        style={{ fontFamily: "Pretendard" }}
                    >
                        {author}
                    </span>

                    {/* Time*/}
                    <span
                        className="font-normal text-[12px] leading-[100%] text-gray-5"
                        style={{ fontFamily: "Pretendard" }}
                    >
                        {time}
                    </span>
                </div>

                {/* Second Line: Content */}
                <p
                    className={`
            font-medium text-[16px] leading-[150%] tracking-[0%] text-gray-6
            whitespace-normal break-words
            ${sentence ? "line-clamp-1" : ""}
          `}
                    style={{ fontFamily: "Pretendard" }}
                >
                    {content}
                </p>
            </div>
        </div>
    );
};
