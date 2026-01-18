export type ChatFrom = "me" | "other";

export interface ChatMessage {
    id: string;
    from: ChatFrom;
    text: string;
    time?: string;
    isGrouped?: boolean;
    avatarUrl?: string;
}
