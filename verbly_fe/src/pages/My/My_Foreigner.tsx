import React, { useState } from 'react';
import SideMenu from '../../components/Nav/SideMenu';
import ProfileCard from './components/My_profilecard';
import MyBadge from './components/My_badge';
import MyCorrector from './components/My_corrector';
import MyCorrected from './components/My_corrected';
import MyBoard from './components/My_board';
import { Header } from '../../components/Header/Header';
import ExpertHistoryModal from './components/ExpertHistoryModal';

// [Mock Data] MyCorrected 컴포넌트에 전달할 데이터
const MOCK_CORRECTIONS = [
  {
    id: "1",
    title: "How to improve my English speaking skills?",
    date: "2024.01.20",
    correctorName: "Jenny",
  },
  {
    id: "2",
    title: "Where is the bathroom?",
    date: "2024.01.18",
    correctorName: "Mike",
  },
  {
    id: "3",
    title: "What is the difference between 'affect' and 'effect'?",
    date: "2024.01.15",
    correctorName: "Tom",
  },
  {
    id: "4",
    title: "Can you explain the past perfect tense?",
    date: "2024.01.10",
    correctorName: "Sarah",
  },
];

const My_Foreigner = () => {
  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기/닫기 핸들러
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 헤더 */}
      <div className="w-full max-w-[1920px] mx-auto relative z-50">
        <Header />
      </div>

      {/* 메인 레이아웃 */}
      <div className="flex w-full max-w-[1920px] mx-auto">
        
        {/* 사이드 메뉴 */}
        <div className="relative z-40">
          <SideMenu variant="default" />
        </div>

        {/* 메인 콘텐츠 - relative 추가로 absolute 모달의 기준점 설정 */}
        <main className="flex-1 p-[32px] overflow-x-hidden relative min-h-[calc(100vh-60px)]">
          <div className="flex flex-col gap-[24px] mx-auto">
            
            {/* 상단: 프로필 + 뱃지/통계 */}
            <div className="h-auto flex flex-col xl:flex-row gap-[24px]">
              <div className="flex-none xl:w-[40%] h-full flex justify-center xl:block">
                <ProfileCard />
              </div>

              <div className="flex flex-col gap-[24px] flex-1 min-w-0">
                <MyBadge />
                {/* Foreigner 페이지에서는 modalType='foreigner' 전달 */}
                <MyCorrector modalType="foreigner" />
              </div>
            </div>

            {/* 하단: 게시판 + 첨삭 내역 */}
            <div className="flex flex-col gap-[24px] flex-1 w-full min-w-0">
               <div>
                <div className="mb-4 text-lg font-bold text-gray-9">대시보드</div>
                <MyBoard />
               </div>
               
               {/* Correction History 섹션 */}
               <div>
                <div className="mb-4 text-lg font-bold text-gray-9">Correction History</div>
                
                {/* 리스트 클릭 시 모달 열기 */}
                <div 
                  onClick={handleOpenModal} 
                  className="cursor-pointer hover:opacity-90 transition-all active:scale-[0.99]"
                >
                   <MyCorrected data={MOCK_CORRECTIONS} />
                </div>
               </div>
            </div>
          </div>
          
          {/* Foreigner용 모달 (간단한 UI - 추가 버튼 없음) */}
          <ExpertHistoryModal 
            isOpen={isModalOpen} 
            onClose={handleCloseModal}
            expertName="Mark" 
          />
        </main>
      </div>
    </div>
  );
};

export default My_Foreigner;