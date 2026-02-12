// src/components/Button/FollowButton.tsx
import { useState, useEffect } from 'react';
import { followUser, unfollowUser } from '../../apis/follow';
import personPlusIcon from '../../assets/emoji/person-plus.svg';
import person from '../../assets/emoji/person.svg';

interface FollowButtonProps {
  userId: number | string;
  initialIsFollowing?: boolean;
  onToggle?: (isFollowing: boolean) => void;
  className?: string;
  size?: 'small' | 'large';
}

const SIZE_STYLES: Record<'small' | 'large', string> = {
  small: "w-[80px] h-[24px] text-[length:var(--fs-button2)] gap-[4px] rounded-[4px]",
  large: "w-[150px] h-[60px] text-[length:var(--fs-subtitle1)] gap-[8px] rounded-[8px]",
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

  // userId가 유효한지 확인 (없거나 0/'0'이면 false)
  const isValidUserId = userId !== undefined && userId !== null && userId !== 0 && userId !== '0';

  useEffect(() => {
    setIsFollowing(initialIsFollowing);
  }, [initialIsFollowing]);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    // [수정] ID가 없으면 클릭 막기
    if (!isValidUserId) {
      console.warn("FollowButton: 유효하지 않은 userId입니다.");
      return;
    }

    if (isLoading) return;

    const previousState = isFollowing;
    const newState = !isFollowing;
    setIsFollowing(newState);
    if (onToggle) onToggle(newState);

    setIsLoading(true);
    try {
      // API가 number를 기대한다면 변환, string도 가능하다면 그대로
      const numericId = Number(userId);
      if (isNaN(numericId)) {
        throw new Error("Invalid user ID format");
      }

      if (newState) {
        await followUser(numericId);
      } else {
        await unfollowUser(numericId);
      }
    } catch (error) {
      console.error("Follow toggle failed:", error);
      // 실패 시 롤백 (원래 상태로 복구)
      setIsFollowing(previousState);
      if (onToggle) onToggle(previousState);
    } finally {
      setIsLoading(false);
    }
  };

  const stateStyles = isFollowing
    ? "bg-gray-3 text-gray-6"
    : "bg-violet-50 text-[var(--color-white)]";

  // [수정] 비활성화(ID 없음) 상태 스타일
  const disabledStyles = !isValidUserId
    ? "cursor-not-allowed bg-gray-2 text-gray-4"
    : "cursor-pointer";

  const iconColorFilter = !isFollowing && isValidUserId ? "invert" : "";

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