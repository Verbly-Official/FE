// Temporary mock data for WordDetailPage (until API integration)
export const MOCK_WORD_DATA = {
    word: 'look forward to',
    meaning: '~을 고대하다, 기대하다 (expect with pleasure)',
    corrections: [
        {
            id: '1',
            wrong: 'looking forward to meet',
            correct: 'looking forward to meeting',
            wrongSentence: 'I am looking forward to meet you next week.',
            correctSentence: 'I am looking forward to meeting you next week.',
            corrector: {
                name: 'Mark',
                isNative: true,
                avatar: null,
            },
            explanation: 'After "look forward to", we always use a noun or gerund (-ing), not the base form of the verb. "To" here is a preposition, not part of the infinitive.',
        },
    ],
    examples: [
        {
            id: '1',
            english: 'Thank you, I look forward to hearing from you.',
            korean: '감사합니다. 좋은 결과 기대하겠습니다.',
            highlight: 'look forward',
        },
        {
            id: '2',
            english: 'I look forward to the opportunity to work for you.',
            korean: '감사합니다. 좋은 결과 기대하겠습니다.',
            highlight: 'look forward',
        },
    ],
};
