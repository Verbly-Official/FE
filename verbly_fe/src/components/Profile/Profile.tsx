import React from 'react';
import { type User } from '../../types/user';

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

export const UserProfile: React.FC<ProfileProps> = ({ 
  data, 
  size = 'small', 
  // onFollow // 추후 사용 시 주석 해제
}) => {
  // 렌더링 헬퍼
  const renderImage = () => (
    <img
      src={data.profileUrl}
      alt={`${data.name} profile`}
      className="rounded-full object-cover bg-gray-200"
      style={{ width: IMG_PIXELS[size], height: IMG_PIXELS[size] }}
    />
  );

  // 1. Small: 이름 + 한줄 소개
  if (size === 'small') {
    return (
      <div className="flex items-center gap-3">
        {renderImage()}
        <div className="flex flex-col">
          <span className="font-bold text-gray-900">{data.name}</span>
          <span className="text-sm text-gray-500">{data.introduction}</span>
        </div>
      </div>
    );
  }

  // 2. Medium: 이름 + 접속 시간 (버튼/뱃지 제거됨)
  if (size === 'medium') {
    return (
      <div className="flex items-center gap-4">
        {renderImage()}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-gray-900">{data.name}</span>
            {/* Follow btn는 별도 구현 예정이므로 이곳의 버튼/뱃지 로직 제거 */}
          </div>
          
          {data.lastActive && (
            <span className="text-sm text-gray-400">{data.lastActive}</span>
          )}
        </div>
      </div>
    );
  }

  // 3. Large: 이름 + 레벨 (뱃지 제거됨)
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      {renderImage()}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{data.name}</h2>
        <div className="flex items-center justify-center gap-2 mt-1">
          {data.level !== undefined && (
            <span className="text-gray-600">LV.{data.level}</span>
          )}
          {/* Content Badge 별도 구현 예정으로 기존 뱃지 렌더링 제거 */}
        </div>
      </div>
    </div>
  );
};