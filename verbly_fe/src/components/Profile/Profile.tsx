import React, { useState, useEffect } from 'react';
import { type User } from '../../types/user';
import { Badge } from '../Badge/ContentBadge';

// 크기별 기본 이미지 Import
import SmallProfile from './img/small.svg';
import MediumProfile from './img/medium.svg';
import LargeProfile from './img/large.svg';

interface ProfileProps {
  data: User;
  size?: 'small' | 'medium' | 'large';
  onFollow?: () => void;
}

const IMG_PIXELS = {
  small: 40,
  medium: 48,
  large: 180,
};

// 사이즈별 기본 이미지 매핑
const DEFAULT_IMAGES = {
  small: SmallProfile,
  medium: MediumProfile,
  large: LargeProfile,
};

export const UserProfile: React.FC<ProfileProps> = ({
  data,
  size = 'small',
}) => {
  // 이미지 소스 상태 관리 (프로필 이미지가 없으면 해당 사이즈의 기본 이미지 사용)
  const [imgSrc, setImgSrc] = useState<string>(data.profileImg || DEFAULT_IMAGES[size]);

  // data.profileImg가 변경될 때마다 상태 업데이트
  useEffect(() => {
    setImgSrc(data.profileImg || DEFAULT_IMAGES[size]);
  }, [data.profileImg, size]);

  const handleError = () => {
    setImgSrc(DEFAULT_IMAGES[size]);
  };

  const renderImage = () => (
    <img
      src={imgSrc}
      alt={`${data.name} profile`}
      onError={handleError}
      className="rounded-full object-cover bg-gray-100" // 배경색 살짝 수정
      style={{ width: IMG_PIXELS[size], height: IMG_PIXELS[size] }}
    />
  );

  if (size === 'small') {
    return (
      <div className="flex items-center gap-3">
        {renderImage()}
        <div className="flex flex-col">
          <span className="font-bold text-gray-900">{data.name}</span>
          {/* introduction이 있을 때만 렌더링하도록 조건부 처리 추천 */}
          {data.introduction && (
             <span className="text-sm text-gray-500 line-clamp-1">{data.introduction}</span>
          )}
        </div>
      </div>
    );
  }

  if (size === 'medium') {
    return (
      <div className="flex items-center gap-4">
        {renderImage()}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-gray-900">{data.name}</span>
          </div>

          {data.lastActive && (
            <span className="text-sm text-gray-400">{data.lastActive}</span>
          )}
        </div>
      </div>
    );
  }

  // Large size
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      {renderImage()}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{data.name}</h2>
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