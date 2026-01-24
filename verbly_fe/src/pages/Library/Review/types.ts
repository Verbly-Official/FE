// ===== API Response Types (백엔드 연결용) =====

/**
 * 퀴즈 세션 정보
 * API: GET /api/quizzes/sessions
 */
export interface QuizSession {
  sessionId: string;
  totalQuestions: number;
  currentQuestionIndex: number;
  questions: QuizQuestion[];
}

/**
 * 퀴즈 질문 타입
 */
export interface QuizQuestion {
  id: string;
  questionId: string;
  type: 'FILL_IN_BLANK' | 'MULTIPLE_CHOICE' | 'SHORT_ANSWER';
  sentence: string;
  answer: string;
  options?: QuizOption[];
  highlighted: {
    text: string;
    position: 'start' | 'middle' | 'end';
  };
}

/**
 * 퀴즈 옵션
 */
export interface QuizOption {
  id: string;
  text: string;
}

/**
 * 답변 제출 요청
 * API: POST /api/quizzes/sessions/{sessionId}/questions/{questionId}/answer
 */
export interface SubmitAnswerRequest {
  answer: string;
}

/**
 * 답변 제출 응답
 */
export interface SubmitAnswerResponse {
  isCorrect: boolean;
  correctAnswer: string;
  explanation?: string;
}

/**
 * 퀴즈 결과
 * API: GET /api/quizzes/sessions/{sessionId}/result
 */
export interface QuizResult {
  sessionId: string;
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  completedAt: string;
}

/**
 * Daily Goal 통계
 */
export interface DailyGoalStats {
  currentWords: number;
  goalWords: number;
  percentage: number;
}

/**
 * Streak 정보
 */
export interface StreakInfo {
  currentStreak: number;
  streakBonus: string;
}

/**
 * 일일 리뷰 통계 (UI 표시용)
 */
export interface DailyReviewStats {
  completed: number;
  total: number;
  accuracy: number;
  streak: number;
  streakBonus: string;
}

// ===== UI State Types =====

/**
 * 퀴즈 진행 상태
 */
export type QuizStatus = 'idle' | 'in-progress' | 'completed' | 'quit';

/**
 * 퀴즈 세션 상태 (프론트엔드 상태 관리용)
 */
export interface QuizSessionState {
  sessionId: string | null;
  status: QuizStatus;
  currentQuestionIndex: number;
  questions: QuizQuestion[];
  answers: Record<string, string>; // questionId -> answer
  results: Record<string, boolean>; // questionId -> isCorrect
}
