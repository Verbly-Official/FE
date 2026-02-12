import { useState } from "react";
import { TextButton } from "../../components/Button";
import Notification_Alarm from "./components/Notification_Alarm";
import GNB from "../../components/Nav/GNB";
import SideMenu from "../../components/Nav/SideMenu";
import Home_WriteModal from "../../components/Home/Home_WriteModal";

export default function Home_Notification() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-bg0">
      {/*GNB*/}
      <div className="w-screen">
        <GNB variant="home" />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* 사이드메뉴 - 모달 열려도 가려지지 않음 */}
        <SideMenu variant="default" onWriteClick={() => setModalOpen(true)} />

        <div className="flex-1 relative overflow-y-auto px-[38px] pt-[32px] pb-[40px] z-10">
          <div className="max-w-[1200px]">
            <div className="bg-white min-h-screen rounded-[12px] px-[59px] py-[60px] flex flex-col gap-[48px]">
              <div className="text-[40px] font-bold">Notification</div>
              {/* Section */}
              <div className="w-full flex flex-col gap-[12px]">
                <TextButton icon="leading" className="justify-start">
                  Mark all read
                </TextButton>

                {/* Alarms */}
                <div className="flex flex-col gap-[8px]">
                  <Notification_Alarm />
                  <Notification_Alarm />
                </div>
              </div>
            </div>
          </div>
          {/* MODAL */}
          {modalOpen && (
            <>
              <div
                className="w-full absolute inset-0 bg-[rgba(0,0,0,0.40)] z-20"
                onClick={() => setModalOpen(false)}
              />
              <div
                className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                onClick={(e) => e.stopPropagation()}
              >
                <Home_WriteModal
                  variant="KOREAN"
                  onClose={() => setModalOpen(false)}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
