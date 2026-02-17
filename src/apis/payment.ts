import instance from './axios';

// --- Type Definitions ---

export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

/**
 * 실제 서버 응답 기반 DTO
 * { "planId": 1, "name": "월간", "price": 2, "billingCycle": "MONTHLY" }
 */
export interface PlanDto {
  planId: number;
  name: string;
  price: number;
  billingCycle: 'MONTHLY' | 'YEARLY';
}

/**
 * 카카오페이 결제 준비 응답 DTO
 */
export interface KakaoReadyResult {
  tid: string;
  next_redirect_pc_url: string;
  next_redirect_mobile_url: string;
}

// --- API Functions ---

/**
 * 결제 플랜 리스트 조회 API
 * GET /api/payment/plan
 */
export const getPaymentPlansApi = async (): Promise<ApiResponse<PlanDto[]>> => {
  const response = await instance.get<ApiResponse<PlanDto[]>>('/api/payment/plan');
  return response.data;
};

/**
 * 카카오페이 결제 준비 요청 API
 * POST /api/payment/ready
 * @param planId 구독할 플랜 ID
 */
export const readyPaymentApi = async (planId: number): Promise<ApiResponse<KakaoReadyResult>> => {
  // ✅ 수정됨: 백엔드의 @RequestParam에 맞춰 Query Parameter로 전송
  const response = await instance.post<ApiResponse<KakaoReadyResult>>(
    '/api/payment/ready',
    null, // Body는 비움
    {
      params: { planId }, // URL에 ?planId=1 형태로 붙음
    }
  );
  return response.data;
};