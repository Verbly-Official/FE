import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// APIs
import { LogoutModal } from "../../components/AccountActionModal/LogoutModal";
import { WithdrawalModal } from "../../components/AccountActionModal/WithdrawalModal";

// Components
import GNB from "../../components/Nav/GNB";
import SideMenu from "../../components/Nav/SideMenu";
import ProfileCard from "./components/Profilecard";
import Badge from "./components/BadgeSection";
import ExpertList from "./components/ExpertList";
import CorrectionList from "./components/CorrectionList";
import Board from "./components/Board";
import { TextButton } from "../../components/Button";
import KoreanHistoryModal from "./components/KoreanHistoryModal"; // 모달 임포트

// icons
import SortIcon from "../../assets/emoji/sort.svg";

const My_Korean: React.FC = () => {
  const navigate = useNavigate();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  
  // Correction History Modal 상태 관리
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  // 선택된 ID를 저장할 state (나중에 상세 조회 API 호출 시 사용)
  const [selectedHistoryId, setSelectedHistoryId] = useState<number | null>(null);

  // 리스트 아이템 클릭 핸들러
  const handleCorrectionClick = (id: number) => {
    setSelectedHistoryId(id);
    setIsHistoryModalOpen(true);
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-bg0 flex flex-col">
      <GNB />

      <div className="w-full flex flex-1 overflow-hidden mx-auto">
        <SideMenu variant="profile" />

        <main className="flex-1 overflow-hidden relative">
          <div className="w-[111.2%] h-[111.2%] origin-top-left scale-[0.9] overflow-y-auto">
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
                {/* onItemClick props를 전달하여 클릭 이벤트 연동 */}
                <CorrectionList onItemClick={handleCorrectionClick} />
              </div>

              <div className="flex justify-end items-center gap-6 mt-4 mb-8">
                <TextButton
                  onClick={() => setIsLogoutOpen(true)}
                  variant="secondary"
                  size="large"
                >
                  로그아웃
                </TextButton>
                <TextButton
                  onClick={() => setIsWithdrawOpen(true)}
                  variant="secondary"
                  size="large"
                >
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
            
            {/* 상세 조회 모달: 데이터는 아직 빈 객체 전달 */}
            <KoreanHistoryModal
              isOpen={isHistoryModalOpen}
              onClose={() => setIsHistoryModalOpen(false)}
              data={{}} 
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default My_Korean;