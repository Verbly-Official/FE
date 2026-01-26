import Home_Card from "../../components/Home/Home_Card";
import Home_WriteModal from "../../components/Home/Home_WriteModal.tsx";
import GNB from "../../components/Nav/GNB";
import SideMenu from "../../components/Nav/SideMenu";
import Tabs from "../../components/Tab/Tabs";
import TrendingTag from "../../components/TrendingTag/TrendingTag";
import { UserStatsCard } from "../Library/components/UserStatsCard";
import { MOCK_USER_PROFILE, MOCK_USER_STATS } from "./mockData.ts";

export default function Home_Search() {
  return (
    <div className="min-h-screen">
      {/*GNB*/}
      <div className="w-full mx-auto">
        <GNB variant="home" />
      </div>
      <div>
        <div className="w-full min-h-screen bg-bg0 flex flex-row justify-between pr-[40px]">
          <SideMenu />
          <div className="bg-white p-[24px] w-[1120px] min-h-screen mt-[32px] rounded-[12px] p-[20px]">
            <div className="flex items-end gap-[12px] py-[12px]">
              <span className="font-bold text-[40px] text-blue-60">
                Korean Culture
              </span>
              <span className="text-[24px] font-semibold text-[24px]">
                에 대한 결과입니다.
              </span>
            </div>
            <div className="flex flex-col gap-[20px]">
              <Home_Card varient="mini" isCorrected={false} />
              <Home_Card varient="mini" isCorrected={true} />
            </div>
          </div>
          <div>
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
    </div>
  );
}
