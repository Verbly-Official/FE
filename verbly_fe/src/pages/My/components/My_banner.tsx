import React from 'react';
import SolidButton from '../../../components/Button/SolidButton';
import BannerIcon from '../img/BannerEmoji.svg';

const My_banner: React.FC = () => {
  return (
    <div className="relative w-full h-[124px] border border-pink-50 rounded-2xl bg-pink-100 shadow-sm overflow-hidden flex items-center">
      
      {/* 1. 이미지 영역 */}
      <img 
        src={BannerIcon} 
        alt="" 
        className="absolute left-[4px] w-[480px] h-[520px]  z-0 pointer-events-none object-contain"
      />

      {/* 2. 콘텐츠 영역 (텍스트 + 버튼) */}
      {/* pl-[140px]로 이미지 영역만큼 여백 확보 */}
      <div className="relative z-10 w-full flex justify-between items-center px-6 pl-[250px]">
        
        {/* 텍스트 */}
        <div className="flex flex-col justify-center gap-1">
          <p className="text-[28px] font-bold bg-[image:var(--gradient-4)] bg-clip-text text-transparent leading-tight tracking-tight">
            Upgrade to Premium
          </p>
          <p className="text-[20px] text-gray-500 font-medium leading-snug">
            Get unlimited AI corrections & templates
          </p>
        </div>

        {/* 버튼 */}
        <div className="shrink-0">
          <SolidButton 
            label="BUY NOW" 
            onClick={() => {}} 
            size="medium" // large -> medium으로 크기 조정
            variant="primary"
            // !text-white를 추가하여 글자색 강제 지정
            className="bg-[image:var(--gradient-4)] !text-white !font-bold px-6"
          />
        </div>
      </div>
    </div>
  );
};

export default My_banner;