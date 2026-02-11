import React, { useEffect, useRef, useMemo } from 'react';
import { useChatroom } from '../../../hooks/useChatroom';
import { ChatRoomHeader } from './ChatRoomHeader';
import { ChatList } from '../../../components/Chat/ChatList';
import { ChatInput } from './ChatInput';
import type { ChatMessage } from '../../../types/chat';

interface ChatRoomViewProps {
    chatroomId: string;
    onToggleSidebar: () => void;
    isSidebarOpen: boolean;
}

export const ChatRoomView: React.FC<ChatRoomViewProps> = ({
    chatroomId,
    onToggleSidebar,
    isSidebarOpen
}) => {
    const { messages, partner, isLoading, sendMessage } = useChatroom(chatroomId);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    // Map ChatMessageItem[] to ChatMessage[] for the common ChatList component
    const chatMessages = useMemo((): ChatMessage[] => {
        if (!partner) return [];

        // Get current user name from localStorage or auth store if available
        // For now, we'll identify messages by checking if they have senderImageUrl
        return messages.map((msg, index) => {
            const isFromOther = msg.senderImageUrl !== undefined && msg.senderImageUrl !== '';

            return {
                id: index,
                from: isFromOther ? 'other' : 'me',
                text: msg.chatContent,
                time: new Date(msg.createdAt).toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                }),
                avatarUrl: isFromOther ? msg.senderImageUrl : undefined
            };
        });
    }, [messages, partner]);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
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
        <div className="flex-1 flex flex-col h-full bg-white min-w-0">
            {/* Header */}
            <ChatRoomHeader
                partner={partner}
                onToggleSidebar={onToggleSidebar}
                isSidebarOpen={isSidebarOpen}
            />

            {/* Messages Area */}
            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto min-h-0">
                <ChatList messages={chatMessages} />
            </div>

            {/* Input Area */}
            <ChatInput onSend={sendMessage} />
        </div>
    );
};
