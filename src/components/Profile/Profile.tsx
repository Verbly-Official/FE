import React, { useState, useEffect } from 'react';
import { type User, type UserInfo } from '../../types/user';
import { Badge } from '../Badge/ContentBadge';
import FollowButton from '../Button/FollowButton';

import SmallProfile from './img/small.svg';
import MediumProfile from './img/medium.svg';
import LargeProfile from './img/large.svg';

type ProfileData = Partial<User> & Partial<UserInfo> & {
  badges?: string;
  lastActive?: string;
  introduction?: string;
  isFollowing?: boolean; 
};

interface ProfileProps {
  data: ProfileData;
  size?: 'small' | 'medium' | 'large';
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
  size = 'small',
  onFollow,
  className = '',
}) => {
  const displayName = data.nickname || data.name || "User";
  const displayImage = data.profileImage || data.profileImg;
  const displayBio = data.bio || data.introduction;
  
  const [imgSrc, setImgSrc] = useState<string>(displayImage || DEFAULT_IMAGES[size]);

  useEffect(() => {
    setImgSrc(displayImage || DEFAULT_IMAGES[size]);
  }, [displayImage, size]);

  const handleError = () => {
    setImgSrc(DEFAULT_IMAGES[size]);
  };

  const renderImage = () => (
    <img
      src={imgSrc}
      alt={`${displayName} profile`}
      onError={handleError}
      className="rounded-full object-cover bg-gray-1 flex-shrink-0"
      style={{ width: IMG_PIXELS[size], height: IMG_PIXELS[size] }}
    />
  );

  // [Small Size]
  if (size === 'small') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {renderImage()}
        <div className="flex flex-col">
          <span className="font-bold text-[length:var(--fs-subtitle2)] text-gray-9">{displayName}</span>
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
  if (size === 'medium') {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        {renderImage()}
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[length:var(--fs-subtitle1)] text-gray-9">{displayName}</span>
          </div>
          {data.lastActive && (
            <span className="text-[length:var(--fs-body2)] text-gray-4">{data.lastActive}</span>
          )}
        </div>
        
        <FollowButton 
          userId={data.userId} 
          initialIsFollowing={data.isFollowing} 
          onToggle={onFollow}
        />
      </div>
    );
  }

  // [Large Size]
  return (
    <div className={`flex flex-col items-center gap-4 text-center ${className}`}>
      {renderImage()}
      <div>
        <h2 className="text-[length:var(--fs-title1)] font-bold text-gray-9">{displayName}</h2>
        <div className="flex items-center justify-center gap-2 mt-1">
          {data.level !== undefined && (
            <span className="text-[length:var(--fs-subtitle2)] text-gray-6">LV.{data.level}</span>
          )}
          {data.badges && (
            <Badge content={data.badges} size="small" />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;