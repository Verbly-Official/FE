import React from 'react';

interface InterestTagProps {
    label: string;
    className?: string;
}

export const InterestTag: React.FC<InterestTagProps> = ({ label, className = "" }) => (
    <div className={`inline-flex h-[32px] whitespace-nowrap bg-gray-50 px-[8px] py-[12px] flex flex-row justify-center items-center gap-[8px] rounded-[4px] border border-gray-200 ${className}`}>
        <div className="text-[14px] text-gray-900 font-medium">{label}</div>
    </div>
);

export default InterestTag;
