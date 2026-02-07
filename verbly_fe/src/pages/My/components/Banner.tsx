import React from 'react';
import { useNavigate } from 'react-router-dom'; // [추가] 라우팅 훅
import SolidButton from '../../../components/Button/SolidButton';
import BannerIcon from '../img/BannerEmoji.svg';
import Banner2Icon from '../img/Banner2.svg';
import EclipseIcon from '../img/Banner_Eclipse.svg';
import ChevIcon from '../../../assets/emoji/chev-right.svg'

const Banner: React.FC = () => {
  const navigate = useNavigate(); // [추가] navigate 함수 생성

  // 결제 페이지로 이동하는 핸들러
  const handlePaymentClick = () => {
    navigate('/my/korean/payment'); // 실제 결제 페이지 경로에 맞게 수정해주세요 (예: '/payment', '/checkout' 등)
  };

  return (
    <div className="relative w-full min-h-[100px] md:min-h-[124px] border border-pink-50 rounded-xl md:rounded-2xl bg-pink-100 shadow-sm overflow-hidden flex items-center">
      
      {/* 이미지 영역 - 태블릿 이상에서만 표시 */}
      <img 
        src={BannerIcon} 
        alt="" 
        className="hidden md:block absolute left-[4px] w-[320px] lg:w-[480px] h-[360px] lg:h-[520px] z-0 pointer-events-none object-contain"
      />

      {/* 콘텐츠 영역 */}
      <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-center px-4 md:px-6 md:pl-[180px] lg:pl-[250px] py-4 md:py-0 gap-3 md:gap-4">
        
        {/* 텍스트 */}
        <div className="flex flex-col justify-center gap-1 text-center md:text-left">
          <p className="text-xl sm:text-2xl md:text-[28px] font-bold bg-[image:var(--gradient-4)] bg-clip-text text-transparent leading-tight tracking-tight">
            Upgrade to Premium
          </p>
          <p className="text-sm sm:text-base md:text-[20px] text-gray-500 font-medium leading-snug">
            Get unlimited AI corrections & templates
          </p>
        </div>

        {/* 버튼 */}
        <div className="shrink-0 w-full md:w-auto">
          <SolidButton 
            label="BUY NOW" 
            onClick={handlePaymentClick} // [수정] 클릭 이벤트 연결
            size="medium"
            variant="primary"
            className="bg-[image:var(--gradient-4)] !text-white !font-bold px-6 w-full md:w-auto"
          />
        </div>
      </div>
    </div>
  );
};

//구독 중 배너 - 구독 관리 하면서 추후 구현 예정
{/*
if (subscription.isPremium) {
    const startMonth = subscription.startDate 
      ? new Date(subscription.startDate).toLocaleDateString('ko-KR', { 
          year: 'numeric', 
          month: 'long' 
        })
      : '2025년 1월';

    return (
      <div className="relative w-full min-h-[100px] md:min-h-[124px] border border-pink-50 rounded-xl md:rounded-2xl bg-pink-100 shadow-sm overflow-hidden flex items-center">
      
      {/* 이미지 영역 - 태블릿 이상에서만 표시 
      <img 
        src={Banner2Icon} 
        alt="" 
        className="hidden md:block absolute left-[4px] w-[320px] lg:w-[480px] h-[360px] lg:h-[520px] z-0 pointer-events-none object-contain"
      />

      {/* 콘텐츠 영역 
      <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-center px-4 md:px-6 md:pl-[180px] lg:pl-[250px] py-4 md:py-0 gap-3 md:gap-4">
        
        {/* 텍스트 
        <div className="flex flex-col justify-center gap-1 text-center md:text-left">
          <p className="text-xl sm:text-2xl md:text-[28px] font-bold text-pink-100 leading-tight tracking-tight">
            2025 01월 01부터 Premium Pro 이용중
          </p>
          <p className="text-sm sm:text-base md:text-[20px] text-gray-1 font-medium leading-snug">
            모든 혜택을 이용 중 입니다!
          </p>
        </div>

        {/* 버튼 
        <div className="shrink-0 w-full md:w-auto">
          <ChevIcon classname="w-[48px] h-[48px]"/>
        </div>
      </div>
    </div>
    );
  }*/}
export default Banner;