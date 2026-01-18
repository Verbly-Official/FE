import React from 'react';

interface BadgeProps {
  content: 'dot' | 'new' | 'number';
  variant?: 'primary' | 'secondary' | 'urgent';
  count?: number; // content가 'number'일 때 표시할 숫자
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  content = 'dot',
  variant = 'primary',
  count = 0,
  className = '',
}) => {
  
  // Variant별 배경색상 
  const variantStyles = {
    // Primary: Main - Primary (Violet-50)
    primary: 'bg-[var(--color-violet-50)] text-[var(--color-white)]',
    // Secondary: Secondary - Normal (Blue-60)
    secondary: 'bg-[var(--color-blue-60)] text-[var(--color-white)]',
    // Urgent: Alert/Point (Pink-20)
    urgent: 'bg-[var(--color-pink-20)] text-[var(--color-white)]',
  };

  // 공통 스타일
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium';

  // 1. Dot 스타일 (8x8)
  if (content === 'dot') {
    return (
      <span
        className={`
          ${baseStyles}
          w-[8px] h-[8px]
          ${variantStyles[variant]}
          ${className}
        `}
        aria-hidden="true"
      />
    );
  }

  // 2. New / Number 스타일 (18x18)
  return (
    <span
      className={`
        ${baseStyles}
        w-[18px] h-[18px]
        text-[10px] leading-none
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {content === 'new' ? 'N' : (count > 99 ? '99+' : count)}
    </span>
  );
};