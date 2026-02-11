import type { Message, Partner } from '../types/chat';
import { mockChatrooms } from '../pages/Inbox/mocks/chatData';
import { mockMessages } from '../pages/Inbox/mocks/messageData';

// API Response types matching backend specification
export interface ChatroomResponse {
    id: string;
    partner: Partner;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
}

export interface SendMessagePayload {
    content: string;
    promptType?: string;
}

export interface CreateChatroomPayload {
    partnerId: string;
}

/**
 * GET /api/chatrooms
 * Fetch all chatrooms for the current user
 */
export const getChatrooms = async (): Promise<ChatroomResponse[]> => {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockChatrooms as unknown as ChatroomResponse[]);
        }, 100);
    });
};

/**
 * GET /api/chatrooms/{chatroomId}/chats
 * Fetch all messages for a specific chatroom
 */
export const getChatroomMessages = async (chatroomId: string): Promise<Message[]> => {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
        setTimeout(() => {
            const messages = mockMessages[chatroomId] || [];
            resolve(messages);
        }, 150);
    });
};

/**
 * POST /api/chatrooms/{chatroomId}
 * Send a message to a chatroom
 */
export const sendMessage = async (
    chatroomId: string,
    payload: SendMessagePayload
): Promise<Message> => {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
        setTimeout(() => {
            const newMessage: Message = {
                id: `msg-${Date.now()}`,
                chatId: chatroomId,
                role: 'user',
                content: payload.content,
                createdAt: new Date().toISOString(),
                promptType: (payload.promptType as any) || 'default_chat',
            };
            resolve(newMessage);
        }, 200);
    });
};

/**
 * POST /api/chatrooms
 * Create a new chatroom or join existing one
 */
export const createChatroom = async (
    payload: CreateChatroomPayload
): Promise<ChatroomResponse> => {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
        setTimeout(() => {
            const newChatroom: ChatroomResponse = {
                id: `chatroom-${Date.now()}`,
                partner: {
                    id: payload.partnerId,
                    name: 'New Partner',
                    status: 'online',
                    isNativeSpeaker: false,
                },
                lastMessage: '',
                lastMessageTime: new Date().toISOString(),
                unreadCount: 0,
            };
            resolve(newChatroom);
        }, 200);
    });
};

/**
 * GET /api/chatrooms/search
 * Search chatrooms by query
 */
export const searchChatrooms = async (query: string): Promise<ChatroomResponse[]> => {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
        setTimeout(() => {
            const filtered = mockChatrooms.filter((room) =>
                room.partner.name.toLowerCase().includes(query.toLowerCase())
            );
            resolve(filtered as unknown as ChatroomResponse[]);
        }, 150);
    });
};

/**
 * GET /api/chatrooms/chats/search
 * Search messages across all chatrooms
 */
export const searchMessages = async (query: string): Promise<Message[]> => {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
        setTimeout(() => {
            const allMessages: Message[] = [];
            Object.values(mockMessages).forEach((messages) => {
                const filtered = messages.filter((msg) =>
                    msg.content.toLowerCase().includes(query.toLowerCase())
                );
                allMessages.push(...filtered);
            });
            resolve(allMessages);
        }, 150);
    });
};

/**
 * DELETE /api/chatrooms/{chatroomId}
 * Leave/delete a chatroom
 */
export const leaveChatroom = async (chatroomId: string): Promise<void> => {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Left chatroom: ${chatroomId}`);
            resolve();
        }, 200);
    });
};
