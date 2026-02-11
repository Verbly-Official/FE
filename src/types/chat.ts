export type ChatFrom = "me" | "other";

export interface ChatMessage {
    id: number;
    from: ChatFrom;
    text: string;
    time?: string;
    isGrouped?: boolean;
    avatarUrl?: string;
}

// New types for ChatRoom feature
export type PromptType = 'default_chat';

export type MessageRole = "user" | "assistant";

export interface Message {
    id: string;
    chatId: string;
    role: MessageRole;
    content: string;
    createdAt: string;
    promptType: PromptType;
}

export interface Partner {
    id: string;
    name: string;
    avatarUrl?: string;
    status: "online" | "offline" | "away";
    isNativeSpeaker: boolean;
}

// API Response Types (from Swagger)
export interface ChatroomListItem {
    chatroomId: number;
    chatroomName: string;
    imageUrl: string;
    chatMessage: string;
    chatMessageCreatedAt: string;
    unreadChatCount: number;
}

export interface ChatroomInfo {
    chatroomName: string;
    imageUrl: string;
    lastReadAt: string;
    nativeLang: string;
}

export interface ChatMessageItem {
    senderName: string;
    senderImageUrl: string;
    chatContent: string;
    createdAt: string;
}

export interface ChatProfile {
    chatroomId: number;
    chatroomName: string;
    imageUrl: string;
}

export interface SearchResult {
    chatProfileResponseDTOList: ChatProfile[];
    outerChatroomInfoResponseDTOList: ChatroomListItem[];
}
