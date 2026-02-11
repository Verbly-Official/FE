import React, { useEffect, useState } from 'react';
import DefaultBadgeIcon from '../../../components/Profile/img/medium.svg'; 
import FireIcon from '../../../assets/emoji/fire1.svg';
import { getMyProfileApi } from '../../../apis/user'; 

interface AchievementBadge {
  id: string;
  name: string;
  acquired: boolean;
}

const BadgeSection: React.FC = () => {
  const [badges, setBadges] = useState<AchievementBadge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getMyProfileApi();
        if (response && response.isSuccess && response.result) {
          const user = response.result;
          
          const dynamicBadges: AchievementBadge[] = [
            { id: '1', name: '첫 가입', acquired: true },
            { id: '2', name: '7일 연속', acquired: (user.streakDays || 0) >= 7 },
            { id: '3', name: '첫 첨삭', acquired: (user.correctionsGiven || 0) > 0 },
          ];

          // ✅ [수정] 획득한(acquired === true) 뱃지만 필터링하여 저장
          // 획득하지 못한 뱃지는 배열에 포함되지 않아 화면에 렌더링되지 않습니다.
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
    <div className="w-full h-[214px] bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5 flex flex-col">
      <div className="flex justify-start items-center mb-3 md:mb-4 gap-[8px] flex-none">
        <img src={FireIcon} alt="icon" className="w-5 h-5 md:w-6 md:h-6" />
        <h3 className="text-base md:text-lg font-bold text-gray-900">뱃지 관리</h3>
      </div>
      
      <div className="flex-1 overflow-hidden">
        {badges.length > 0 ? (
          <div className="flex flex-wrap items-start gap-2 md:gap-3">
            {badges.map((badge) => (
              <div 
                key={badge.id} 
                // 획득한 뱃지만 표시되므로 흑백 처리 클래스 제거
                className="flex flex-col items-center gap-1.5 md:gap-2 group cursor-pointer"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-[84px] md:h-[84px] rounded-lg md:rounded-[12px] flex items-center justify-center bg-gray-50 border border-gray-100 transition-all overflow-hidden">
                  <img 
                    src={DefaultBadgeIcon} 
                    alt={badge.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <span className="text-xs sm:text-[13px] md:text-[14px] text-violet-50 text-center truncate w-full max-w-[56px] sm:max-w-[64px] md:max-w-[84px] font-medium">
                  {badge.name}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            {loading ? '로딩 중...' : '보유한 뱃지가 없습니다.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default BadgeSection;