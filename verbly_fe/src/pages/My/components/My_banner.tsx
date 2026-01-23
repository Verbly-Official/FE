import SolidButton from '../../../components/Button/SolidButton';
import BannerIcon from '../img/BannerEmoji.svg';

const My_banner: React.FC = () => {
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
            onClick={() => {}} 
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
      <div className="relative w-full min-h-[100px] md:min-h-[124px] border border-purple-100 rounded-xl md:rounded-2xl overflow-hidden flex items-center bg-[image:var(--gradient-4)] shadow-lg">
        {/* 배경 장식 효과 
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl"></div>
        </div>

        {/* 이모지 영역 - 태블릿 이상에서만 표시 
        <div className="hidden md:block absolute left-4 text-[120px] z-0 pointer-events-none">
          😊
        </div>

        {/* 콘텐츠 영역 
        <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-center px-4 md:px-6 md:pl-[180px] py-4 md:py-0 gap-3 md:gap-4">
          <div className="flex flex-col justify-center gap-2 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              {/* 체크 아이콘 
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13 4L6 11L3 8" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-xl sm:text-2xl md:text-[28px] font-bold text-white leading-tight tracking-tight">
                {startMonth}부터 Premium Pro 이용중
              </p>
            </div>
            <p className="text-sm sm:text-base md:text-[18px] text-white/90 font-medium leading-snug">
              모든 혜택을 이용 중 입니다!
            </p>
          </div>

          {/* 구독 관리 버튼 
          <div className="shrink-0 w-full md:w-auto">
            <SolidButton 
              label="구독 관리" 
              onClick={() => {
                // 구독 관리 페이지로 이동 또는 모달 오픈
                console.log('구독 관리');
              }} 
              size="medium"
              variant="primary"
              className="!bg-white !text-purple-600 !font-semibold px-6 w-full md:w-auto hover:!bg-purple-50"
            />
          </div>
        </div>

        {/* 우측 화살표 아이콘 
        <div className="absolute right-4 text-white/30 hidden lg:block pointer-events-none">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    );
  }*/}
export default My_banner;