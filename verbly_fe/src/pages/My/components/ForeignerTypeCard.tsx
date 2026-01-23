import React from 'react';
// 이미지 경로는 실제 위치에 맞춰주세요
import ForeignerImg from '../../assets/images/속성 1=외국인.png';

interface ForeignerTypeCardProps {
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

export const ForeignerTypeCard = ({ isSelected, onClick, className = '' }: ForeignerTypeCardProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`
        flex flex-col items-center justify-center
        w-[160px] h-[160px]
        rounded-[16px] border-[2px] transition-all duration-200 cursor-pointer
        ${isSelected 
          ? 'border-violet-50 bg-violet-5 text-violet-50' 
          : 'border-gray-2 bg-white text-gray-4 hover:border-violet-30'
        }
        ${className}
      `}
    >
      <img 
        src={ForeignerImg} 
        alt="외국인" 
        className="w-[80px] h-[80px] object-contain mb-3" 
      />
      <span className={`text-[18px] font-bold ${isSelected ? 'text-violet-50' : 'text-gray-9'}`}>
        외국인
      </span>
    </button>
  );
};

export default ForeignerTypeCard;