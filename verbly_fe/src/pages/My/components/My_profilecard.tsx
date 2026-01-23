import React from 'react';
// 크기에 맞는 기본 이미지 Import (112px 크기이므로 large 사용)
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

const My_profilecard: React.FC<UserProfileProps> = ({ user }) => {
  const userData = user || {
    name: "Alice",
    profileImage: null,
    followers: 120,
    following: 45,
    points: 150,
    level: 3,
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      {/* 상단 배경 배너 */}
      <div className="h-70 bg-[image:var(--gradient-1-main)] w-full"></div>

      <div className="px-6 pb-6 flex-1 flex flex-col h-full">
        {/* 프로필 이미지 & 편집 버튼 */}
        <div className="relative flex justify-between items-end -mt-14 mb-4">
          <div className="p-1 bg-white rounded-full relative z-10">
            <img 
              // userData.profileImage가 없으면 large.svg 사용
              src={userData.profileImage || DefaultProfile} 
              alt="프로필" 
              className="w-[180px] h-[180px] rounded-full object-cover bg-gray-50 border border-gray-100"
            />
          </div>
          <div className="mb-1">
             <OutlinedButton
               label="프로필 수정" 
               onClick={() => {}} 
               size="small" 
               variant="assistive"
               className="!px-3"
             />
          </div>
        </div>

        {/* 유저 정보 (이름) */}
        <div className="mb-6">
          <h2 className="text-[28px] font-bold text-gray-9">{userData.name}</h2>
        </div>

        {/* 스탯 정보 */}
        <div className="flex justify-start items-center w-full mb-8 px-2 gap-4">
          <div className="flex items-start gap-0.5">
            <span className="text-10px text-gray-9">{userData.followers}</span>
            <span className="text-10px text-gray-5">Follow</span>
          </div>
          <div className="flex items-start gap-0.5">
            <span className="text-10px text-gray-9">{userData.following}</span>
            <span className="text-10px  text-gray-5">Streak</span>
          </div>
          <div className="flex items-start gap-0.5">
            <span className="text-10px text-gray-9">{userData.points}</span>
            <span className="text-10px text-gray-5">Point</span>
          </div>
        </div>

        {/* 레벨 정보 */}
        <div className="border-t border-gray-100 pt-5 mt-auto">
            <div className="flex justify-between items-center mb-2">
                <span className="text-gray-9 text-sm">Level</span>
            </div>
            <LinearProgress 
                value={50} 
                className="h-2 rounded-full bg-gray-100" 
            />
            <p className="text-right text-xs text-gray-400 mt-1">Lv.{userData.level} ({userData.points} / 300 XP)</p>
        </div>
      </div>
    </div>
  );
};

export default My_profilecard;