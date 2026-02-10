import { useState } from 'react';
import { followUser, unfollowUser } from '../../apis/follow'; 
import personPlusIcon from '../../assets/emoji/person-plus.svg';
import person from '../../assets/emoji/person.svg';

interface FollowButtonProps {
  userId?: number;
  initialIsFollowing?: boolean;
  onToggle?: (isFollowing: boolean) => void;
  className?: string;
  size?: 'small' | 'large';
}

const SIZE_STYLES: Record<'small' | 'large', string> = {
  small: "w-[80px] h-[24px] text-[12px] gap-[4px] rounded-[4px]",
  large: "w-[150px] h-[60px] text-[18px] gap-[8px] rounded-[8px]",
};

const ICON_SIZE_STYLES: Record<'small' | 'large', string> = {
  small: "w-[16px] h-[16px]",
  large: "w-[24px] h-[24px]",
};

export default function FollowButton({ 
  userId,
  initialIsFollowing = false, 
  onToggle,
  className = "",
  size = "small"
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isLoading) return; 
    
    const previousState = isFollowing;
    const newState = !isFollowing;
    setIsFollowing(newState);
    if (onToggle) onToggle(newState);

    if (!userId) return;

    setIsLoading(true);
    try {
      if (newState) {
        await followUser(userId);
      } else {
        await unfollowUser(userId);
      }
    } catch (error) {
      console.error("Follow toggle failed:", error);
      setIsFollowing(previousState);
      if (onToggle) onToggle(previousState);
    } finally {
      setIsLoading(false);
    }
  };

  const stateStyles = isFollowing
    ? "bg-gray-3 text-gray-6"
    : "bg-violet-50 text-white";

  const iconColorFilter = !isFollowing ? "invert" : "";

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`
        flex justify-center items-center 
        font-medium transition-colors duration-200
        ${SIZE_STYLES[size]}
        ${stateStyles}
        ${className}
        ${isLoading ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <img
        src={isFollowing ? person : personPlusIcon}
        alt=""
        className={`${ICON_SIZE_STYLES[size]} object-contain ${iconColorFilter}`}
      />
      <span>{isFollowing ? "Following" : "Follow"}</span>
    </button>
  );
}