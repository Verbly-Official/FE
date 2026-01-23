export const MOCK_LIBRARY_WORDS = [
    { word: 'look forward to', translation: '~을 고대하다' },
    { word: 'resilient', translation: '탄력 있는, 회복력 있는' },
    { word: 'procrastinate', translation: '미루다, 지연하다' },
    { word: 'serendipity', translation: '뜻밖의 행운' },
    { word: 'ephemeral', translation: '수명이 짧은, 단명하는' },
    { word: 'eloquent', translation: '웅변을 잘 하는, 유창한' },
    { word: 'meticulous', translation: '꼼꼼한, 세심한' },
    { word: 'ubiquitous', translation: '어디에나 있는' },
    { word: 'aesthetic', translation: '심미적인, 미학적' },
    { word: 'nostalgia', translation: '향수, 과거에 대한 동경' },
    { word: 'ambiguous', translation: '애매모호한' },
    { word: 'comprehensive', translation: '포괄적인, 종합적인' },
    { word: 'innovative', translation: '혁신적인' },
    { word: 'pragmatic', translation: '실용적인' },
    { word: 'authentic', translation: '진정한, 진짜의' },
];

export const MOCK_USER_PROFILE = {
    id: '1',
    name: 'Mark',
    level: 21,
    profileImg: '', // Empty to test default profile
    introduction: 'LV.21',
    role: 'FOREIGNER' as const,
};

export const MOCK_USER_STATS = {
    follow: 24,
    streak: 42,
    point: 150,
    correctionReceived: 20,
};
