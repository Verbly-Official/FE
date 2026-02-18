import instance from './axios';
import type {
    ChatroomListItem,
    ChatroomInfo,
    ChatMessageItem,
    SearchResult
} from '../types/chat';

// API Response wrapper type
interface ApiResponse<T> {
    isSuccess: boolean;
    code: string;
    message: string;
    result: T;
}

/**
 * GET /api/chatrooms
 * Fetch all chatrooms for the current user
 */
export const getChatrooms = async (): Promise<ChatroomListItem[]> => {
    const response = await instance.get<ApiResponse<ChatroomListItem[]>>('/api/chatrooms');
    return response.data.result;
};

/**
 * GET /api/chatrooms/{opponentId}
 * Get chatroom info by opponent ID
 */
export const getChatroomInfo = async (opponentId: number): Promise<ChatroomInfo> => {
    const response = await instance.get<ApiResponse<ChatroomInfo>>(`/api/chatrooms/${opponentId}`);
    return response.data.result;
};

/**
 * GET /api/chatrooms/{chatroomId}/chats
 * Fetch all messages for a specific chatroom
 */
export const getChatroomMessages = async (chatroomId: number): Promise<ChatMessageItem[]> => {
    const response = await instance.get<ApiResponse<ChatMessageItem[]>>(`/api/chatrooms/${chatroomId}/chats`);
    return response.data.result;
};

/**
 * POST /api/chatrooms/{opponentId}
 * Create a new chatroom or enter existing one
 */
export const createOrEnterChatroom = async (opponentId: number): Promise<number> => {
    const response = await instance.post<ApiResponse<{ chatroomId: number }>>(`/api/chatrooms/${opponentId}`);
    return response.data.result.chatroomId;
};

/**
 * DELETE /api/chatrooms/{opponentId}
 * Leave/delete a chatroom
 */
export const leaveChatroom = async (opponentId: number): Promise<void> => {
    await instance.delete<ApiResponse<{}>>(`/api/chatrooms/${opponentId}`);
};

/**
 * GET /api/chatrooms/search
 * Search chatrooms by query
 */
export const searchChatrooms = async (query: string): Promise<SearchResult> => {
    const response = await instance.get<ApiResponse<SearchResult>>('/api/chatrooms/search', {
        params: { search: query }
    });
    return response.data.result;
};
/**
 * POST /api/chatrooms/{chatroomId}/messages
 * Send a message to a chatroom
 */
export const sendChatroomMessage = async (chatroomId: number, content: string): Promise<void> => {
    await instance.post<ApiResponse<void>>(`/api/chatrooms/${chatroomId}/messages`, { content });
};
