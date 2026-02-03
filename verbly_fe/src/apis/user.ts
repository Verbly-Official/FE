import instance from './axios';

// 백엔드 요청 DTO에 맞춘 인터페이스
interface OnboardingRequest {
  nativeLang: string;   // @NotBlank, @Size(max=3)
  learningLang: string; // @NotBlank, @Size(max=3)
}

// 온보딩 정보 저장 API
export const saveOnboardingApi = async (data: OnboardingRequest) => {
  // 백엔드 명세에 따른 엔드포인트 입력 (예: /users/onboarding)
  const response = await instance.patch('/users/onboarding', data);
  return response.data;
};