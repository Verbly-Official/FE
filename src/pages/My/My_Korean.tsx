import React from 'react';
import { useNavigate } from 'react-router-dom';

// APIs
import { handleLogout } from '../../apis/auth'; //
import { withdrawApi } from '../../apis/user'; //

// Components
import GNB from '../../components/Nav/GNB';
import SideMenu from '../../components/Nav/SideMenu';
import ProfileCard from './components/Profilecard';
import Badge from './components/BadgeSection';
import ExpertList from './components/ExpertList';
import Banner from './components/Banner';
import CorrectionList from './components/CorrectionList';
import Board from './components/Board';
import { TextButton } from '../../components/Button';

// icons
import SortIcon from '../../assets/emoji/sort.svg';

const My_Korean: React.FC = () => {
  const navigate = useNavigate();

  // 로그아웃 핸들러
  const onLogoutClick = async () => {
    const isConfirmed = window.confirm("정말 로그아웃 하시겠습니까?");
    if (isConfirmed) {
      try {
        await handleLogout(); 
      } catch (error) {
        console.error("로그아웃 실패:", error);
        alert("로그아웃 중 오류가 발생했습니다.");
      }
    }
  };

  // 회원탈퇴 핸들러
  const onWithdrawalClick = async () => {
    const isConfirmed = window.confirm(
      "정말 탈퇴하시겠습니까?\n탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다."
    );

    if (isConfirmed) {
      try {
        await withdrawApi();
        alert("회원 탈퇴가 완료되었습니다.\n이용해 주셔서 감사합니다.");
        
        // 탈퇴 성공 시 로그아웃 처리 (토큰 삭제 및 리다이렉트)
        await handleLogout(); 
      } catch (error) {
        console.error("회원탈퇴 실패:", error);
        alert("회원 탈퇴 처리에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className="w-full bg-[#F8FAFC] flex flex-col flex-1 overflow-hidden min-h-screen">
      <GNB />

      <div className="w-full flex flex-col md:flex-row flex-1 overflow-hidden mx-auto">
        <SideMenu variant="default" />

        <main className="flex-1 flex flex-col overflow-y-auto">
          {/* 컨테이너 레이아웃 적용 */}
          <div className="w-full max-w-[1800px] mx-auto px-4 py-6 md:px-8 lg:px-12 flex flex-col gap-[38px]">
            
            {/* 상단 영역: 프로필 vs 오른쪽 컨텐츠 */}
            <div className="flex flex-col xl:flex-row gap-[29px] items-start">
              
              {/* Left: Profile Card  */}
              <div className="w-full xl:w-[620px] flex-none flex justify-center xl:block overflow-hidden rounded-2xl">
                <ProfileCard />
              </div>

              {/* Right: Badge & Expert List */}
              <div className="flex flex-col gap-[27px] flex-1 w-full min-w-0">
                <Badge />
                <ExpertList modalType="native" />
              </div>
            </div>
            
            <Banner/>

            {/* Dashboard */}
            <div className="flex flex-col gap-[18px]">
              <div className="text-lg font-bold text-gray-9 flex items-center gap-[8px]"> 
                <img src={SortIcon} alt="sort" className="w-6 h-6" />
                대시보드
              </div>
              <Board />
            </div>
              
            {/* Correction History */}
            <div className="flex flex-col gap-[18px]">
              <div className="text-lg font-bold text-gray-9 flex items-center gap-[8px]"> 
                <img src={SortIcon} alt="sort" className="w-6 h-6" />
                Correction History
              </div>
              <CorrectionList />
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end items-center gap-6 mt-4 mb-8">
              <TextButton onClick={onLogoutClick} variant='secondary' size='large'>
                로그아웃
              </TextButton>
              <TextButton onClick={onWithdrawalClick} variant='secondary' size='large'>
                회원탈퇴
              </TextButton>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default My_Korean;