// src/components/Button/FollowButton.tsx
import { useState, useEffect } from 'react';
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
  small: "w-[5rem] h-[1.5rem] text-[length:var(--fs-button2)] gap-[0.25rem] rounded-[0.25rem]",
  large: "w-[9.375rem] h-[3.75rem] text-[length:var(--fs-subtitle1)] gap-[0.5rem] rounded-[0.5rem]",
};

const ICON_SIZE_STYLES: Record<'small' | 'large', string> = {
  small: "w-[1rem] h-[1rem]",
  large: "w-[1.5rem] h-[1.5rem]",
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

  useEffect(() => {
    setIsFollowing(initialIsFollowing);
  }, [initialIsFollowing]);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (userId === undefined) {
      console.error("FollowButton: userId is missing");
      return;
    }

    if (isLoading) return; 
    
    const previousState = isFollowing;
    const newState = !isFollowing;
    
    setIsFollowing(newState);
    if (onToggle) onToggle(newState);

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
    : "bg-violet-50 text-[var(--color-white)]";

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