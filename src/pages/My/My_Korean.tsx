import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// APIs
import { LogoutModal } from "../../components/AccountActionModal/LogoutModal";
import { WithdrawalModal } from "../../components/AccountActionModal/WithdrawalModal";
import { completePaypalApi } from "../../apis/payment";

// Components
import GNB from "../../components/Nav/GNB";
import SideMenu from "../../components/Nav/SideMenu";
import ProfileCard from "./components/Profilecard";
import Badge from "./components/BadgeSection";
import ExpertList from "./components/ExpertList";
import Banner from "./components/Banner";
import CorrectionList from "./components/CorrectionList";
import Board from "./components/Board";
import { TextButton } from "../../components/Button";
import KoreanHistoryModal from "./components/KoreanHistoryModal";

// icons
import SortIcon from "../../assets/emoji/sort.svg";

const My_Korean: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  // Correction History Modal 상태 관리
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedHistoryId, setSelectedHistoryId] = useState<number | null>(null);

  // PayPal 결제 완료 처리 상태
  const [paypalStatus, setPaypalStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [paypalMessage, setPaypalMessage] = useState<string>("");

  // ✅ PayPal 리다이렉트 감지 및 complete API 호출
  useEffect(() => {
    const subscriptionId = searchParams.get("subscription_id");
    const planId = searchParams.get("planId");

    if (!subscriptionId || !planId) return;

    const completePaypal = async () => {
      setPaypalStatus("loading");
      setPaypalMessage("결제를 처리하는 중입니다...");

      try {
        const response = await completePaypalApi({
          subscriptionId,
          planId: Number(planId),
        });

        if (response.isSuccess) {
          setPaypalStatus("success");
          setPaypalMessage("구독이 완료되었습니다! 🎉");
        } else {
          setPaypalStatus("error");
          setPaypalMessage(response.message || "결제 처리에 실패했습니다.");
        }
      } catch (error: any) {
        console.error("PayPal complete 실패:", error);
        setPaypalStatus("error");
        setPaypalMessage(
          error.response?.data?.message || "결제 처리 중 오류가 발생했습니다."
        );
      } finally {
        // URL에서 쿼리 파라미터 제거 (뒤로가기 시 재처리 방지)
        navigate("/my/korean", { replace: true });
      }
    };

    completePaypal();
  }, []); // 마운트 시 1회만 실행

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

              {/* ✅ PayPal 결제 결과 토스트 */}
              {paypalStatus !== "idle" && (
                <div
                  className={`w-full px-6 py-4 rounded-xl text-center font-semibold text-[length:var(--fs-subtitle2)] transition-all ${
                    paypalStatus === "loading"
                      ? "bg-violet-100 text-violet-50"
                      : paypalStatus === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-pink-80 text-pink-20 border border-pink-50"
                  }`}
                >
                  {paypalMessage}
                </div>
              )}

              <div className="flex flex-col xl:flex-row gap-[29px] items-start">
                <div className="w-full xl:w-[620px] flex-none flex justify-center xl:block overflow-hidden rounded-2xl">
                  <ProfileCard />
                </div>

                <div className="flex flex-col gap-[27px] flex-1 w-full min-w-0">
                  <Badge />
                  <ExpertList modalType="korean" />
                </div>
              </div>

              <Banner />

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