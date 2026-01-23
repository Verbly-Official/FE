import React, { useState } from 'react';
import SideMenu from '../../components/Nav/SideMenu';
import ProfileCard from './components/My_profilecard';
import MyBadge from './components/My_badge';
import MyCorrector from './components/My_corrector';
import MyBanner from './components/My_banner';
import MyCorrected from './components/My_corrected';
import MyBoard from './components/My_board';
import { Header } from '../../components/Header/Header';
import type { User } from '../../types/user';
import KoreanHistoryModal from './components/KoreanHistoryModal';

// 테스트용 유저 데이터
const MOCK_USER: User = {
  id: "user1",
  name: "Test User",
  profileImg: "https://via.placeholder.com/150",
  introduction: "Hello, I am using this app.",
  progress: {},
  stats: {}
};

// MOCK_CORRECTIONS 데이터
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

const My_Korean = () => {
  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기/닫기 핸들러
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header 영역 (z-50) */}
      <div className="w-full max-w-[1920px] mx-auto relative z-50">
        <Header />
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div className="flex w-full max-w-[1920px] mx-auto">
        
        {/* 좌측 사이드 메뉴 (z-40) */}
        <div className="relative z-40">
          <SideMenu variant="default" />
        </div>

        {/* 페이지 내용 (Main) - relative 설정으로 모달 기준점 */}
        <main className="flex-1 p-[32px] overflow-x-hidden relative min-h-[calc(100vh-60px)]">
          <div className="flex flex-col gap-[24px] mx-auto">
            
            {/* 상단 섹션 */}
            <div className="h-auto flex flex-col xl:flex-row gap-[24px]">
              <div className="flex-none xl:w-[40%] h-full flex justify-center xl:block">
                <ProfileCard />
              </div>

              <div className="flex flex-col gap-[24px] flex-1 min-w-0">
                <MyBadge />
                {/* Korean 페이지에서는 modalType='korean' 전달 */}
                <MyCorrector modalType="korean" />
              </div>
            </div>

            {/* 하단 섹션 */}
            <div className="flex flex-col gap-[24px] flex-1 w-full min-w-0">
               <MyBanner />
               
               <div>
                <div className="mb-4 text-lg font-bold text-gray-9">대시보드</div>
                <MyBoard />
               </div>
               
               <div>
                <div className="mb-4 text-lg font-bold text-gray-9">Correction History</div>
                
                {/* 리스트 클릭 시 모달 열기 */}
                <div 
                  onClick={handleOpenModal} 
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                   <MyCorrected data={MOCK_CORRECTIONS} />
                </div>
               </div>
            </div>
          </div>
          
          {/* Korean용 모달 (추가 버튼 포함) */}
          <KoreanHistoryModal 
            isOpen={isModalOpen} 
            onClose={handleCloseModal}
            expertName="Mark"
          />
        </main>
      </div>
    </div>
  );
};

export default My_Korean;