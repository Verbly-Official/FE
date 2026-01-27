import React from 'react';
// Components
import GNB from '../../../components/Nav/GNB';
import SideMenu from '../../../components/Nav/SideMenu';
import ProfileCard from './components/My_profilecard';
import MyBadge from './components/My_badge';
import MyCorrector from './components/My_corrector';
import MyCorrected from './components/My_corrected';
import MyBoard from './components/My_board';

// Hooks & Data
import { MOCK_CORRECTIONS } from '../mockData';

//icons
import SortIcon from '../../../assets/emoji/sort.svg';

const My_Foreigner: React.FC = () => {

  return (
    <div className="w-full bg-[#F8FAFC] flex flex-col flex-1 overflow-hidden min-h-screen">
      {/* Header */}
      <GNB />

      {/* Main Content Wrapper */}
      <div className="w-full flex flex-col justify-center md:flex-row flex-1 overflow-hidden mx-auto">
        
        {/* Left Sidebar */}
        <SideMenu variant="default" />

        {/* Content Area */}
        <main className="flex-1 flex flex-col gap-[38px] px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-8 overflow-y-auto">
          
          {/* 상단: 프로필 + 뱃지/통계 */}
          <div className="flex flex-col xl:flex-row gap-[24px]">
            <div className="flex-none xl:w-[40%] flex justify-center xl:block">
              <ProfileCard />
            </div>

            <div className="flex flex-col gap-[24px] flex-1 min-w-0">
              <MyBadge />
              <MyCorrector modalType="foreigner" />
            </div>
          </div>

          <div>
            <div className="mb-4 text-lg font-bold text-gray-9 flex flex-start gap-[8px]"> 
              <img src={SortIcon} alt="sort" className="w-6 h-6 md:w-8 md:h-8" />
              대시보드</div>
            <MyBoard />
          </div>
            
          <div>
            <div className="mb-4 text-lg font-bold text-gray-9 flex flex-start gap-[8px]"> 
              <img src={SortIcon} alt="sort" className="w-6 h-6 md:w-8 md:h-8" />
              Correction History</div>
            <MyCorrected data={MOCK_CORRECTIONS} />
          </div>

        </main>
      </div>
    </div>
  );
};

export default My_Foreigner;