import React from 'react';

interface TermsCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ 
  checked, 
  onChange 
}) => {
  return (
    <label className="flex items-center gap-3 mb-6 cursor-pointer group w-full">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 w-4 h-4 rounded border-2 border-gray-3 text-violet-50 focus:ring-2 focus:ring-violet-100 cursor-pointer flex-shrink-0"
      />
      <span className="text-[length:var(--fs-body2)] text-gray-6 leading-tight flex-1 min-w-0 truncate">
        I agree to the{' '}
        <a href="#" className="text-violet-50 hover:underline">Terms of Service</a>
        {' '}and{' '}
        <a href="#" className="text-violet-50 hover:underline">Privacy Policy</a>
        {' '}Subscription auto-renew...
      </span>
    </label>
  );
};