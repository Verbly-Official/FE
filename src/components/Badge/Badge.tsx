import React from 'react';

interface BadgeProps {
  content: 'dot' | 'new' | 'number';
  variant?: 'primary' | 'secondary' | 'urgent';
  count?: number;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  content = 'dot',
  variant = 'primary',
  count = 0,
  className = '',
}) => {
  
  const variantStyles = {
    primary: 'bg-violet-50 text-[var(--color-white)]',
    secondary: 'bg-blue-60 text-[var(--color-white)]',
    urgent: 'bg-pink-20 text-[var(--color-white)]',
  };

  const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium';

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

  return (
    <span
      className={`
        ${baseStyles}
        w-[18px] h-[18px]
        text-[length:var(--fs-body2)] leading-none
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {content === 'new' ? 'N' : (count > 99 ? '99+' : count)}
    </span>
  );
};