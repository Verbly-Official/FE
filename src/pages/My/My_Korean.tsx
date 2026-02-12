import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// APIs
import { LogoutModal } from '../../components/AccountActionModal/LogoutModal';
import { WithdrawalModal } from '../../components/AccountActionModal/WithdrawalModal';

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
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  // 기존 API 직접 호출 로직 제거 후 모달 state 변경 함수로 교체
  const onLogoutClick = () => setIsLogoutOpen(true);
  const onWithdrawalClick = () => setIsWithdrawOpen(true);
  return (
    <div className="w-full bg-bg0 flex flex-col flex-1 overflow-hidden min-h-screen">
      <GNB />

      <div className="w-full flex flex-col md:flex-row flex-1 overflow-hidden mx-auto">
        <SideMenu variant="default" />

        <main className="flex-1 flex flex-col overflow-y-auto relative">
          <div className="w-full max-w-[1800px] mx-auto px-4 py-6 md:px-8 lg:px-12 flex flex-col gap-[38px]">
            
            <div className="flex flex-col xl:flex-row gap-[29px] items-start">
              
              <div className="w-full xl:w-[620px] flex-none flex justify-center xl:block overflow-hidden rounded-2xl">
                <ProfileCard />
              </div>

              <div className="flex flex-col gap-[27px] flex-1 w-full min-w-0">
                <Badge />
                <ExpertList modalType="korean" />
              </div>
            </div>
            
            <Banner/>

            {/* Dashboard */}
            <div className="flex flex-col gap-[18px]">
              <div className="text-[length:var(--fs-subtitle1)] font-bold text-gray-9 flex items-center gap-[8px]"> 
                <img src={SortIcon} alt="sort" className="w-6 h-6" />
                대시보드
              </div>
              <Board />
            </div>
              
            {/* Correction History */}
            <div className="flex flex-col gap-[18px]">
              <div className="text-[length:var(--fs-subtitle1)] font-bold text-gray-9 flex items-center gap-[8px]"> 
                <img src={SortIcon} alt="sort" className="w-6 h-6" />
                Correction History
              </div>
              <CorrectionList />
            </div>

            <div className="flex justify-end items-center gap-6 mt-4 mb-8">
              <TextButton onClick={() => setIsLogoutOpen(true)} variant='secondary' size='large'>
                로그아웃
              </TextButton>
              <TextButton onClick={() => setIsWithdrawOpen(true)} variant='secondary' size='large'>
                회원탈퇴
              </TextButton>
            </div>
          </div>

          <LogoutModal 
            isOpen={isLogoutOpen} 
            onClose={() => setIsLogoutOpen(false)} 
          />
          <WithdrawalModal 
            isOpen={isWithdrawOpen} 
            onClose={() => setIsWithdrawOpen(false)} 
          />
        </main>
      </div>
    </div>
  );
};

export default My_Korean;