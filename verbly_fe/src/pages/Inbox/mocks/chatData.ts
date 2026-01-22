import type { Partner } from '../../../types/chat';

export interface ChatRoom {
    id: number;
    partner: Partner;
    lastMessage: string;
    time: string;
    unreadCount: number;
}

export const mockChatrooms: ChatRoom[] = [
    {
        id: 1,
        partner: {
            id: 'partner-1',
            name: 'Mark',
            avatarUrl: '',
            status: 'online',
            isNativeSpeaker: true,
        },
        lastMessage: 'The sentence "Can we discuss about this later after lunch time?" is incorrect because...',
        time: '2시간전',
        unreadCount: 3,
    },
    {
        id: 2,
        partner: {
            id: 'partner-2',
            name: 'Sarah',
            avatarUrl: '',
            status: 'online',
            isNativeSpeaker: true,
        },
        lastMessage: 'Let me explain the difference between "affect" and "effect"...',
        time: '5시간전',
        unreadCount: 1,
    },
    {
        id: 3,
        partner: {
            id: 'partner-3',
            name: 'Tom',
            avatarUrl: '',
            status: 'offline',
            isNativeSpeaker: false,
        },
        lastMessage: 'Thanks for your help!',
        time: '어제',
        unreadCount: 0,
    },
    {
        id: 4,
        partner: {
            id: 'partner-4',
            name: 'Emma',
            avatarUrl: '',
            status: 'online',
            isNativeSpeaker: true,
        },
        lastMessage: 'Here\'s a more natural way to say that...',
        time: '1일전',
        unreadCount: 10,
    },
    {
        id: 5,
        partner: {
            id: 'partner-5',
            name: 'James',
            avatarUrl: '',
            status: 'away',
            isNativeSpeaker: false,
        },
        lastMessage: 'Could you check this sentence for me?',
        time: '2일전',
        unreadCount: 0,
    },
    {
        id: 6,
        partner: {
            id: 'partner-6',
            name: 'Lisa',
            avatarUrl: '',
            status: 'online',
            isNativeSpeaker: true,
        },
        lastMessage: 'OK',
        time: '3일전',
        unreadCount: 25,
    },
    {
        id: 7,
        partner: {
            id: 'partner-7',
            name: 'David',
            avatarUrl: '',
            status: 'offline',
            isNativeSpeaker: true,
        },
        lastMessage: 'In English, we typically use "discuss" without "about" when it\'s followed by a direct object...',
        time: '1주일전',
        unreadCount: 0,
    },
    {
        id: 8,
        partner: {
            id: 'partner-8',
            name: 'Sophie',
            avatarUrl: '',
            status: 'online',
            isNativeSpeaker: false,
        },
        lastMessage: 'Great! See you tomorrow.',
        time: '1주일전',
        unreadCount: 1,
    },
];
