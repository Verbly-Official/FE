import React, { useState, useEffect } from 'react';
import { type User, type UserInfo } from '../../types/user';
import { Badge } from '../Badge/ContentBadge';
import FollowButton from '../Button/FollowButton';

import SmallProfile from './img/small.svg';
import MediumProfile from './img/medium.svg';
import LargeProfile from './img/large.svg';

/**
 * 프로필 데이터 타입
 * - User(프론트), UserInfo(백엔드) 호환
 * - isFollowing, userId 등 팔로우 기능에 필요한 필드 포함
 */
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
  // 데이터 필드 호환성 처리
  const displayName = data.nickname || data.name || "User";
  const displayImage = data.profileImage || data.profileImg;
  const displayBio = data.bio || data.introduction;
  
  // 이미지 소스 상태 관리
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
      className="rounded-full object-cover bg-gray-100 flex-shrink-0"
      style={{ width: IMG_PIXELS[size], height: IMG_PIXELS[size] }}
    />
  );

  // [Small Size]
  if (size === 'small') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {renderImage()}
        <div className="flex flex-col">
          <span className="font-bold text-gray-900">{displayName}</span>
          {displayBio && (
            <span className="text-sm text-gray-500 line-clamp-1">
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
            <span className="font-bold text-lg text-gray-900">{displayName}</span>
          </div>
          {data.lastActive && (
            <span className="text-sm text-gray-400">{data.lastActive}</span>
          )}
        </div>
        
        {/* userId가 있어야 API 호출 가능, 없으면 UI만 동작 */}
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
        <h2 className="text-2xl font-bold text-gray-900">{displayName}</h2>
        <div className="flex items-center justify-center gap-2 mt-1">
          {data.level !== undefined && (
            <span className="text-gray-600">LV.{data.level}</span>
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