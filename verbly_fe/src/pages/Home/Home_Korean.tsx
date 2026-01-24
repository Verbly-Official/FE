import { Badge } from "../../components/Badge/ContentBadge";
import FollowButton from "../../components/Button/FollowButton";
import Home_Card from "../../components/Home/Home_Card";
import Home_WriteModal from "../../components/Home/Home_WriteModal.tsx";
import GNB from "../../components/Nav/GNB";
import SideMenu from "../../components/Nav/SideMenu";
import Tabs from "../../components/Tab/Tabs";
import TrendingTag from "../../components/TrendingTag/TrendingTag";
import { UserStatsCard } from "../Library/components/UserStatsCard";
import { MOCK_USER_PROFILE, MOCK_USER_STATS } from "./mockData.ts";

export default function Home_Korean() {
  return (
    <div className="min-h-screen">
      {/*GNB*/}
      <div className="w-full mx-auto">
        <GNB variant="home" />
      </div>
      <div>
        <div className="w-full min-h-screen bg-bg0 flex flex-row justify-between pr-[40px]">
          <SideMenu />
          <div className="absolute">
            <Home_WriteModal variant="KOREAN" />
          </div>
          <div className="bg-white p-[24px] w-[1120px] min-h-screen mt-[32px] rounded-[12px]">
            {/* Tab */}
            <div className="flex mb-[28px] justify-start gap-0 border-b-[1px] border-line2">
              <Tabs tabs={["For You", "Hot Posts"]} />
            </div>
<<<<<<< HEAD
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
=======
            <div>
              {/* Tab */}
              <div className="flex mb-[28px] justify-start gap-0">
                <Tabs tabs={["For You", "Hot Posts"]} />
              </div>
              <div className="flex flex-col gap-[20px]">
                <Home_Card />

                {/* Post Card */}
                <div className="flex flex-col bg-white w-[1072px] my-auto p-[24px] border-[1px] border-line1 rounded-[20px] gap-[12px]">
                  <div className="flex flex-row items-center justify-between">
                    {/* Profile */}
                    <div className="bg-white flex flex-row  gap-[12px] items-center">
                      <div className="w-[48px] h-[48px] bg-gray-3 rounded-[50px]"></div>
                      <div className="flex flex-col gap-[4px]">
                        <div className="text-gray-10 text-[20px]">Mark</div>
                        <div className="text-gray-5 text-[14px]">10min</div>
                      </div>
                      <FollowButton />
                    </div>
                    <Badge content="Request Correction" size="medium" />
                  </div>

                  {/* Content */}
                  <div>
                    I worked all day and when I came home, I didn’t want to do
                    anything. Is this sentence natural? I worked all day and
                    when I came home, I didn’t want to do anything. Is this
                    sentence natural?
                  </div>
                  {/* Tags */}
                  <div className="flex flex-row gap-[10px] text-blue-60">
                    <div>#Grammer</div>
                    <div>Daily</div>
                    <div>#English</div>
                  </div>
                  {/* Like&Comment */}
                  <div className="border-t-[1px] border-line2 py-[12px] gap-[12px] flex flex-row text-blue-60">
                    <div className="flex flex-row gap-[4px]">
                      <img src="../../src/assets/emoji/heart-false.svg" />
                      <div>12</div>
                    </div>
                    <div className="flex flex-row gap-[4px]">
                      <img src="../../src/assets/emoji/message1.svg" />
                      <div>12</div>
                    </div>
                  </div>
                </div>
              </div>
>>>>>>> origin/dev
            </div>
          </div>
          <div className="mt-[32px] flex flex-col gap-[32px]">
            <div className="bg-white w-[384px] h-[503px]">Profile</div>
            <TrendingTag />
          </div>
        </div>
      </div>
<<<<<<< HEAD
=======
      <div>
        <div></div>
      </div>
>>>>>>> origin/dev
    </div>
  );
}
