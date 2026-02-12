import { useState, useEffect, useCallback } from 'react';
import type { ChatMessageItem } from '../types/chat';
import { getChatroomMessages } from '../apis/chatrooms';

interface Partner {
    name: string;
    avatarUrl?: string;
}

interface UseChatroomReturn {
    messages: ChatMessageItem[];
    partner: Partner | null;
    isLoading: boolean;
    error: string | null;
    sendMessage: (content: string) => Promise<void>;
    refreshMessages: () => Promise<void>;
}

/**
 * Custom hook for managing chatroom state and actions
 * @param chatroomId - The ID of the chatroom to manage
 * @returns Chatroom data and actions
 */
export const useChatroom = (chatroomId: string | null): UseChatroomReturn => {
    const [messages, setMessages] = useState<ChatMessageItem[]>([]);
    const [partner, setPartner] = useState<Partner | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch messages when chatroomId changes
    const fetchMessages = useCallback(async () => {
        if (!chatroomId) {
            setMessages([]);
            setPartner(null);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const chatroomIdNum = parseInt(chatroomId, 10);
            if (isNaN(chatroomIdNum)) {
                throw new Error('Invalid chatroom ID');
            }

            const fetchedMessages = await getChatroomMessages(chatroomIdNum);
            setMessages(fetchedMessages);

            // Extract partner info from messages
            if (fetchedMessages.length > 0) {
                // Find the first message from the other person (not current user)
                // Assuming current user's messages won't have senderImageUrl or we can identify them differently
                const otherPersonMessage = fetchedMessages.find(msg => msg.senderImageUrl);
                if (otherPersonMessage) {
                    setPartner({
                        name: otherPersonMessage.senderName,
                        avatarUrl: otherPersonMessage.senderImageUrl
                    });
                }
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch messages');
            console.error('Error fetching messages:', err);
        } finally {
            setIsLoading(false);
        }
    }, [chatroomId]);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    // Send a message (WebSocket implementation would go here)
    const sendMessage = useCallback(
        async (content: string) => {
            if (!chatroomId || !content.trim()) return;

            // TODO: Implement WebSocket message sending
            // For now, this is a placeholder
            console.log('Sending message:', content, 'to chatroom:', chatroomId);

            // Optimistic update could be added here
            // After WebSocket implementation, messages will be received via WebSocket
        },
        [chatroomId]
    );

    return {
        messages,
        partner,
        isLoading,
        error,
        sendMessage,
        refreshMessages: fetchMessages,
    };
};
