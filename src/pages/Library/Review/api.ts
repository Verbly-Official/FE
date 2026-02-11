/**
 * 퀴즈 세션 API 서비스 (Swagger 기반)
 * 
 * 백엔드 API 명세:
 * - POST   /api/quizzes/sessions - 퀴즈 세션 시작
 * - POST   /api/quizzes/sessions/{sessionId}/questions/{questionId}/hint - 퀴즈 힌트
 * - POST   /api/quizzes/sessions/{sessionId}/questions/{questionId}/answer - 답 제출
 * - POST   /api/quizzes/sessions/{sessionId}/quit - 퀴즈 중단
 * - GET    /api/quizzes/sessions/{sessionId}/result - 퀴즈 결과 조회
 * - POST   /api/quizzes/sessions/{sessionId}/mistakes/retry - 오답 재도전
 */

import instance from '../../../apis/axios';
import type {
  StartQuizSessionResponse,
  SubmitAnswerRequest,
  SubmitAnswerResponse,
  HintResponse,
  QuitSessionResponse,
  QuizResultResponse,
  RetryMistakesResponse,
} from './types';

// API Response wrapper type
interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

/**
 * 퀴즈 세션 시작
 * POST /api/quizzes/sessions
 */
export async function startQuizSession(): Promise<StartQuizSessionResponse> {
  const response = await instance.post<ApiResponse<StartQuizSessionResponse>>(
    '/api/quizzes/sessions',
    {}
  );
  return response.data.result;
}

/**
 * 답변 제출
 * POST /api/quizzes/sessions/{sessionId}/questions/{questionId}/answer
 */
export async function submitAnswer(
  sessionId: number,
  questionId: number,
  request: SubmitAnswerRequest
): Promise<SubmitAnswerResponse> {
  const response = await instance.post<ApiResponse<SubmitAnswerResponse>>(
    `/api/quizzes/sessions/${sessionId}/questions/${questionId}/answer`,
    request
  );
  return response.data.result;
}

/**
 * 퀴즈 힌트 요청
 * POST /api/quizzes/sessions/{sessionId}/questions/{questionId}/hint
 */
export async function requestHint(
  sessionId: number,
  questionId: number
): Promise<HintResponse> {
  const response = await instance.post<ApiResponse<HintResponse>>(
    `/api/quizzes/sessions/${sessionId}/questions/${questionId}/hint`,
    {}
  );
  return response.data.result;
}

/**
 * 퀴즈 중단
 * POST /api/quizzes/sessions/{sessionId}/quit
 */
export async function quitQuizSession(sessionId: number): Promise<QuitSessionResponse> {
  const response = await instance.post<ApiResponse<QuitSessionResponse>>(
    `/api/quizzes/sessions/${sessionId}/quit`
  );
  return response.data.result;
}

/**
 * 퀴즈 결과 조회
 * GET /api/quizzes/sessions/{sessionId}/result
 */
export async function getQuizResult(sessionId: number): Promise<QuizResultResponse> {
  const response = await instance.get<ApiResponse<QuizResultResponse>>(
    `/api/quizzes/sessions/${sessionId}/result`
  );
  return response.data.result;
}

/**
 * 오답 재도전
 * POST /api/quizzes/sessions/{sessionId}/mistakes/retry
 */
export async function retryMistakes(sessionId: number): Promise<RetryMistakesResponse> {
  const response = await instance.post<ApiResponse<RetryMistakesResponse>>(
    `/api/quizzes/sessions/${sessionId}/mistakes/retry`
  );
  return response.data.result;
}
