import React from 'react';
import { useNavigate } from 'react-router-dom';
import SolidButton from '../../../components/Button/SolidButton';

// 이미지 import
import BannerIcon from '../img/BannerEmoji.svg';
import Banner2Icon from '../img/Banner2.svg'; // 구독 중일 때 보여줄 이미지
import EclipseIcon from '../img/Banner_Eclipse.svg'; // 배경 데코레이션
import ChevIcon from '../../../assets/emoji/chev-right.svg';

const Banner: React.FC = () => {
  const navigate = useNavigate();

  // TODO: 실제 유저 정보나 구독 상태를 여기서 가져오세요.
  // const { me } = useUser();
  // const isPremium = me?.level && me.level > 1; 
  const isPremium = false; // 🚧 테스트용: true로 변경하여 구독 중 화면 확인 가능

  // [구독 전] 결제 페이지로 이동
  const handlePaymentClick = () => {
    navigate('/my/korean/payment');
  };

  // [구독 중] 구독 관리/결제 내역 페이지로 이동
  const handleManageClick = () => {
    navigate('/my/korean/payment'); // 또는 '/my/subscription-history' 등
  };

  // --------------------------------------------------------------------------
  // Case 1: 구독 중 (After Subscription)
  // --------------------------------------------------------------------------
  if (isPremium) {
    // 날짜 포맷팅 예시
    const startDate = new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
      <div 
        className="relative w-full min-h-[100px] md:min-h-[124px] border border-violet-100 rounded-xl md:rounded-2xl bg-violet-50 shadow-sm overflow-hidden flex items-center cursor-pointer transition-transform hover:scale-[1.01]"
        onClick={handleManageClick}
      >
        {/* 배경 데코레이션 (Eclipse) */}
        <img 
          src={EclipseIcon} 
          alt="" 
          className="absolute right-0 top-0 h-full object-cover opacity-50 z-0 pointer-events-none"
        />

        {/* 왼쪽: 프리미엄 이미지 */}
        <img 
          src={Banner2Icon} 
          alt="Premium User" 
          className="hidden md:block absolute left-[-10px] bottom-[-10px] w-[140px] lg:w-[180px] h-auto z-10 pointer-events-none object-contain drop-shadow-md"
        />

        {/* 중앙: 텍스트 정보 */}
        <div className="relative z-10 w-full flex justify-between items-center px-6 md:pl-[160px] lg:pl-[200px] py-4">
          <div className="flex flex-col gap-1">
            <p className="text-[length:var(--fs-title3)] md:text-[length:var(--fs-title1)] font-bold text-violet-600 leading-tight">
              Premium Pro 이용 중
            </p>
            <p className="text-[length:var(--fs-body2)] md:text-[length:var(--fs-body1)] text-gray-500 font-medium">
              {startDate}부터 모든 혜택을 누리고 있어요!
            </p>
          </div>

          {/* 오른쪽: 이동 화살표 */}
          <div className="shrink-0 pl-4">
            <img 
              src={ChevIcon} 
              alt="Go" 
              className="w-6 h-6 md:w-8 md:h-8 opacity-40" 
            />
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Case 2: 구독 전 (Before Subscription) - 기존 코드 유지
  // --------------------------------------------------------------------------
  return (
    <div className="relative w-full min-h-[100px] md:min-h-[124px] border border-pink-50 rounded-xl md:rounded-2xl bg-pink-100 shadow-sm overflow-hidden flex items-center">
      
      {/* 배경 이미지 */}
      <img 
        src={BannerIcon} 
        alt="" 
        className="hidden md:block absolute left-[4px] w-[320px] lg:w-[480px] h-[360px] lg:h-[520px] z-0 pointer-events-none object-contain"
      />

      {/* 텍스트 및 버튼 영역 */}
      <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-center px-4 md:px-6 md:pl-[180px] lg:pl-[250px] py-4 md:py-0 gap-3 md:gap-4">
        
        <div className="flex flex-col justify-center gap-1 text-center md:text-left">
          <p className="text-[length:var(--fs-title1)] font-bold bg-[image:var(--gradient-4)] bg-clip-text text-transparent leading-tight tracking-tight">
            Upgrade to Premium
          </p>
          <p className="text-[length:var(--fs-title3)] text-gray-5 font-medium leading-snug">
            Get unlimited AI corrections & templates
          </p>
        </div>

        <div className="shrink-0 w-full md:w-auto">
          <SolidButton 
            label="BUY NOW" 
            onClick={handlePaymentClick}
            size="medium"
            variant="primary"
            className="bg-[image:var(--gradient-4)] !text-[var(--color-white)] !font-bold px-6 w-full md:w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;