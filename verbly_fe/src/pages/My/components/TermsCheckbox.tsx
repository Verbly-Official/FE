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
    <label className="flex items-start gap-3 mb-6 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 w-5 h-5 rounded border-2 border-gray-300 text-violet-500 focus:ring-2 focus:ring-violet-200 cursor-pointer"
      />
      <span className="text-sm text-gray-600 leading-tight">
        I agree to the{' '}
        <a href="#" className="text-violet-500 hover:underline">Terms of Service</a>
        {' '}and{' '}
        <a href="#" className="text-violet-500 hover:underline">Privacy Policy</a>
        {' '}Subscription auto-renew...
      </span>
    </label>
  );
};