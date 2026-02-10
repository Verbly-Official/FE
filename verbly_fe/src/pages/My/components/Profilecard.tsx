import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/useAuthStore'; 
import DefaultProfile from '../../../components/Profile/img/large.svg'; // 경로 확인 필요
import OutlinedButton from '../../../components/Button/OutlinedButton'; // 경로 확인 필요
import ProgressIndicator from '../../../components/ProgressIndicator/ProgressIndicator'; // 경로 확인 필요


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
  // ✅ 스토어에서 로그인한 최신 유저 정보 가져오기
  const { userInfo } = useAuthStore();

  // ✅ [API 연동] UI 변수명에 맞춰 실제 데이터 매핑
  const userData = {
    // 1. 이름 & 이미지
    name: userInfo?.nickname || user?.name || 'User',
    profileImage: userInfo?.profileImage || user?.profileImage,
    
    // 2. 스탯 매핑
    // UI의 "Follow" -> API의 followCount
    followers: userInfo?.followCount ?? user?.followers ?? 0,
    
    // UI의 "Streak" (변수명 following 유지) -> API의 streakDays
    following: userInfo?.streakDays ?? user?.following ?? 0,
    
    // UI의 "Point" -> API의 point
    points: userInfo?.point ?? user?.points ?? 0,
    
    // UI의 "Level" -> API의 level
    level: userInfo?.level ?? user?.level ?? 1,
  };

  // 프로필 이미지가 없으면 기본 이미지 사용
  const displayImage = userData.profileImage || DefaultProfile;

  // 레벨 진행률 계산 (최대 100%)
  const levelProgress = Math.min((userData.points / 300) * 100, 100);

  return (
    <div className="w-[615px] h-[547px] bg-white rounded-xl md:rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col transition-all duration-300">
  
      {/* 1. 배너 높이 */}
      <div className="h-30 sm:h-28 md:h-54 bg-[image:var(--gradient-1-main)] w-full"></div>

      <div className="max-h-35 flex-1 flex flex-col px-4 sm:px-5 md:px-6 pb-4 md:pb-6">
        
        {/* 2. 프로필 이미지 영역 */}
        <div className="flex justify-between max-h-35 items-end -mt-10 sm:-mt-12 md:-mt-14 mb-3 md:mb-5">
          <div className="relative z-10">
            <img 
              src={displayImage} 
              alt="프로필" 
              // ⚠️ 원본 코드의 오타 수정 (180pxs -> 180px) 하여 이미지가 보이도록 함
              className="w-[180px] h-[180px] rounded-full object-cover bg-white border-[3px] md:border-4 border-white shadow-sm"
              onError={(e) => {
                // 이미지 로드 실패 시 기본 이미지로 대체
                e.currentTarget.src = DefaultProfile;
              }}
            />
          </div>
          
          <div className="mb-0.5 md:mb-1">
            <OutlinedButton
              label="프로필 수정" 
              // [수정] 실제 라우트 경로인 '/my/edit'로 연결 (이전 작업 기준)
              onClick={() => navigate('/my/editProfile')} 
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
        <div className="flex justify-start items-center w-full mb-6 md:mb-8 px-1 md:px-2 gap-[20px] md:gap-4">
          <div className="flex items-start gap-[4px] ">
            <span className="text-sm md:text-10px text-gray-9">{userData.followers}</span>
            <span className="text-sm md:text-10px text-var(--gray-5-hover)">Follow</span>
          </div>
          <div className="flex items-start gap-[4px]">
            {/* UI상 "Streak" 라벨이므로 userData.following 변수에 API streakDays 값을 넣음 */}
            <span className="text-sm md:text-10px text-gray-9">{userData.following}</span>
            <span className="text-sm md:text-10px text-var(--gray-5-hover)">Streak</span>
          </div>
          <div className="flex items-start gap-[4px]">
            <span className="text-sm md:text-10px text-gray-9">{userData.points}</span>
            <span className="text-sm md:text-10px text-var(--gray-5-hover)">Point</span>
          </div>
        </div>

        {/* 5. 하단 레벨 바 */}
        <div className="border-t border-gray-100 pt-4 mt-auto">
          <ProgressIndicator
            variant="linear" // 핵심: 선형 그래프를 사용하기 위해 지정
            value={levelProgress}
            size="medium"
            labelLeft="Level"
            // 수정: JSX에서 변수를 문자열과 섞어 쓸 때는 중괄호 {}와 백틱 ``을 사용해야 합니다.
            labelRight={`Lv.${userData.level} (${userData.points}/300)`}
        />
        </div>
      </div>
    </div>
  );
};

export default Profilecard;