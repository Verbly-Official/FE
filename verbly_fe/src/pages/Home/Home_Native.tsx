import Home_Card from "../../components/Home/Home_Card";
import GNB from "../../components/Nav/GNB";
import SideMenu from "../../components/Nav/SideMenu";
import Tabs from "../../components/Tab/Tabs";
import TrendingTag from "../../components/TrendingTag/TrendingTag";
import { UserStatsCard } from "../Library/components/UserStatsCard";
import { MOCK_USER_PROFILE, MOCK_USER_STATS } from "./mockData.ts";

export default function Home_Native() {
  return (
    <>
      <div className="min-h-screen">
        {/*GNB*/}
        <div className="w-full mx-auto">
          <GNB variant="home" />
        </div>
        <div>
          <div className="w-full min-h-screen bg-bg0 flex flex-row justify-between pr-[40px]">
            <SideMenu />
            <div className="bg-white p-[24px] w-[1120px] min-h-screen mt-[32px] rounded-[12px]">
              {/* Tab */}
              <div className="flex mb-[28px] justify-start gap-0 border-b-[1px] border-line2">
                <Tabs tabs={["For You", "Hot Posts", "Need Correction"]} />
              </div>
              <div className="flex flex-col gap-[20px]">
                <Home_Card varient="default" isCorrected={false} />
                <Home_Card varient="default" isCorrected={true} />
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
    </>
  );
}
