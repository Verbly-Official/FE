import { useState } from 'react';
import personPlusIcon from '../../assets/emoji/person-plus.svg';
import person from '../../assets/emoji/person.svg';

interface FollowButtonProps {
  initialIsFollowing?: boolean;
  onToggle?: (isFollowing: boolean) => void;
  className?: string;
  size?: 'small' | 'large';
}

// 상수 정의: 사이즈별 스타일
const SIZE_STYLES: Record<'small' | 'large', string> = {
  small: "w-[80px] h-[24px] text-[12px] gap-[4px] rounded-[4px]",
  large: "w-[150px] h-[60px] text-[18px] gap-[8px] rounded-[8px]",
};

// 상수 정의: 아이콘 사이즈
const ICON_SIZE_STYLES: Record<'small' | 'large', string> = {
  small: "w-[16px] h-[16px]",
  large: "w-[24px] h-[24px]",
};

export default function FollowButton({ 
  initialIsFollowing = false, 
  onToggle,
  className = "",
  size = "small"
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = !isFollowing;
    setIsFollowing(newState);
    if (onToggle) onToggle(newState);
  };

  // 상태별 스타일
  const stateStyles = isFollowing
    ? "bg-gray-3 text-gray-6" // Following
    : "bg-violet-50 text-white"; // Follow

  return (
    <button
      onClick={handleClick}
      className={`
        flex justify-center items-center 
        font-medium transition-colors duration-200
        ${SIZE_STYLES[size]}
        ${stateStyles}
        ${className}
      `}
    >
      <img
        src={isFollowing ? person : personPlusIcon}
        alt=""
        className={`${ICON_SIZE_STYLES[size]} object-contain`}
      />
      <span>{isFollowing ? "Following" : "Follow"}</span>
    </button>
  );
}