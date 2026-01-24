import React from "react";
import { UserProfile } from "../../../components/Profile/Profile";
import FireIcon from "../../../assets/emoji/fire2.svg";
import PersonIcon from "../../../assets/emoji/person.svg";
import PointIcon from "../../../assets/emoji/point.svg";
import DefaultProfileIcon from "../../../components/Profile/img/medium.svg";
//import DefaultProfileIcon from "../../../components/Profile/img/basicProfile.svg"; // Correct default profile image

interface UserStatsCardProps {
  userData: {
    id: string;
    name: string;
    level?: number;
    profileImg: string;
    introduction: string;
    role: "FOREIGNER" | "KOREAN";
  };
  stats: {
    follow: number;
    streak: number;
    point: number;
    correctionReceived: number;
  };
}

export const UserStatsCard: React.FC<UserStatsCardProps> = ({
  userData,
  stats,
}) => {
  const displayUser = {
    ...userData,
    profileImg: userData.profileImg || DefaultProfileIcon,
  };

  return (
    <div className="bg-white p-[20px] rounded-[12px] border border-line1 flex flex-col items-center gap-[12px] shadow-sm">
      {/* UserProfile - 180px 크기 */}
      <div className="[&_img]:!w-[180px] [&_img]:!h-[180px] [&_h2]:!text-[24px] [&_span]:!text-[16px]">
        <UserProfile size="large" data={displayUser} />
      </div>

      {/* Stats Grid - 3열 그리드 */}
      <div className="grid grid-cols-3 w-full bg-white border border-line1 rounded-[12px] p-[12px] gap-0 shadow-sm">
        <div className="flex flex-col items-center gap-[8px] px-[12px]">
          <div className="flex flex-col items-center gap-[4px]">
            <img
              src={PersonIcon}
              alt="follow"
              className="w-[24px] h-[24px] opacity-50"
            />
            <span className="text-body-medium14 text-gray-5 font-medium">
              Follow
            </span>
          </div>
          <span className="text-subtitle-semi22 text-gray-7 font-semibold">
            {stats.follow}
          </span>
        </div>
        <div className="flex flex-col items-center gap-[8px] px-[12px] border-x border-line1">
          <div className="flex flex-col items-center gap-[4px]">
            <img
              src={FireIcon}
              alt="streak"
              className="w-[24px] h-[24px] opacity-50"
            />
            <span className="text-body-medium14 text-gray-5 font-medium">
              Streak
            </span>
          </div>
          <span className="text-subtitle-semi22 text-gray-7 font-semibold">
            {stats.streak}
          </span>
        </div>
        <div className="flex flex-col items-center gap-[8px] px-[12px]">
          <div className="flex flex-col items-center gap-[4px]">
            <img
              src={PointIcon}
              alt="point"
              className="w-[24px] h-[24px] opacity-50"
            />
            <span className="text-body-medium14 text-gray-5 font-medium">
              Point
            </span>
          </div>
          <span className="text-subtitle-semi22 text-gray-7 font-semibold">
            {stats.point}
          </span>
        </div>
      </div>

      {/* Correction Received */}
      <div className="w-full flex flex-col gap-[12px]">
        <span className="text-subtitle-semi18 text-gray-6 font-semibold text-left px-[4px]">
          Correction
        </span>
        <div className="bg-violet-100 p-[16px] rounded-[12px] flex flex-col items-center justify-center gap-[4px] h-auto">
          <span className="text-subtitle-semi22 font-semibold text-violet-50">
            {stats.correctionReceived}
          </span>
          <span className="text-body-medium14 text-gray-5 font-medium">
            Received
          </span>
        </div>
      </div>
    </div>
  );
};
