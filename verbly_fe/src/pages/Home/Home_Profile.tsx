import GNB from "../../components/Nav/GNB";
import SideMenu from "../../components/Nav/SideMenu";
import TrendingTag from "../../components/TrendingTag/TrendingTag";
import ProfileImg from "../../components/Profile/img/large.svg";
import MessageImg from "../../assets/emoji/mail-purple.svg";
import Check from "../../assets/emoji/checkbox-rounded.svg";
import { FollowButton, OutlinedButton } from "../../components/Button";
import Tabs from "../../components/Tab/Tabs";
import Home_Card from "../../components/Home/Home_Card";
import { UserStatsCard } from "../Library/components/UserStatsCard";
import { MOCK_USER_PROFILE, MOCK_USER_STATS } from "./mockData.ts";

export default function Home_Profile() {
  return (
    <>
      <div className="min-h-screen">
        {/*GNB*/}
        <div className="w-full max-w-[1920px] mx-auto">
          <GNB variant="home" />
        </div>
        <div>
          <div className="w-full min-h-screen bg-bg0 flex flex-row justify-between pr-[40px]">
            <SideMenu />
            <div className="bg-white p-[24px] w-[1120px] min-h-screen mt-[32px] rounded-[12px]">
              {/* Profile */}
              <div className="w-full h-stretch p-[20px] flex flex-row gap-[52px]">
                <img
                  src={ProfileImg}
                  alt="profile"
                  className="w-[180px] h-[180px]"
                />
                <div className="w-[1072px] flex flex-col flex-start gap-[16px]">
                  <div className="flex gap-[4px] flex-col">
                    <div className="flex flex-row gap-[12px] items-center">
                      <div className="font-bold text-[40px] leading-[40px]">
                        Minji Kim
                      </div>
                      <img
                        src={Check}
                        alt="profilImg"
                        className="w-[48px] h-[48px] p-[3.33px]"
                      />
                    </div>
                    <div className="text-[18px] text-gray-7 font-semibold">
                      Korean
                    </div>
                  </div>
                  <div className="w-[700px] h-auto text-[16px] leading-[24px]">
                    Hello I’m Minji Kim from Seoul. I love traveling and eating
                    delicious food. I’m currently learging English and would
                    love to help you with Korean
                  </div>
                  <div className="flex gap-[16px]">
                    <div className="flex gap-[4px] items-center">
                      <span className="text-[18px] font-semibold">124</span>
                      <span className="text-[16px] leading-[24px] text-gray-6">
                        Posts
                      </span>
                    </div>
                    <div className="flex gap-[4px] items-center">
                      <span className="text-[18px] font-semibold">124</span>
                      <span className="text-[16px] leading-[24px] text-gray-6">
                        Follower
                      </span>
                    </div>
                    <div className="flex gap-[4px] items-center">
                      <span className="text-[18px] font-semibold">124</span>
                      <span className="text-[16px] leading-[24px] text-gray-6">
                        Follow
                      </span>
                    </div>
                    <div className="flex gap-[4px] items-center">
                      <span className="text-[18px] font-semibold">124</span>
                      <span className="text-[16px] leading-[24px] text-gray-6">
                        Given Correct
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-[20px]">
                    <FollowButton size="large" className="w-[508px]" />
                    <OutlinedButton
                      label="Message"
                      iconSrc={MessageImg}
                      size="large"
                    />
                  </div>
                </div>
              </div>
              {/* Tabs */}
              <Tabs tabs={["Posts"]} />
              <section className="p-[28px] flex flex-col gap-[20px]">
                <Home_Card varient="default" isCorrected />
                <Home_Card varient="default" isCorrected />
              </section>
            </div>

            {/* Right Side */}
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
