import React from 'react';
// 뱃지 플레이스홀더용이므로 medium 사이즈 사용
import DefaultBadgeIcon from '../../../components/Profile/img/medium.svg';

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
    <div className="w-full h-[40%] bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[20px] text-gray-900">나의 뱃지</h3>
      </div>
      
      <div className="flex flex-wrap gap-x-4 gap-y-6 justify-between sm:justify-start">
        {badges.map((badge) => (
          <div 
            key={badge.id} 
            className="w-[88px] h-[118px] flex flex-col items-center gap-3 group cursor-pointer"
          >
            {/* 뱃지 이미지 영역 */}
            <div className="w-[88px] h-[88px] rounded-[12px] flex items-center justify-center bg-gray-50 border border-gray-100 group-hover:border-violet-200 transition-all overflow-hidden">
               <img 
                 src={DefaultBadgeIcon} 
                 alt={badge.name}
                 className="w-full h-full object-cover opacity-80 transition-opacity" 
               />
            </div>
            
            <span className="text-[15px] text-violet-50 text-center truncate w-full font-medium">
              {badge.name}
            </span>
          </div>
        ))}
        
        {/* 빈 슬롯 예시 */}
        {[...Array(5 - badges.length)].map((_, i) => (
          <div key={`empty-${i}`} className="w-[88px] h-[118px] flex flex-col items-center gap-3 opacity-30">
            <div className="w-[88px] h-[88px] rounded-[12px] bg-gray-100 flex items-center justify-center border border-gray-200">
               <img src={DefaultBadgeIcon} alt="Locked" className="w-full h-full object-cover grayscale opacity-50" />
            </div>
            <span className="text-xs text-gray-400">-</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default My_badge;