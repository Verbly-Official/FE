import React from 'react';
import type { Message } from '../../../types/chat';
import { Avatar } from '../../../components/Avatar/Avatar';

interface MessageBubbleProps {
    message: Message;
    showAvatar?: boolean;
    partnerAvatarUrl?: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
    message,
    showAvatar = true,
    partnerAvatarUrl,
}) => {
    const isUser = message.role === 'user';
    const time = new Date(message.createdAt).toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    // Render different layouts based on promptType
    const renderContent = () => {
        return (
            <div className={`text-body1-medium16 [word-break:break-word] ${isUser ? '!text-white' : 'text-gray-8'}`}>
                {message.content}
            </div>
        );
    };

    return (
        <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
            <div className={`relative flex items-start ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar for assistant messages */}
                {!isUser && (
                    <div className="absolute left-0 top-0 w-[48px] flex-shrink-0">
                        {showAvatar && <Avatar src={partnerAvatarUrl} />}
                    </div>
                )}

                <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'} ${!isUser ? 'ml-[64px]' : ''}`}>
                    {/* Message bubble */}
                    <div
                        className={`px-5 py-1.5 antialiased max-w-[528px]
                            ${isUser
                                ? 'bg-violet-60 rounded-[12px_12px_0_12px]'
                                : 'bg-violet-100 rounded-[12px_12px_12px_0]'
                            }
                        `}
                    >
                        {renderContent()}
                    </div>

                    {/* Time */}
                    <div className="min-w-[45px] flex items-end h-full pb-1">
                        <span className="text-[11px] font-[500] leading-[100%] text-gray-5 whitespace-nowrap antialiased">
                            {time}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
