import React from 'react';
import { useNavigate } from 'react-router-dom'; // [추가] 라우팅 훅 임포트
import DefaultProfile from '../../../components/Profile/img/large.svg'; 
import { OutlinedButton } from '../../../components/Button';
import LinearProgress from '../../../components/ProgressIndicator/LinearProgress';

interface UserProfileProps {
  user?: {
    name: string;
    profileImage?: string;
    followers: number;
    following: number;
    points: number;
    level: number;
  };
}

const Profilecard: React.FC<UserProfileProps> = ({ user }) => {
  const navigate = useNavigate(); // [추가] navigate 함수 생성

  const userData = user || {
    name: "Alice",
    profileImage: null,
    followers: 24,
    following: 42,
    points: 150,
    level: 3,
  };

  return (
    <div className="w-full h-full bg-white rounded-xl md:rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col transition-all duration-300">
      
      {/* 1. 배너 높이 */}
      <div className="h-30 sm:h-28 md:h-52 bg-[image:var(--gradient-1-main)] w-full"></div>

      <div className="flex-1 flex flex-col px-4 sm:px-5 md:px-6 pb-4 md:pb-6">
        
        {/* 2. 프로필 이미지 영역 */}
        <div className="flex justify-between items-end -mt-10 sm:-mt-12 md:-mt-14 mb-3 md:mb-5">
          <div className="relative z-10">
            <img 
              src={userData.profileImage || DefaultProfile} 
              alt="프로필" 
              className="w-[180px] h-[180pxs] rounded-full object-cover bg-gray-50 border-[3px] md:border-4 border-white shadow-sm"
            />
          </div>
          
          <div className="mb-0.5 md:mb-1">
            <OutlinedButton
              label="프로필 수정" 
              // [수정] 클릭 시 프로필 수정 페이지로 이동
              onClick={() => navigate('/editProfile')} 
              size="small" 
              variant="assistive"
              className="!px-2.5 !py-1 md:!px-3 md:!py-1.5 !text-[11px] sm:!text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            />
          </div>
        </div>

        {/* 3. 이름 폰트 크기 반응형 */}
        <div className="mb-4 md:mb-6">
          <h2 className="text-xl sm:text-[22px] md:text-2xl font-bold text-gray-900 truncate">
            {userData.name}
          </h2>
        </div>

        {/* 4. 스탯 정보: 그리드 간격 조정 */}
        <div className="flex justify-start items-center w-full mb-6 md:mb-8 px-1 md:px-2 gap-3 md:gap-4">
          <div className="flex items-start gap-0.5">
            <span className="text-sm md:text-10px text-gray-9">{userData.followers}</span>
            <span className="text-sm md:text-10px text-gray-5">Follow</span>
          </div>
          <div className="flex items-start gap-0.5">
            <span className="text-sm md:text-10px text-gray-9">{userData.following}</span>
            <span className="text-sm md:text-10px text-gray-5">Streak</span>
          </div>
          <div className="flex items-start gap-0.5">
            <span className="text-sm md:text-10px text-gray-9">{userData.points}</span>
            <span className="text-sm md:text-10px text-gray-5">Point</span>
          </div>
        </div>

        {/* 5. 하단 레벨 바 */}
        <div className="border-t border-gray-100 pt-4 mt-auto">
          <div className="flex justify-between items-end mb-2">
            <span className="text-gray-900 text-sm font-semibold">Level</span>
            <span className="text-[11px] sm:text-xs text-gray-400 font-medium">
              Lv.{userData.level} ({userData.points}/300)
            </span>
          </div>
          <LinearProgress 
            value={50} 
            className="h-2 md:h-2.5 rounded-full bg-gray-100 [&>div]:bg-[var(--primary-color)]" 
          />
        </div>
      </div>
    </div>
  );
};

export default Profilecard;