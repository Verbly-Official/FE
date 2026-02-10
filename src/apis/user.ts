import instance from './axios';
import { type OnboardingRequest, type ApiResponse, type OnboardingResult, type UserInfo } from '../types/user';

/**
 * 온보딩 정보 저장
 */
export const saveOnboardingApi = async (
  data: OnboardingRequest
): Promise<ApiResponse<OnboardingResult>> => {
  const response = await instance.post<ApiResponse<OnboardingResult>>(
    '/api/user/onboarding', 
    data
  );
  return response.data;
};

/**
 * 언어 선택 유효성 검사
 */
export const validateLanguageSelection = (
  nativeLang: string,
  learningLang: string
): { isValid: boolean; error?: string } => {
  if (!nativeLang || !learningLang) {
    return { isValid: false, error: '모든 언어를 선택해주세요.' };
  }
  if (nativeLang === learningLang) {
    return { isValid: false, error: '학습 언어와 모국어는 달라야 합니다.' };
  }
  if (nativeLang.length > 3 || learningLang.length > 3) {
    return { isValid: false, error: '유효하지 않은 언어 코드입니다.' };
  }
  return { isValid: true };
};

/**
 * 내 정보 조회 API (Auth에서 이동됨)
 * 백엔드 엔드포인트: GET /user/me
 */
export const getMyProfileApi = async (): Promise<ApiResponse<UserInfo>> => {
  const response = await instance.get<ApiResponse<UserInfo>>('/api/user/me');
  return response.data;
};

/**
 * 회원 탈퇴
 */
export const withdrawApi = async (): Promise<ApiResponse<void>> => {
  const response = await instance.delete<ApiResponse<void>>('/api/user');
  return response.data;
};

/**
 * 프로필 수정 파라미터 타입
 */
export interface UpdateProfileParams {
  nickname: string;
  bio: string;
  email: string;
  phoneNumber: string;
}

/**
 * ✅ 프로필 수정 API (500 에러 해결 버전)
 * 
 * 주요 개선사항:
 * 1. 파일명에서 특수문자 제거 강화
 * 2. FormData 키 이름 확인
 * 3. Content-Type 자동 설정 보장
 * 4. 디버깅을 위한 콘솔 로그 추가 (개발 환경)
 */
export const updateUserProfileApi = async (
  params: UpdateProfileParams,
  imageFile: File | null
): Promise<ApiResponse<UserInfo>> => {

  const formData = new FormData();

  if (imageFile) {
    // 파일명 sanitization 강화
    const sanitizedFileName = imageFile.name
      .replace(/[()[\]{}]/g, '') // 괄호류 모두 제거
      .replace(/\s+/g, '_')       // 공백을 언더스코어로
      .replace(/[^\w\-_.]/g, '')  // 영문, 숫자, -, _, . 만 허용
      .toLowerCase();             // 소문자로 통일

    // 확장자 확인
    const fileExtension = sanitizedFileName.split('.').pop() || 'jpg';
    const baseFileName = sanitizedFileName.split('.')[0] || 'profile';
    const finalFileName = `${baseFileName}.${fileExtension}`;

    // 새 File 객체 생성
    const sanitizedFile = new File([imageFile], finalFileName, {
      type: imageFile.type || 'image/jpeg',
      lastModified: imageFile.lastModified,
    });

    formData.append('profileImage', sanitizedFile);

    // 개발 환경에서 디버깅 정보 출력
    if (import.meta.env.DEV) {
      console.log('📤 이미지 업로드 정보:', {
        originalName: imageFile.name,
        sanitizedName: finalFileName,
        size: imageFile.size,
        type: imageFile.type,
      });
    }
  }

  // 3️⃣ Query Parameters (빈 문자열 제외)
  const queryParams: Record<string, string> = {
    nickname: params.nickname, // 필수 필드
  };

  if (params.bio?.trim()) {
    queryParams.bio = params.bio;
  }

  if (params.email?.trim()) {
    queryParams.email = params.email;
  }

  if (params.phoneNumber?.trim()) {
    queryParams.phoneNumber = params.phoneNumber;
  }

  // 4️⃣ API 요청
  try {
    const response = await instance.patch<ApiResponse<UserInfo>>(
      '/api/user',
      formData,
      {
        params: queryParams,
        // ⚠️ headers는 명시하지 않음 - axios interceptor가 자동 처리
        // timeout: 30000, // 필요시 타임아웃 설정 (30초)
      }
    );

    return response.data;
  } catch (error) {
    // 에러 상세 정보 로깅
    if (import.meta.env.DEV) {
      console.error('❌ 프로필 업데이트 API 에러:', {
        error,
        params: queryParams,
        hasImage: !!imageFile,
      });
    }
    throw error;
  }
};


/**
 * ✅ 대안 방법 1: 이미지만 별도로 업로드하는 경우
 * 백엔드가 이미지와 정보를 별도 엔드포인트로 받는 경우 사용
 */
export const updateUserProfileWithSeparateImage = async (
  params: UpdateProfileParams,
  imageFile: File | null
): Promise<ApiResponse<UserInfo>> => {
  
  // Step 1: 이미지가 있으면 먼저 업로드
  if (imageFile) {
    const imageFormData = new FormData();
    imageFormData.append('profileImage', imageFile);
    
    await instance.post('/api/user/profile-image', imageFormData);
  }

  // Step 2: 나머지 정보 업데이트
  const response = await instance.patch<ApiResponse<UserInfo>>(
    '/api/user',
    {
      nickname: params.nickname,
      bio: params.bio || undefined,
      email: params.email || undefined,
      phoneNumber: params.phoneNumber || undefined,
    }
  );

  return response.data;
};


/**
 * ✅ 대안 방법 2: 모든 데이터를 JSON Body로 전송 (이미지는 Base64)
 * 백엔드가 Base64 인코딩된 이미지를 받는 경우 사용
 */
export const updateUserProfileWithBase64 = async (
  params: UpdateProfileParams,
  imageFile: File | null
): Promise<ApiResponse<UserInfo>> => {
  
  let base64Image: string | null = null;

  // 이미지를 Base64로 변환
  if (imageFile) {
    base64Image = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(imageFile);
    });
  }

  // JSON으로 모든 데이터 전송
  const response = await instance.patch<ApiResponse<UserInfo>>(
    '/api/user',
    {
      nickname: params.nickname,
      bio: params.bio || null,
      email: params.email || null,
      phoneNumber: params.phoneNumber || null,
      profileImage: base64Image,
    }
  );

  return response.data;
};


/**
 * ✅ 대안 방법 3: PUT 메서드 사용
 * 백엔드가 PATCH 대신 PUT을 요구하는 경우
 */
export const updateUserProfileWithPut = async (
  params: UpdateProfileParams,
  imageFile: File | null
): Promise<ApiResponse<UserInfo>> => {

  const formData = new FormData();

  if (imageFile) {
    formData.append('profileImage', imageFile);
  }

  // 모든 필드를 FormData에 추가
  formData.append('nickname', params.nickname);
  if (params.bio?.trim()) formData.append('bio', params.bio);
  if (params.email?.trim()) formData.append('email', params.email);
  if (params.phoneNumber?.trim()) formData.append('phoneNumber', params.phoneNumber);

  const response = await instance.put<ApiResponse<UserInfo>>(
    '/api/user',
    formData
  );

  return response.data;
};