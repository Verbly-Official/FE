import React from "react";
import { UserProfile } from "../Profile/Profile";
import FireIcon from "../../assets/emoji/fire2.svg?react";
import PersonIcon from "../../assets/emoji/person.svg?react";
import PointIcon from "../../assets/emoji/point.svg?react";
import DefaultProfileIcon from "../Profile/img/medium.svg";

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
    <div className="bg-white p-[20px] rounded-[12px] border border-line1 flex flex-col items-center gap-[12px]">
      {/* UserProfile - 180px 크기 */}
      <div className="[&_img]:!w-[180px] [&_img]:!h-[180px] [&_h2]:!text-[length:var(--fs-title1)] [&_span]:!text-[length:var(--fs-subtitle2)]">
        <UserProfile size="large" data={displayUser} />
      </div>

      {/* Stats Grid - 3열 그리드 */}
      <div className="grid grid-cols-3 w-full p-[12px] gap-0">
        <div className="flex flex-col items-center gap-[8px] px-[12px]">
          <div className="flex flex-col items-center gap-[4px]">
            <PersonIcon className="w-[24px] h-[24px] text-gray-5" />
            <span className="text-[length:var(--fs-body2)] text-gray-5 font-medium">
              Follow
            </span>
          </div>
          <span className="text-[length:var(--fs-title2)] text-gray-7 font-semibold">
            {stats.follow}
          </span>
        </div>
        <div className="flex flex-col items-center gap-[8px] px-[12px]">
          <div className="flex flex-col items-center gap-[4px]">
            <FireIcon className="w-[24px] h-[24px] text-gray-5" />
            <span className="text-[length:var(--fs-body2)] text-gray-5 font-medium">
              Streak
            </span>
          </div>
          <span className="text-[length:var(--fs-title2)] text-gray-7 font-semibold">
            {stats.streak}
          </span>
        </div>
        <div className="flex flex-col items-center gap-[8px] px-[12px]">
          <div className="flex flex-col items-center gap-[4px]">
            <PointIcon className="w-[24px] h-[24px] text-gray-5" />
            <span className="text-[length:var(--fs-body2)] text-gray-5 font-medium">
              Point
            </span>
          </div>
          <span className="text-[length:var(--fs-title2)] text-gray-7 font-semibold">
            {stats.point}
          </span>
        </div>
      </div>

      {/* Correction Received */}
      <div className="w-full flex flex-col gap-[12px]">
        <span className="text-[length:var(--fs-subtitle1)] text-gray-6 font-semibold text-left px-[4px]">
          Correction
        </span>
        <div className="bg-violet-100 py-[12px] rounded-[12px] flex flex-col items-center justify-center gap-[4px] h-auto">
          <span className="text-[length:var(--fs-title2)] font-semibold text-violet-50">
            {stats.correctionReceived}
          </span>
          <span className="text-[length:var(--fs-subtitle2)] text-gray-5 font-medium">
            Received
          </span>
        </div>
      </div>
    </div>
  );
};
