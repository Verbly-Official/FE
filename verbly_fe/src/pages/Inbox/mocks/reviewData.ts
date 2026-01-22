export interface Review {
    id: number;
    author: string;
    role: string;
    rating: number;
    date: string;
    content: string;
    avatarUrl?: string;
}

export const mockReviews: Review[] = [
    {
        id: 1,
        author: 'Mark',
        role: 'Native Speaker',
        rating: 5,
        date: '2 days ago',
        content: 'After "look forward to", we always use a noun or gerund (-ing), not the base form of the verb. "To" here is a preposition, not part of the infinitive.',
        avatarUrl: ''
    },
    {
        id: 2,
        author: 'Mark',
        role: 'Native Speaker',
        rating: 5,
        date: '2 days ago',
        content: 'After "look forward to", we always use a noun or gerund (-ing), not the base form of the verb. "To" here is a preposition, not part of the infinitive.',
        avatarUrl: ''
    },
    {
        id: 3,
        author: 'Mark',
        role: 'Native Speaker',
        rating: 5,
        date: '2 days ago',
        content: 'After "look forward to", we always use a noun or gerund (-ing), not the base form of the verb. "To" here is a preposition, not part of the infinitive.',
        avatarUrl: ''
    },
];
