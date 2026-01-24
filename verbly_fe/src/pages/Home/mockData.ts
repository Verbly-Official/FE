/**
 * ===== MOCK DATA =====
 * 개발 및 테스트용 목업 데이터
 * 실제 백엔드 연결 시 api.ts의 함수들이 실제 API를 호출하도록 수정하면 됨
 *
 * 백엔드 API 명세 참고:
 * - GET  /api/library/items - 라이브러리 목록
 * - GET  /api/quizzes/sessions - 퀴즈 세션 시작
 * - POST /api/quizzes/sessions/{sessionId}/questions/{questionId}/answer - 답 제출
 */

import type {
  QuizQuestion,
  QuizSession,
  DailyReviewStats,
  DailyGoalStats,
  StreakInfo,
} from "./types.ts";

export const MOCK_USER_PROFILE = {
  id: "1",
  name: "Mark",
  level: 21,
  profileImg: "", // Empty to test default profile
  introduction: "LV.21",
  role: "FOREIGNER" as const,
};

export const MOCK_USER_STATS = {
  follow: 24,
  streak: 42,
  point: 150,
  correctionReceived: 20,
};

// ===== 퀴즈 결과 목업 데이터 =====
export const MOCK_RESULT = {
  time: "5m 23s",
  streak: 7,
  accuracy: 80,
  xpEarned: 250,
  mistakes: [
    {
      id: "1",
      word: "nevertheless",
      userAnswer: "However",
      correctAnswer: "Nevertheless",
      sentence: "The weather was bad; ______, we went hiking.",
      explanation:
        '"Nevertheless" is used to show contrast despite the previous statement.',
    },
    {
      id: "2",
      word: "intricate",
      userAnswer: "Simple",
      correctAnswer: "Complex",
      sentence: "The pattern on the carpet was very ______.",
      explanation:
        '"Intricate" means having many complex details, so "complex" is the appropriate synonym.',
    },
  ],
  addedWords: [
    { word: "nevertheless", reviewDate: "12.31" },
    { word: "intricate", reviewDate: "12.31" },
  ],
};

// ===== 퀴즈 질문 목업 데이터 =====
export const MOCK_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "1",
    questionId: "q1",
    type: "FILL_IN_BLANK",
    sentence: "I visited the Han River with my friends last weekend.",
    answer: "visited",
    highlighted: {
      text: "visited",
      position: "middle",
    },
    options: [
      { id: "1", text: "Visited" },
      { id: "2", text: "Visit" },
      { id: "3", text: "Visiting" },
      { id: "4", text: "Visits" },
    ],
  },
  {
    id: "2",
    questionId: "q2",
    type: "FILL_IN_BLANK",
    sentence: "She [completed] her homework before dinner.",
    answer: "completed",
    highlighted: {
      text: "completed",
      position: "middle",
    },
    options: [
      { id: "a", text: "Complete" },
      { id: "b", text: "Completed" },
      { id: "c", text: "Completing" },
      { id: "d", text: "Completes" },
    ],
  },
  {
    id: "3",
    questionId: "q3",
    type: "FILL_IN_BLANK",
    sentence: "The weather [was] beautiful yesterday.",
    answer: "was",
    highlighted: {
      text: "was",
      position: "middle",
    },
    options: [
      { id: "a", text: "Is" },
      { id: "b", text: "Are" },
      { id: "c", text: "Was" },
      { id: "d", text: "Were" },
    ],
  },
  {
    id: "4",
    questionId: "q4",
    type: "FILL_IN_BLANK",
    sentence: "We [should] leave early tomorrow.",
    answer: "should",
    highlighted: {
      text: "should",
      position: "middle",
    },
    options: [
      { id: "a", text: "Will" },
      { id: "b", text: "Should" },
      { id: "c", text: "Must" },
      { id: "d", text: "Can" },
    ],
  },
  {
    id: "5",
    questionId: "q5",
    type: "FILL_IN_BLANK",
    sentence: "They [have] been waiting for an hour.",
    answer: "have",
    highlighted: {
      text: "have",
      position: "middle",
    },
    options: [
      { id: "a", text: "Has" },
      { id: "b", text: "Have" },
      { id: "c", text: "Had" },
      { id: "d", text: "Having" },
    ],
  },
  {
    id: "6",
    questionId: "q6",
    type: "FILL_IN_BLANK",
    sentence: "The book [is] on the table.",
    answer: "is",
    highlighted: {
      text: "is",
      position: "middle",
    },
    options: [
      { id: "a", text: "Is" },
      { id: "b", text: "Are" },
      { id: "c", text: "Was" },
      { id: "d", text: "Were" },
    ],
  },
  {
    id: "7",
    questionId: "q7",
    type: "FILL_IN_BLANK",
    sentence: "He [likes] to play soccer.",
    answer: "likes",
    highlighted: {
      text: "likes",
      position: "middle",
    },
    options: [
      { id: "a", text: "Like" },
      { id: "b", text: "Likes" },
      { id: "c", text: "Liked" },
      { id: "d", text: "Liking" },
    ],
  },
  {
    id: "8",
    questionId: "q8",
    type: "FILL_IN_BLANK",
    sentence: "We [are] going to the park.",
    answer: "are",
    highlighted: {
      text: "are",
      position: "middle",
    },
    options: [
      { id: "a", text: "Is" },
      { id: "b", text: "Are" },
      { id: "c", text: "Was" },
      { id: "d", text: "Were" },
    ],
  },
  {
    id: "9",
    questionId: "q9",
    type: "FILL_IN_BLANK",
    sentence: "She [wrote] a letter yesterday.",
    answer: "wrote",
    highlighted: {
      text: "wrote",
      position: "middle",
    },
    options: [
      { id: "a", text: "Write" },
      { id: "b", text: "Writes" },
      { id: "c", text: "Wrote" },
      { id: "d", text: "Written" },
    ],
  },
  {
    id: "10",
    questionId: "q10",
    type: "FILL_IN_BLANK",
    sentence: "They [will] arrive soon.",
    answer: "will",
    highlighted: {
      text: "will",
      position: "middle",
    },
    options: [
      { id: "a", text: "Will" },
      { id: "b", text: "Would" },
      { id: "c", text: "Can" },
      { id: "d", text: "Could" },
    ],
  },
];

// ===== 퀴즈 세션 목업 데이터 =====
export const MOCK_QUIZ_SESSION: QuizSession = {
  sessionId: "mock-session-123",
  totalQuestions: MOCK_QUIZ_QUESTIONS.length,
  currentQuestionIndex: 0,
  questions: MOCK_QUIZ_QUESTIONS,
};

// ===== Daily Review 통계 목업 데이터 =====
export const MOCK_DAILY_REVIEW_STATS: DailyReviewStats = {
  completed: 4,
  total: 10,
  accuracy: 76,
  streak: 3,
  streakBonus: "+5pt",
};

// ===== Daily Goal 통계 목업 데이터 =====
export const MOCK_DAILY_GOAL_STATS: DailyGoalStats = {
  currentWords: 76,
  goalWords: 100,
  percentage: 76,
};

// ===== Streak 정보 목업 데이터 =====
export const MOCK_STREAK_INFO: StreakInfo = {
  currentStreak: 3,
  streakBonus: "+5pt",
};
