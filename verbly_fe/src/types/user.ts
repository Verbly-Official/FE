// 1. 기존 UI 컴포넌트용 인터페이스 (유지)
export interface User {
  progress?: any;
  stats?: any;
  id: string;           // 리스트 렌더링 시 key로 사용
  name: string;         // 이름
  profileImg: string;   // 이미지 주소
  email?: string;       // Small
  phone?: string;       // Small
  introduction: string; // Small
  lastActive?: string;  // Medium 
  level?: number;       // Large
  badges?: string;      // Large 
  isFollowing?: boolean;// 팔로우 여부 Medium
}

// 2. [추가] 인증 스토어(useAuthStore) 및 API 응답용 인터페이스
export interface UserInfo {
  userId: number | string; // 쿠키에선 string, API에선 number로 올 수 있음
  nickname: string;
  profileImage: string;
  email?: string;
  provider?: string;
  status?: string;       // 'NEED_ONBOARDING' | 'ACTIVE'
  nativeLang?: string;   // 'ko' | 'en'
  learningLang?: string; // 'en' | 'ko'
}