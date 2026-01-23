/**
 * 퀴즈 세션 API 서비스
 * 
 * 백엔드 API 명세:
 * - GET    /api/quizzes/sessions - 퀴즈 세션 시작
 * - POST   /api/quizzes/sessions/{sessionId}/questions/{questionId}/hint - 퀴즈 힌트
 * - POST   /api/quizzes/sessions/{sessionId}/questions/{questionId}/answer - 답 제출
 * - POST   /api/quizzes/sessions/{sessionId}/quit - 퀴즈 중단
 * - GET    /api/quizzes/sessions/{sessionId}/result - 퀴즈 결과 조회
 * - POST   /api/quizzes/sessions/{sessionId}/mistakes/retry - 오답 재도전
 */

import type {
  QuizSession,
  SubmitAnswerRequest,
  SubmitAnswerResponse,
  // QuizResult, // 현재 사용되지 않음
  DailyGoalStats,
  StreakInfo,
} from './types';
import { MOCK_QUIZ_SESSION, MOCK_DAILY_GOAL_STATS, MOCK_STREAK_INFO } from './mockData';

// TODO: 실제 API 엔드포인트로 변경
// const API_BASE_URL = '/api/quizzes';

/**
 * 퀴즈 세션 시작
 * GET /api/quizzes/sessions
 */
export async function startQuizSession(): Promise<QuizSession> {
  // TODO: 실제 API 호출로 교체
  // const response = await fetch(`${API_BASE_URL}/sessions`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     // 'Authorization': `Bearer ${token}`,
  //   },
  // });
  // if (!response.ok) throw new Error('Failed to start quiz session');
  // return response.json();

  // MOCK 데이터 반환 (개발용)
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_QUIZ_SESSION), 300);
  });
}

/**
 * 답변 제출
 * POST /api/quizzes/sessions/{sessionId}/questions/{questionId}/answer
 */
 
export async function submitAnswer(
  _sessionId: string,
  _questionId: string,
  request: SubmitAnswerRequest
): Promise<SubmitAnswerResponse> {
  // TODO: 실제 API 호출로 교체
  // const response = await fetch(
  //   `${API_BASE_URL}/sessions/${sessionId}/questions/${questionId}/answer`,
  //   {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // 'Authorization': `Bearer ${token}`,
  //     },
  //     body: JSON.stringify(request),
  //   }
  // );
  // if (!response.ok) throw new Error('Failed to submit answer');
  // return response.json();

  // MOCK 응답 (개발용)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        isCorrect: Math.random() > 0.5,
        correctAnswer: request.answer,
        explanation: 'This is a mock explanation.',
      });
    }, 200);
  });
}

/**
 * 퀴즈 힌트 요청
 * POST /api/quizzes/sessions/{sessionId}/questions/{questionId}/hint
 */
// 현재 사용되지 않아 주석처리
// export async function requestHint(
//   _sessionId: string,
//   _questionId: string,
// ): Promise<{ hint: string }> {
//   // TODO: 실제 API 호출로 교체
//   // const response = await fetch(
//   //   `${API_BASE_URL}/sessions/${sessionId}/questions/${questionId}/hint`,
//   //   {
//   //     method: 'POST',
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //       // 'Authorization': `Bearer ${token}`,
//   //     },
//   //   }
//   // );
//   // if (!response.ok) throw new Error('Failed to get hint');
//   // return response.json();

//   // MOCK 응답 (개발용)
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({ hint: 'This is a mock hint.' });
//     }, 200);
//   });
// }

/**
 * 퀴즈 중단
 * POST /api/quizzes/sessions/{sessionId}/quit
 */
// 현재 사용되지 않아 주석처리
// export async function quitQuizSession(_sessionId: string): Promise<void> {
//   // TODO: 실제 API 호출로 교체
//   // const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/quit`, {
//   //   method: 'POST',
//   //   headers: {
//   //     'Content-Type': 'application/json',
//   //     // 'Authorization': `Bearer ${token}`,
//   //   },
//   // });
//   // if (!response.ok) throw new Error('Failed to quit quiz session');

//   // MOCK 응답 (개발용)
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(), 100);
//   });
// }

/**
 * 퀴즈 결과 조회
 * GET /api/quizzes/sessions/{sessionId}/result
 */
// 현재 사용되지 않아 주석처리
// export async function getQuizResult(sessionId: string): Promise<QuizResult> {
//   // TODO: 실제 API 호출로 교체
//   // const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/result`, {
//   //   method: 'GET',
//   //   headers: {
//   //     'Content-Type': 'application/json',
//   //     // 'Authorization': `Bearer ${token}`,
//   //   },
//   // });
//   // if (!response.ok) throw new Error('Failed to get quiz result');
//   // return response.json();

//   // MOCK 응답 (개발용)
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         sessionId: sessionId,
//         totalQuestions: 10,
//         correctAnswers: 7,
//         accuracy: 70,
//         completedAt: new Date().toISOString(),
//       });
//     }, 200);
//   });
// }

/**
 * 오답 재도전
 * POST /api/quizzes/sessions/{sessionId}/mistakes/retry
 */
// 현재 사용되지 않아 주석처리
// export async function retryMistakes(_sessionId: string): Promise<QuizSession> {
//   // TODO: 실제 API 호출로 교체
//   // const response = await fetch(
//   //   `${API_BASE_URL}/sessions/${sessionId}/mistakes/retry`,
//   //   {
//   //     method: 'POST',
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //       // 'Authorization': `Bearer ${token}`,
//   //     },
//   //   }
//   // );
//   // if (!response.ok) throw new Error('Failed to retry mistakes');
//   // return response.json();

//   // MOCK 응답 (개발용)
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(MOCK_QUIZ_SESSION), 300);
//   });
// }

/**
 * Daily Goal 통계 조회
 */
export async function getDailyGoalStats(): Promise<DailyGoalStats> {
  // TODO: 실제 API 호출로 교체
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_DAILY_GOAL_STATS), 200);
  });
}

/**
 * Streak 정보 조회
 */
export async function getStreakInfo(): Promise<StreakInfo> {
  // TODO: 실제 API 호출로 교체
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_STREAK_INFO), 200);
  });
}
