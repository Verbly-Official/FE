import React from 'react';

interface BadgeProps {
  content: string;
  size?: 'small' | 'medium'; // 사이즈 추가
  className?: string;
}

const BADGE_SIZES = {
  small: 'h-[22px] px-2 text-xs',       // 22px 높이
  medium: 'h-[32px] px-3 text-sm',      // 32px 높이
};

export const Badge: React.FC<BadgeProps> = ({ 
  content,
  size = 'small', 
  className = '' 
}) => {
  return (
    <span 
      className={`
        inline-flex items-center justify-center
        rounded font-medium whitespace-nowrap
        bg-blue-100 text-blue-600
        ${BADGE_SIZES[size]}
        ${className}
      `}
    >
      {content}
    </span>
  );
};