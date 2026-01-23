import React from 'react';

interface BadgeProps {
  content: string;
  size?: 'small' | 'medium';
  className?: string;
}

const BADGE_SIZES = {
  small: 'h-[22px] px-2 text-xs',
  medium: 'h-[32px] px-3 text-sm',
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
        bg-blue-90 text-blue-60
        ${BADGE_SIZES[size]}
        ${className}
      `}
    >
      {content}
    </span>
  );
};