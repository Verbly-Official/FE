import { useState, useEffect, useCallback } from 'react';
import type { Message, Partner } from '../types/chat';
import { getChatroomMessages, sendMessage as apiSendMessage } from '../apis/chatrooms';
import { mockChatrooms } from '../pages/Inbox/mocks/chatData';

interface UseChatroomReturn {
    messages: Message[];
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
    const [messages, setMessages] = useState<Message[]>([]);
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
            console.log('Fetching messages for:', chatroomId);
            const fetchedMessages = await getChatroomMessages(chatroomId);
            setMessages(fetchedMessages);

            // Get partner info from chatroom data (search by room ID or partner ID)
            const searchId = chatroomId.toLowerCase();
            console.log('Searching for partner with ID:', searchId);
            console.log('Available rooms:', mockChatrooms.map(r => ({ id: r.id, partnerId: r.partner.id })));

            const chatroom = mockChatrooms.find((room) =>
                room.id.toString().toLowerCase() === searchId ||
                room.partner.id.toLowerCase() === searchId
            );

            if (chatroom) {
                console.log('Found partner:', chatroom.partner.name);
                setPartner(chatroom.partner as Partner);
            } else {
                console.warn('Partner not found for ID:', searchId);
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

    // Send a message with optimistic update
    const sendMessage = useCallback(
        async (content: string) => {
            if (!chatroomId || !content.trim()) return;

            // Optimistic update - add message immediately
            const optimisticMessage: Message = {
                id: `temp-${Date.now()}`,
                chatId: chatroomId,
                role: 'user',
                content: content.trim(),
                createdAt: new Date().toISOString(),
                promptType: 'default_chat',
            };

            setMessages((prev) => [...prev, optimisticMessage]);

            try {
                // Send to API
                const sentMessage = await apiSendMessage(chatroomId, {
                    content: content.trim(),
                });

                // Replace optimistic message with real one
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === optimisticMessage.id ? sentMessage : msg
                    )
                );
            } catch (err) {
                // Remove optimistic message on error
                setMessages((prev) =>
                    prev.filter((msg) => msg.id !== optimisticMessage.id)
                );
                setError(err instanceof Error ? err.message : 'Failed to send message');
                console.error('Error sending message:', err);
            }
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
