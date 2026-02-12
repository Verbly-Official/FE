import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { type User, type UserInfo } from "../../types/user";
import { Badge } from "../Badge/ContentBadge";
import FollowButton from "../Button/FollowButton";

import SmallProfile from "./img/small.svg";
import MediumProfile from "./img/medium.svg";
import LargeProfile from "./img/large.svg";

type ProfileData = Partial<User> &
  Partial<UserInfo> & {
    id?: number | string;
    userId?: number | string;
    writerId?: number | string;
    badges?: string;
    lastActive?: string;
    introduction?: string;
    isFollowing?: boolean;
  };

interface ProfileProps {
  data: ProfileData;
  size?: "small" | "medium" | "large";
  onFollow?: (isFollowing: boolean) => void;
  className?: string;
}

const IMG_PIXELS = {
  small: 40,
  medium: 48,
  large: 180,
};

const DEFAULT_IMAGES = {
  small: SmallProfile,
  medium: MediumProfile,
  large: LargeProfile,
};

export const UserProfile: React.FC<ProfileProps> = ({
  data,
  size = "small",
  onFollow,
  className = "",
}) => {
  const navigate = useNavigate();

  // ID 추출 (없으면 undefined)
  const rawId = data.userId ?? data.id ?? data.writerId;
  const targetUserId = rawId ? String(rawId) : undefined;

  const displayName = data.nickname || data.name || "User";
  const displayImage = data.profileImage || data.profileImg;
  const displayBio = data.bio || data.introduction;

  const [imgSrc, setImgSrc] = useState<string>(
    displayImage || DEFAULT_IMAGES[size],
  );

  useEffect(() => {
    setImgSrc(displayImage || DEFAULT_IMAGES[size]);
  }, [displayImage, size]);

  const handleError = () => {
    setImgSrc(DEFAULT_IMAGES[size]);
  };

  const handleMoveToProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!targetUserId) return;
    navigate(`/home/profile/${targetUserId}`);
  };

  const renderImage = () => (
    <img
      src={imgSrc}
      alt={`${displayName} profile`}
      onError={handleError}
      onClick={handleMoveToProfile}
      className="rounded-full object-cover bg-gray-1 flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
      style={{ width: IMG_PIXELS[size], height: IMG_PIXELS[size] }}
    />
  );

  // [Small Size]
  if (size === "small") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {renderImage()}
        <div className="flex flex-col">
          <span
            onClick={handleMoveToProfile}
            className="font-bold text-[length:var(--fs-subtitle2)] text-gray-9 cursor-pointer hover:underline"
          >
            {displayName}
          </span>
          {displayBio && (
            <span className="text-[length:var(--fs-body2)] text-gray-5 line-clamp-1">
              {displayBio}
            </span>
          )}
        </div>
      </div>
    );
  }

  // [Medium Size]
  if (size === "medium") {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        {renderImage()}
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-2">
            <span
              onClick={handleMoveToProfile}
              className="font-bold text-[length:var(--fs-subtitle1)] text-gray-9 cursor-pointer hover:underline"
            >
              {displayName}
            </span>
          </div>
          {data.lastActive && (
            <span className="text-[length:var(--fs-body2)] text-gray-4">
              {data.lastActive}
            </span>
          )}
        </div>

        <FollowButton
          key={targetUserId}
          userId={targetUserId}
          initialIsFollowing={data.isFollowing}
          onToggle={onFollow}
        />
      </div>
    );
  }

  // [Large Size]
  return (
    <div
      className={`flex flex-col items-center gap-4 text-center ${className}`}
    >
      {renderImage()}
      <div>
        <h2 className="text-[length:var(--fs-title1)] font-bold text-gray-9 cursor-pointer hover:text-gray-7 transition-colors">
          {displayName}
        </h2>
        <div className="flex items-center justify-center gap-2 mt-1">
          {data.level !== undefined && (
            <span className="text-[length:var(--fs-subtitle2)] text-gray-6">
              LV.{data.level}
            </span>
          )}
          {data.badges && <Badge content={data.badges} size="small" />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
