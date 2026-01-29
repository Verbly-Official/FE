import React from 'react';
// Components
import GNB from '../../components/Nav/GNB';
import SideMenu from '../../components/Nav/SideMenu';
import ProfileCard from './components/Profilecard';
import Badge from './components/BadgeSection';
import ExpertList from './components/ExpertList';
import Banner from './components/Banner';
import CorrectionList from './components/CorrectionList';
import Board from './components/Board';

// Hooks & Data
import { MOCK_CORRECTIONS } from './mockData';

//icons
import SortIcon from '../../assets/emoji/sort.svg';

const My_Korean: React.FC = () => {
  return (
    <div className="w-full bg-[#F8FAFC] flex flex-col flex-1 overflow-hidden min-h-screen">
      <GNB />

      <div className="w-full flex flex-col md:flex-row flex-1 overflow-hidden mx-auto">
        <SideMenu variant="default" />

        <main className="flex-1 flex flex-col gap-[38px] px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-8 overflow-y-auto">
          
          <div className="flex flex-col xl:flex-row gap-[24px]">
            <div className="flex-none xl:w-[40%] flex justify-center xl:block">
              <ProfileCard />
            </div>

            <div className="flex flex-col gap-[24px] flex-1 min-w-0">
              <Badge />
              <ExpertList modalType="korean" />
            </div>
          </div>

          <Banner />
            
            <div>
              <div className="mb-4 text-lg font-bold text-gray-9 flex flex-start gap-[8px]"> 
                <img src={SortIcon} alt="sort" className="w-6 h-6 md:w-8 md:h-8" />
                대시보드</div>
              <Board />
            </div>
            
            <div>
              <div className="mb-4 text-lg font-bold text-gray-9 flex flex-start gap-[8px]"> 
                <img src={SortIcon} alt="sort" className="w-6 h-6 md:w-8 md:h-8" />
                Correction History</div>
              <CorrectionList data={MOCK_CORRECTIONS} />
            </div>

        </main>
      </div>
    </div>
  );
};

export default My_Korean;