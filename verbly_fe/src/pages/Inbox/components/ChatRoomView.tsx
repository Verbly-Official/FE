import React, { useEffect, useRef } from 'react';
import { useChatroom } from '../../../hooks/useChatroom';
import { ChatRoomHeader } from './ChatRoomHeader';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';

interface ChatRoomViewProps {
    chatroomId: string;
}

export const ChatRoomView: React.FC<ChatRoomViewProps> = ({ chatroomId }) => {
    const { messages, partner, isLoading, sendMessage } = useChatroom(chatroomId);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    if (isLoading && messages.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center bg-white">
                <div className="text-gray-400">Loading...</div>
            </div>
        );
    }

    if (!partner) {
        return (
            <div className="flex-1 flex items-center justify-center bg-white">
                <div className="text-gray-400">Partner not found</div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-white">
            {/* Header */}
            <ChatRoomHeader partner={partner} />

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-6 py-4 min-h-0">
                {messages.map((message, index) => {
                    // Determine if we should show avatar
                    const prevMessage = index > 0 ? messages[index - 1] : null;
                    const showAvatar = !prevMessage || prevMessage.role !== message.role;

                    return (
                        <MessageBubble
                            key={message.id}
                            message={message}
                            showAvatar={showAvatar}
                            partnerAvatarUrl={partner.avatarUrl}
                        />
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <ChatInput onSend={sendMessage} />
        </div>
    );
};
