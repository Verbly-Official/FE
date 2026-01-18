import { useState } from 'react';
import personPlusIcon from '../../assets/emoji/person-plus.svg';
import person from '../../assets/emoji/person.svg';

interface FollowButtonProps {
  initialIsFollowing?: boolean;
  onToggle?: (isFollowing: boolean) => void;
  className?: string;
  size?: 'small' | 'large';
}

export default function FollowButton({ 
  initialIsFollowing = false, 
  onToggle,
  className = "",
  size = "small"
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 상위 이벤트 전파 방지
    const newState = !isFollowing;
    setIsFollowing(newState);
    if (onToggle) onToggle(newState);
  };

  // 1. 사이즈별 스타일 (고정 크기 & 폰트)
  const sizeStyles = size === 'small'
    ? "w-[80px] h-[24px] text-[12px] gap-[4px] rounded-[4px]" 
    : "w-[150px] h-[60px] text-[18px] gap-[8px] rounded-[8px]";

  // 2. 상태별 스타일 (팔로우 vs 팔로잉)
  const stateStyles = isFollowing
    ? "bg-gray-3 text-gray-6" // 팔로잉 상태 
    : "bg-violet-50 text-white"; // 팔로우 상태
  return (
    <button
      onClick={handleClick}
      className={`
        flex justify-center items-center 
        font-medium transition-colors duration-200
        ${sizeStyles}
        ${stateStyles}
        ${className}
      `}
    >
      <img
        src={isFollowing ? person : personPlusIcon}
        alt=""
        className={size === 'small' ? "w-[12px] h-[12px]" : "w-[20px] h-[20px]"}
      />
      <span>{isFollowing ? "Following" : "Follow"}</span>
    </button>
  );
}