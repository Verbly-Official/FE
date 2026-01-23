import React from "react";
import { Avatar } from "../Avatar/Avatar";
import type { ChatFrom } from "../../types/chat";

interface ChatItemProps {
    from: ChatFrom;
    text: string;
    time?: string;
    showAvatar?: boolean;
    avatarUrl?: string;
    className?: string;
}

export const ChatItem: React.FC<ChatItemProps> = ({
    from,
    text,
    time,
    showAvatar = true,
    avatarUrl,
    className = "",
}) => {
    const isMe = from === "me";

    return (
        <div className={`flex w-full ${isMe ? "justify-end" : "justify-start"} ${className}`}>
            <div className={`relative flex items-start ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                {/* 아바타: 'other'인 경우에만 표시 */}
                {!isMe && (
                    <div className="absolute left-0 top-0 w-[48px] flex-shrink-0">
                        {showAvatar && <Avatar src={avatarUrl} />}
                    </div>
                )}

                <div className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : "flex-row"} ${!isMe ? "ml-[64px]" : ""}`}>
                    {/* 말풍선 */}
                    <div
                        className={`px-5 py-2 text-body1-medium16 [word-break:break-word] max-w-[528px] antialiased
              ${isMe
                                ? "bg-violet-60 text-white rounded-[12px_12px_0_12px]"
                                : "bg-violet-100 text-gray-8 rounded-[12px_12px_12px_0]"
                            }
            `}
                    >
                        {text}
                    </div>

                    {/* 시간 */}
                    <div className="min-w-[45px] flex items-end h-full pb-1">
                        {time && (
                            <span className="text-[11px] font-[500] leading-[100%] text-gray-5 whitespace-nowrap antialiased">
                                {time}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
