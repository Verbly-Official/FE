import instance from './axios';

// --- Type Definitions ---

export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

export interface PlanDto {
  planId?: number; 
  name: string;
  price: number;
  billingCycle: 'MONTHLY' | 'YEARLY';
}

export interface KakaoReadyResult {
  tid: string;
  next_redirect_pc_url: string;
  next_redirect_mobile_url: string;
}

// 페이팔 Complete 요청을 위한 Request Body 인터페이스
export interface PaypalCompleteRequest {
  subscriptionId: string; // 페이팔 구독 ID (I-로 시작)
  planId: number;         // 구매한 플랜 ID
}

// --- API Functions ---

/**
 * 결제 플랜 리스트 반환 API
 * GET /api/payment/plan
 */
export const getPaymentPlansApi = async (): Promise<ApiResponse<PlanDto[]>> => {
  const response = await instance.get<ApiResponse<PlanDto[]>>('/api/payment/plan');
  return response.data;
};

/**
 * 카카오페이 결제 준비 요청 API
 * POST /api/payment/ready
 */
export const readyPaymentApi = async (planId: number): Promise<ApiResponse<KakaoReadyResult>> => {
  const response = await instance.post<ApiResponse<KakaoReadyResult>>(
    '/api/payment/ready',
    null,
    { params: { planId } }
  );
  return response.data;
};

/**
 * 페이팔 결제 준비 요청 API
 * POST /api/payment/paypal/ready
 * @param planId 구독할 플랜 ID
 * @returns ApiResponse<string> (result 필드에 리다이렉트 URL이 문자열로 직접 들어옴)
 */
export const readyPaypalApi = async (planId: number): Promise<ApiResponse<string>> => {
  const response = await instance.post<ApiResponse<string>>(
    '/api/payment/paypal/ready',
    null, 
    { params: { planId } }
  );
  return response.data;
};

/**
 * 페이팔 결제 최종 승인 요청 API
 * POST /api/payment/paypal/complete
 * @param data { subscriptionId, planId }
 */
export const completePaypalApi = async (data: PaypalCompleteRequest): Promise<ApiResponse<string>> => {
  const response = await instance.post<ApiResponse<string>>(
    '/api/payment/paypal/complete',
    data // 파라미터가 아닌 Body로 전송
  );
  return response.data;
};