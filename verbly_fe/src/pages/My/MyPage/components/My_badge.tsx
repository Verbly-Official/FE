import React from 'react';
import DefaultBadgeIcon from '../../../../components/Profile/img/medium.svg';

interface AchievementBadge {
  id: string;
  name: string;
}

const My_badge: React.FC = () => {
  const badges: AchievementBadge[] = [
    { id: '1', name: '첫 가입' },
    { id: '2', name: '7일 연속' },
    { id: '3', name: '첫 첨삭' },
    { id: '4', name: '열정왕' },
    { id: '5', name: '소통왕' },
  ];

  return (
    <div className="w-full h-[214px] bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h3 className="text-lg md:text-[20px] text-gray-900">나의 뱃지</h3>
      </div>
      
      {/* 그리드 레이아웃: 모바일 3열, 태블릿 4열, 데스크탑 5열 */}
      <div className="flex flex-start gap-3 md:gap-4">
        {badges.map((badge) => (
          <div 
            key={badge.id} 
            className="flex flex-col items-center gap-2 md:gap-3 group cursor-pointer"
          >
            {/* 뱃지 이미지 영역 */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-[88px] md:h-[88px] rounded-lg md:rounded-[12px] flex items-center justify-center bg-gray-50 border border-gray-100 group-hover:border-violet-200 transition-all overflow-hidden">
              <img 
                src={DefaultBadgeIcon} 
                alt={badge.name}
                className="w-full h-full object-cover opacity-80 transition-opacity" 
              />
            </div>
            
            <span className="text-xs sm:text-sm md:text-[15px] text-violet-50 text-center truncate w-full font-medium">
              {badge.name}
            </span>
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default My_badge;