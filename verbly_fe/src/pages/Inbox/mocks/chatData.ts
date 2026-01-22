import type { Partner } from '../../../types/chat';

export interface Chatroom {
    id: string;
    partner: Partner;
    lastMessage: string;
    time: string;
    unreadCount: number;
}

export const mockChatrooms: Chatroom[] = [
    {
        id: '1',
        partner: {
            id: 'partner-1',
            name: 'Mark',
            status: 'online',
            isNativeSpeaker: true,
            avatarUrl: '',
        },
        lastMessage: 'Hello. My name is Tom, Go strigth',
        time: '2시간전',
        unreadCount: 1,
    },
    {
        id: '2',
        partner: {
            id: 'partner-2',
            name: 'Alice',
            status: 'online',
            isNativeSpeaker: false,
            avatarUrl: '',
        },
        lastMessage: 'Hello. My name is Tom, Go strigth',
        time: '2시간전',
        unreadCount: 1,
    },
    {
        id: '3',
        partner: {
            id: 'partner-3',
            name: 'Tom',
            status: 'online',
            isNativeSpeaker: true,
            avatarUrl: '',
        },
        lastMessage: 'Hello. My name is Tom, Go strigth',
        time: '2시간전',
        unreadCount: 1,
    },
    {
        id: '4',
        partner: {
            id: 'partner-4',
            name: 'Sophie',
            status: 'online',
            isNativeSpeaker: true,
            avatarUrl: '',
        },
        lastMessage: 'Great! See you tomorrow.',
        time: '3시간전',
        unreadCount: 0,
    },
];
