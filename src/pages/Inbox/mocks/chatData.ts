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
        lastMessage: 'I have went to the store yesterday.',
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
        lastMessage: 'That makes sense! What about "then" vs "than"?',
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
    {
        id: '5',
        partner: {
            id: 'partner-5',
            name: 'James',
            status: 'away',
            isNativeSpeaker: true,
            avatarUrl: '',
        },
        lastMessage: 'OK, let me know if you need more help.',
        time: '5시간전',
        unreadCount: 0,
    },
    {
        id: '6',
        partner: {
            id: 'partner-6',
            name: 'Emma',
            status: 'online',
            isNativeSpeaker: false,
            avatarUrl: '',
        },
        lastMessage: 'Is "I am looking forward to see you" correct?',
        time: '1일전',
        unreadCount: 2,
    },
    {
        id: '7',
        partner: {
            id: 'partner-7',
            name: 'David',
            status: 'away',
            isNativeSpeaker: true,
            avatarUrl: '',
        },
        lastMessage: 'The weather is really nice today!',
        time: '2일전',
        unreadCount: 0,
    },
    {
        id: '8',
        partner: {
            id: 'partner-8',
            name: 'Chloe',
            status: 'online',
            isNativeSpeaker: true,
            avatarUrl: '',
        },
        lastMessage: 'I just wanted to say thanks for yesterday\'s lesson.',
        time: '3일전',
        unreadCount: 0,
    },
    {
        id: '9',
        partner: {
            id: 'partner-9',
            name: 'Lucas',
            status: 'online',
            isNativeSpeaker: false,
            avatarUrl: '',
        },
        lastMessage: 'Can you check my homework please?',
        time: '4일전',
        unreadCount: 5,
    },
    {
        id: '10',
        partner: {
            id: 'partner-10',
            name: 'Mia',
            status: 'away',
            isNativeSpeaker: true,
            avatarUrl: '',
        },
        lastMessage: 'See you at the meeting!',
        time: '1주일전',
        unreadCount: 0,
    },
];
