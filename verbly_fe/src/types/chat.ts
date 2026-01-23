export type ChatFrom = "me" | "other";

export interface ChatMessage {
    id: string;
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
