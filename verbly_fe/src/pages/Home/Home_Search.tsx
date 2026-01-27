import { useState } from "react";
import Home_Card from "../../components/Home/Home_Card";
import Home_WriteModal from "../../components/Home/Home_WriteModal.tsx";
import GNB from "../../components/Nav/GNB";
import SideMenu from "../../components/Nav/SideMenu";
import TrendingTag from "../../components/TrendingTag/TrendingTag";
import { UserStatsCard } from "../Library/components/UserStatsCard";
import { MOCK_USER_PROFILE, MOCK_USER_STATS } from "./mockData.ts";

export default function Home_Search() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="w-screen overflow-y-auto">
      {/*GNB*/}
      <div className="w-screen">
        <GNB variant="home" />
      </div>

      <div className="flex flex-row min-h-screen">
        {/* 사이드메뉴 - 모달 열려도 가려지지 않음 */}
        <SideMenu />

        {/* 오버레이 가능 영역 */}
        <div className={"flex bg-bg0 z-10 relative pr-[40px]"}>
          {modalOpen && (
            <>
              <div className="w-full absolute inset-0 bg-[rgba(0,0,0,0.40)] z-20" />
              <div className="absolute inset-0 flex justify-center items-center z-30">
                <Home_WriteModal variant="KOREAN" />
              </div>
            </>
          )}
          <div className="bg-white flex-1 p-[24px] w-full min-h-screen my-[32px] rounded-[12px] mx-[38px]">
            <div className="flex items-end gap-[12px] py-[12px]">
              <span className="font-bold text-[40px] text-blue-60">
                Korean Culture
              </span>
              <span className="text-[24px] font-semibold text-[24px]">
                에 대한 결과입니다.
              </span>
            </div>
            <div className="grid gap-[20px] [grid-template-columns:repeat(4,minmax(332px,1fr))]">
              <Home_Card varient="mini" isCorrected={false} />
              <Home_Card varient="mini" isCorrected={true} />
              <Home_Card varient="mini" isCorrected={true} />
              <Home_Card varient="mini" isCorrected={true} />
              <Home_Card varient="mini" isCorrected={true} />
              <Home_Card varient="mini" isCorrected={true} />
              <Home_Card varient="mini" isCorrected={true} />
              <Home_Card varient="mini" isCorrected={true} />
              <Home_Card varient="mini" isCorrected={true} />
              <Home_Card varient="mini" isCorrected={true} />
              <Home_Card varient="mini" isCorrected={true} />
              <Home_Card varient="mini" isCorrected={true} />
              <Home_Card varient="mini" isCorrected={true} />
              <Home_Card varient="mini" isCorrected={true} />
            </div>
          </div>
          <div className="mt-[32px] flex flex-col gap-[32px]">
            <UserStatsCard
              userData={MOCK_USER_PROFILE}
              stats={MOCK_USER_STATS}
            />
            <TrendingTag />
          </div>
        </div>
      </div>
    </div>
  );
}
