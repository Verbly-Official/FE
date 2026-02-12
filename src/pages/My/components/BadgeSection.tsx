import React, { useEffect, useState } from 'react';
// API
import { getMyProfileApi } from '../../../apis/user'; 

// Icons
import FireIcon from '../../../assets/emoji/fire1.svg';
import AttendanceIcon from '../img/attendance.svg';
import FirstPostIcon from '../img/firstPost.svg';
import Like50Icon from '../img/Like50.svg';

// Badge 인터페이스
interface AchievementBadge {
  id: string;
  name: string;
  icon: string;
  acquired: boolean;
  description?: string;
}

// API 응답 데이터 타입 정의 (현재 사용 가능한 필드만 정의)
interface UserProfileData {
  userId: number;
  nickname: string;
  streakDays: number;      // 연속 출석 일수
  totalPosts: number;      // 작성한 게시글 수
  [key: string]: any;
}

const BadgeSection: React.FC = () => {
  const [badges, setBadges] = useState<AchievementBadge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getMyProfileApi();
        
        if (response && response.isSuccess && response.result) {
          const user = response.result as UserProfileData;
          
          // 총 좋아요 수는 Home API 연동 전까지 0으로 고정 (또는 테스트 값 입력)
          const totalLikes = 0; 

          // 뱃지 획득 조건 설정
          const dynamicBadges: AchievementBadge[] = [
            { 
              id: '1', 
              name: '성실한출석왕', 
              icon: AttendanceIcon,
              acquired: (user.streakDays || 0) >= 7, // 7일 연속 출석
              description: '7일 연속 출석 달성'
            },
            { 
              id: '2', 
              name: '첫걸음마', 
              icon: FirstPostIcon,
              acquired: (user.totalPosts || 0) > 0, // 게시글 1개 이상 작성
              description: '첫 게시글 업로드 완료'
            },
            { 
              id: '3', 
              name: '소통의중심', 
              icon: Like50Icon,
              acquired: totalLikes >= 50, // API 연동 제외 (변수값 기준)
              description: '받은 좋아요 50개 달성'
            },
          ];

          // 획득한 뱃지만 필터링
          const acquiredBadges = dynamicBadges.filter(badge => badge.acquired);
          setBadges(acquiredBadges);
        }
      } catch (error) {
        console.error("뱃지 정보 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="w-full h-[214px] bg-[var(--color-white)] rounded-xl shadow-sm border border-gray-2 p-4 md:p-5 flex flex-col">
      <div className="flex justify-start items-center mb-3 md:mb-4 gap-[8px] flex-none">
        <img src={FireIcon} alt="icon" className="w-5 h-5 md:w-6 md:h-6" />
        <h3 className="text-[length:var(--fs-subtitle1)] text-gray-9">뱃지 관리</h3>
      </div>
      
      <div className="flex-1 overflow-hidden">
        {badges.length > 0 ? (
          <div className="flex flex-wrap items-start gap-2 md:gap-3">
            {badges.map((badge) => (
              <div 
                key={badge.id} 
                className="flex flex-col items-center gap-1.5 md:gap-2 group cursor-pointer"
                title={badge.description}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-[84px] md:h-[84px] rounded-lg md:rounded-[12px] flex items-center justify-center bg-gray-1 transition-all overflow-hidden">
                  <img 
                    src={badge.icon} 
                    alt={badge.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <span className="text-[length:var(--fs-subtitle3)] font-bold text-violet-50 text-center truncate w-full max-w-[56px] sm:max-w-[64px] md:max-w-[84px]">
                  {badge.name}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-4 gap-2">
             {!loading && (
               <span className="text-[length:var(--fs-body2)] text-gray-6">
                 아직 획득한 뱃지가 없어요
               </span>
             )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BadgeSection;