import React from 'react';
import FireIcon from '../../../assets/emoji/fire2.svg'; // fire2로 변경

export const TodayReviewBanner: React.FC = () => {
    return (
        <div 
            className="w-full rounded-[20px] p-[24px] md:p-[32px] flex justify-between items-center text-white relative overflow-hidden shadow-lg"
            style={{ 
                background: 'var(--gradient-4)',
                minHeight: '140px',
                maxHeight: '180px'
            }}
        >
            <div className="flex flex-col gap-[6px] z-10">
                <h2 className="text-title3-bold24">Today's Review</h2>
                <p className="text-body1-medium16 opacity-90">Keep up your streak! 24 words remaining today</p>
                <div className="flex gap-[24px] mt-[8px]">
                    <div className="flex flex-col">
                        <span className="text-subtitle6-semi18">76%</span>
                        <span className="text-btn1-semi14 opacity-70">Accuracy</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-subtitle6-semi18">120</span>
                        <span className="text-btn1-semi14 opacity-70">Total Saved</span>
                    </div>
                </div>
            </div>
            
            {/* START Button */}
            <div className="z-10">
                <button className="bg-white text-violet-50 px-[20px] py-[12px] rounded-[12px] flex items-center gap-[8px] text-subtitle6-semi18 shadow-md hover:bg-gray-50 transition-all active:scale-95">
                    {/* START 버튼 아이콘도 fire2로 변경 */}
                    <img src={FireIcon} alt="start" className="w-[16px] h-[16px]" />
                    START
                </button>
            </div>

            {/* Character Placeholder (Blob) */}
            <div className="absolute right-[15%] top-1/2 -translate-y-1/2 w-[150px] h-[150px] bg-white/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute right-[18%] top-[20%] w-[60px] h-[60px] bg-pink-40/30 rounded-full blur-2xl"></div>
        </div>
    );
};
