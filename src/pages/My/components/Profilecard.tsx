import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/useAuthStore'; 
import DefaultProfile from '../../../components/Profile/img/large.svg';
import OutlinedButton from '../../../components/Button/OutlinedButton';
import ProgressIndicator from '../../../components/ProgressIndicator/ProgressIndicator';


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
  const navigate = useNavigate();
  const { userInfo } = useAuthStore();

  const userData = {
    name: userInfo?.nickname || user?.name || 'User',
    profileImage: userInfo?.profileImage || user?.profileImage,
    followers: userInfo?.followCount ?? user?.followers ?? 0,
    following: userInfo?.streakDays ?? user?.following ?? 0,
    points: userInfo?.point ?? user?.points ?? 0,
    level: userInfo?.level ?? user?.level ?? 1,
  };

  const displayImage = userData.profileImage || DefaultProfile;
  
  // 레벨 진행도 계산
  const levelProgress = Math.min((userData.points / 300) * 100, 100);
  const displayPercentage = Math.round(levelProgress); //반올림

  return (
    <div className="w-[615px] h-[547px] bg-[image:var(--gradient-1-main)] rounded-lg md:rounded-xl border border-gray-2 overflow-hidden shadow-sm flex flex-col transition-all duration-300">
  
      {/* 상단 투명 영역 (배경 그라데이션 노출) */}
      <div className="h-[205px] w-full flex-shrink-0"></div>

      {/* 하단 콘텐츠 영역 (흰색 배경) */}
      <div className="flex-1 bg-[var(--color-white)] rounded-lg md:rounded-xl flex flex-col px-[42px] pb-[24px]">
        
        {/* 프로필 이미지 & 수정 버튼 */}
        <div className="flex justify-between items-end -ml-[12px] -mt-[95px] mb-[4px]">
          <div className="relative z-10">
            <img 
              src={displayImage} 
              alt="프로필" 
              className="w-[180px] h-[180px] rounded-full object-cover bg-[var(--color-white)]"
              onError={(e) => {
                e.currentTarget.src = DefaultProfile;
              }}
            />
          </div>
          
          <div className="mb-1">
            <OutlinedButton
              label="프로필 수정" 
              onClick={() => navigate('/my/editProfile')} 
              size="small" 
              variant="assistive"
              className="text-[length:var(--fs-button1)]"
            />
          </div>
        </div>

        {/* 이름 영역 */}
        <div className="mb-[24px]">
          <h2 className="text-[28px] font-bold text-gray-9 truncate">
            {userData.name}
          </h2>
        </div>

        {/* 스탯 정보 (Follow, Streak, Point) */}
        <div className="flex justify-start items-center w-full gap-4 mb-[24px]">
          <div className="flex items-start gap-[4px] ">
            <span className="text-[length:var(--fs-body1)] text-gray-9 font-bold">{userData.followers}</span>
            <span className="text-[length:var(--fs-body1)] text-gray-5">Follow</span>
          </div>
          <div className="flex items-start gap-[4px]">
            <span className="text-[length:var(--fs-body1)] text-gray-9 font-bold">{userData.following}</span>
            <span className="text-[length:var(--fs-body1)] text-gray-5">Streak</span>
          </div>
          <div className="flex items-start gap-[4px]">
            <span className="text-[length:var(--fs-body1)] text-gray-9 font-bold">{userData.points}</span>
            <span className="text-[length:var(--fs-body1)] text-gray-5">Point</span>
          </div>
        </div>

        {/* 레벨 프로그레스 바 영역 */}
        <div className="pt-[24px] border-t border-gray-2">
          <ProgressIndicator
            variant="linear"
            value={levelProgress}
            size="medium"
            labelLeft="Level"
            className="text-[length:var(--fs-body2)] !text-gray-6 font-medium"
          />
          <div className="flex justify-end mt-2">
            <span className="text-[length:var(--fs-body1)] text-gray-6 font-medium">
              Lv.{userData.level} ({displayPercentage}%)
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profilecard;