import React, { useEffect, useRef, useMemo } from 'react';
import { useChatroom } from '../../../hooks/useChatroom';
import { useAuthStore } from '../../../store/useAuthStore';
import { ChatRoomHeader } from './ChatRoomHeader';
import { ChatList } from '../../../components/Chat/ChatList';
import { ChatInput } from './ChatInput';
import type { ChatMessage } from '../../../types/chat';

interface PartnerInfo {
    name: string;
    avatarUrl?: string;
}

interface ChatRoomViewProps {
    chatroomId: string;
    onToggleSidebar: () => void;
    isSidebarOpen: boolean;
    partnerProp?: PartnerInfo | null;
}

export const ChatRoomView: React.FC<ChatRoomViewProps> = ({
    chatroomId,
    onToggleSidebar,
    isSidebarOpen,
    partnerProp
}) => {
    const { messages, partner: hookPartner, isLoading, sendMessage } = useChatroom(chatroomId);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const { userInfo } = useAuthStore(); // Get current user info

    // Use partner from prop if available (for header), otherwise fall back to hook data
    const displayPartner = partnerProp || hookPartner;

    // Map ChatMessageItem[] to ChatMessage[] for the common ChatList component
    const chatMessages = useMemo((): ChatMessage[] => {
        return messages.map((msg, index) => {
            // Check if message is from other person
            // If senderName matches current user's nickname, it's from 'me'
            // Fallback: if senderName is same as partner name, it's from 'other'
            let isFromOther = true;

            if (userInfo?.nickname && msg.senderName === userInfo.nickname) {
                isFromOther = false;
            } else if (displayPartner?.name && msg.senderName === displayPartner.name) {
                isFromOther = true;
            } else {
                // Legacy check or fallback
                isFromOther = msg.senderImageUrl !== undefined && msg.senderImageUrl !== '';
                // If I have an image, the above check is wrong. 
                // Better to default to 'other' unless we are sure it's 'me'.
            }

            return {
                id: index,
                from: isFromOther ? 'other' : 'me',
                text: msg.chatContent,
                time: new Date(msg.createdAt).toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                }),
                avatarUrl: isFromOther ? msg.senderImageUrl : (userInfo?.profileImage || displayPartner?.avatarUrl)
            };
        });
    }, [messages, displayPartner, userInfo]);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    if (isLoading && messages.length === 0 && !displayPartner) {
        return (
            <div className="flex-1 flex items-center justify-center bg-white">
                <div className="text-gray-400">Loading...</div>
            </div>
        );
    }

    if (!displayPartner) {
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
                partner={displayPartner}
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
