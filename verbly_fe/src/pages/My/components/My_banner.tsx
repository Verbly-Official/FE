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

export default My_banner;