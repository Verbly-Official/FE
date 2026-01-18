import React from "react";
import { ChatItem } from "./ChatItem";
import type { ChatMessage } from "../../types/chat";

interface ChatListProps {
    messages: ChatMessage[];
    className?: string;
}

export const ChatList: React.FC<ChatListProps> = ({ messages, className = "" }) => {
    return (
        <div className={`flex flex-col bg-white min-h-full pt-[66px] pb-[66px] px-[20px] ${className}`}>
            {messages.map((msg, index) => {
                const prevMsg = messages[index - 1];
                const nextMsg = messages[index + 1];

                // 연속 메시지 확인: 이전 메시지와 보낸 사람 및 시간이 같은지 확인
                const isContinuous =
                    prevMsg &&
                    prevMsg.from === msg.from &&
                    prevMsg.time?.trim() === msg.time?.trim();

                // 다음의 경우 그룹의 끝으로 간주 (시간 표시 여부 결정):
                // 1. 마지막 메시지인 경우
                // 2. 또는 다음 보낸 사람이 다른 경우
                // 3. 또는 다음 시간이 다른 경우
                const isLastInGroup =
                    !nextMsg ||
                    nextMsg.from !== msg.from ||
                    nextMsg.time?.trim() !== msg.time?.trim();

                // 간격 로직:
                // - 같은 사람이 같은 시간에 보낸 연속 메시지는 8px 간격
                // - 그 외(보낸 사람이 바뀌거나 시간이 바뀐 경우)에는 20px 간격
                return (
                    <ChatItem
                        key={msg.id}
                        from={msg.from}
                        text={msg.text}
                        time={isLastInGroup ? msg.time : undefined}
                        showAvatar={!isContinuous}
                        avatarUrl={msg.avatarUrl}
                        className={index === 0 ? "" : isContinuous ? "mt-[8px]" : "mt-[20px]"}
                    />
                );
            })}
        </div>
    );
};
