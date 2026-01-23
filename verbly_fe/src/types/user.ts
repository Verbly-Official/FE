export interface User {
  id: string;           // 리스트 렌더링 시 key로 사용
  name: string;         // 이름
  role: 'KOREAN' | 'FOREIGNER'; // 유저 역할
  profileImg: string;   // 이미지 주소
  introduction: string; // Small
  lastActive?: string;  // Medium 
  level?: number;       // Large
  badges?: string;      // Large 
  isFollowing?: boolean;// 팔로우 여부 Medium
}