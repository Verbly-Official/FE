// ===== Quiz API Response Types (Swagger 기반) =====

/**
 * 퀴즈 세션 시작 응답
 * POST /api/quizzes/sessions
 */
export interface StartQuizSessionResponse {
  sessionId: number;
  totalQuestions: number;
  currentIndex: number;
  firstQuestion: QuizQuestion;
  createdAt: string;
}

/**
 * 퀴즈 질문
 */
export interface QuizQuestion {
  questionId: number;
  libraryItemId: number;
  phrase: string;
  questionType: string;
  prompt: string;
  options: string[];
}

/**
 * 답변 제출 요청
 * POST /api/quizzes/sessions/{sessionId}/questions/{questionId}/answer
 */
export interface SubmitAnswerRequest {
  userAnswerJson: {
    answer: string;
  };
}

/**
 * 답변 제출 응답
 */
export interface SubmitAnswerResponse {
  questionId: number;
  isCorrect: boolean;
  correctAnswerKeyJson: Record<string, any>;
  explanation: string;
  currentIndex: number;
  totalQuestions: number;
  sessionCompleted: boolean;
  nextQuestion?: QuizQuestion;
}

/**
 * 힌트 요청 응답
 * POST /api/quizzes/sessions/{sessionId}/questions/{questionId}/hint
 */
export interface HintResponse {
  questionId: number;
  hintUsed: number;
  hintTotal: number;
  hintRemaining: number;
  hint: string;
}

/**
 * 퀴즈 중단 응답
 * POST /api/quizzes/sessions/{sessionId}/quit
 */
export interface QuitSessionResponse {
  sessionId: number;
  status: string;
}

/**
 * 퀴즈 결과 조회 응답
 * GET /api/quizzes/sessions/{sessionId}/result
 */
export interface QuizResultResponse {
  sessionId: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  accuracyPercent: number;
  mistakes: QuizMistake[];
}

/**
 * 오답 정보
 */
export interface QuizMistake {
  questionId: number;
  libraryItemId: number;
  phrase: string;
  prompt: string;
  userAnswerJson: Record<string, any>;
  correctAnswerKeyJson: Record<string, any>;
  explanation: string;
}

/**
 * 오답 재도전 응답
 * POST /api/quizzes/sessions/{sessionId}/mistakes/retry
 */
export interface RetryMistakesResponse {
  sessionId: number;
  totalQuestions: number;
  currentIndex: number;
  firstQuestion: QuizQuestion;
  createdAt: string;
}

// ===== UI State Types =====

/**
 * 퀴즈 진행 상태
 */
export type QuizStatus = 'idle' | 'in-progress' | 'completed' | 'quit';

/**
 * Daily Goal 통계 (UI용)
 */
export interface DailyGoalStats {
  currentWords: number;
  goalWords: number;
  percentage: number;
}

/**
 * Streak 정보 (UI용)
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
