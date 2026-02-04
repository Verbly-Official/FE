// src/apis/user.ts
import instance from './axios';
import { type OnboardingRequest, type ApiResponse, type OnboardingResult, type UserInfo } from '../types/user';

/**
 * 온보딩 정보 저장
 * 백엔드 엔드포인트: POST /api/user/onboarding
 * ⚠️ Swagger에 따르면 POST 메서드 사용 (PATCH 아님)
 * 
 * @param data 모국어와 학습 언어 정보
 * @returns 온보딩 완료 결과
 */
export const saveOnboardingApi = async (
  data: OnboardingRequest
): Promise<ApiResponse<OnboardingResult>> => {
  // ✅ 수정: /api 접두사 제거 (baseURL에 이미 포함됨)
  const response = await instance.post<ApiResponse<OnboardingResult>>(
    '/user/onboarding',  // ❌ 기존: '/api/user/onboarding'
    data
  );
  return response.data;
};

/**
 * 클라이언트 측 언어 선택 유효성 검사
 * 백엔드 요청 전 사전 검증용
 * 
 * @param nativeLang 모국어 코드
 * @param learningLang 학습 언어 코드
 * @returns 유효성 검사 결과
 */
export const validateLanguageSelection = (
  nativeLang: string,
  learningLang: string
): { isValid: boolean; error?: string } => {
  if (!nativeLang || !learningLang) {
    return {
      isValid: false,
      error: '모든 언어를 선택해주세요.',
    };
  }

  if (nativeLang === learningLang) {
    return {
      isValid: false,
      error: '학습 언어와 모국어는 달라야 합니다.',
    };
  }

  // 백엔드 @Size(max=3) 제약 대응
  if (nativeLang.length > 3 || learningLang.length > 3) {
    return {
      isValid: false,
      error: '유효하지 않은 언어 코드입니다.',
    };
  }

  return { isValid: true };
};

/**
 * 회원 탈퇴 API
 * 백엔드 엔드포인트: DELETE /api/user
 * ⚠️ 백엔드 명세 확인 필요
 */
export const withdrawApi = async (): Promise<ApiResponse<void>> => {
  const response = await instance.delete<ApiResponse<void>>('/user');
  return response.data;
};

/**
 * 프로필 수정 API
 * ⚠️ 백엔드 명세 특이사항 반영:
 * - 텍스트 정보(nickname, bio 등) -> Query Parameter로 전송
 * - 이미지 파일(profileImage) -> Multipart/form-data Body로 전송
 * 
 * @param params 수정할 텍스트 정보 (닉네임, 소개, 이메일, 전화번호)
 * @param imageFile 수정할 프로필 이미지 파일 (없으면 null)
 */
export interface UpdateProfileParams {
  nickname: string;
  bio: string;
  email: string;
  phoneNumber: string;
}

export const updateUserProfileApi = async (
  params: UpdateProfileParams,
  imageFile: File | null
): Promise<ApiResponse<UserInfo>> => {
  
  // 1. Multipart Form 데이터 생성 (이미지용)
  const formData = new FormData();
  if (imageFile) {
    formData.append('profileImage', imageFile);
  }

  // 2. Query Parameter와 Multipart Body를 함께 전송
  // instance.patch(url, body, config) 형태
  const response = await instance.patch<ApiResponse<UserInfo>>(
    '/user/profile', // ⚠️ 백엔드 API 명세에 맞게 경로 확인 필요
    formData,        // Body: 이미지 파일
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {      // Query Params: 텍스트 정보
        nickname: params.nickname,
        bio: params.bio,
        email: params.email,
        phoneNumber: params.phoneNumber,
      },
    }
  );
  return response.data;
};