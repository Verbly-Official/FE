export interface ChatRoom {
    id: number;
    partner: {
        name: string;
        avatarUrl?: string;
    };
    lastMessage: string;
    time: string;
    unreadCount: number;
}

export const mockChatrooms: ChatRoom[] = [
    {
        id: 1,
        partner: { name: 'Alice', avatarUrl: '' },
        lastMessage: 'Hello. My name is Tom, Go strigth',
        time: '2시간전',
        unreadCount: 1,
    },
    {
        id: 2,
        partner: { name: 'Alice', avatarUrl: '' },
        lastMessage: 'Hello. My name is Tom, Go strigth',
        time: '2시간전',
        unreadCount: 1,
    },
    {
        id: 3,
        partner: { name: 'Alice', avatarUrl: '' },
        lastMessage: 'Hello. My name is Tom, Go strigth',
        time: '2시간전',
        unreadCount: 1,
    },
    {
        id: 4,
        partner: { name: 'Alice', avatarUrl: '' },
        lastMessage: 'Hello. My name is Tom, Go strigth',
        time: '2시간전',
        unreadCount: 1,
    },
];
