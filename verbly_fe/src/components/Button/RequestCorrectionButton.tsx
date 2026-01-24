import React from 'react';
import FeatherIcon from '../../assets/emoji/feather-white.svg';

interface RequestCorrectionButtonProps {
    onClick?: () => void;
    className?: string;
}

export const RequestCorrectionButton: React.FC<RequestCorrectionButtonProps> = ({ onClick, className = "" }) => {
    return (
        <button
            className={`flex h-[48px] px-8 justify-center items-center gap-2 rounded-[8px] text-white text-lg font-semibold cursor-pointer hover:opacity-90 transition-opacity shadow-sm ${className}`}
            style={{ background: 'linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%)' }}
            onClick={onClick}
        >
            <img src={FeatherIcon} alt="" className="w-5 h-5" />
            <span>Request Correction</span>
        </button>
    );
};

export default RequestCorrectionButton;
