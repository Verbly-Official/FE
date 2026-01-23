import React from 'react';
import { useNavigate } from 'react-router-dom';
import FirePurpleIcon from '../../../assets/emoji/fire-purple.svg';
import OutlinedButton from '../../../components/Button/OutlinedButton';
import BannerEmoji from '../../../components/Mypage/img/BannerEmoji.svg';

interface TodayReviewBannerProps {
    stats: {
        wordsRemaining: number;
        accuracy: number;
        totalSaved: number;
    };
}

export const TodayReviewBanner: React.FC<TodayReviewBannerProps> = ({ stats }) => {
    const navigate = useNavigate();

    const handleStartClick = () => {
        navigate('/review');
    };

    return (
        <div
            className="w-full rounded-[12px] p-[32px] flex justify-between items-center text-white relative overflow-hidden"
            style={{
                background: 'var(--gradient-4)',
                minHeight: '117px',
            }}
        >
            <div className="flex flex-col gap-[8px] z-10">
                <h2 className="text-title-bold28 text-white">Today's Review</h2>
                <p className="text-btn-medium14 text-violet-100">
                    Keep up your streak! {stats.wordsRemaining} words remaining today
                </p>
                <div className="flex gap-[24px] mt-[8px]">
                    <div className="flex flex-col">
                        <span className="text-subtitle-semi24 text-white">{stats.accuracy}%</span>
                        <span className="text-cap-medium11 text-white">Accuracy</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-subtitle-semi24 text-white">{stats.totalSaved}</span>
                        <span className="text-cap-medium11 text-white">Total Saved</span>
                    </div>
                </div>
            </div>

            {/* Mascot Image */}
            <div className="absolute right-[120px] top-1/2 -translate-y-1/2 z-0 pointer-events-none">
                <img
                    src={BannerEmoji}
                    alt="Mascot"
                    className="w-[280px] h-auto opacity-90"
                />
            </div>

            {/* START Button */}
            <div className="z-10">
                <OutlinedButton
                    label="START"
                    iconSrc={FirePurpleIcon}
                    variant="primary"
                    size="large"
                    className="!bg-white !text-violet-50 text-subtitle-semi18 !rounded-[12px] !h-auto !py-[12px] !px-[32px] shadow-sm"
                    onClick={handleStartClick}
                />
            </div>
        </div>
    );
};
