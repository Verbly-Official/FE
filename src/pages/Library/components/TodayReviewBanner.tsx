import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FirePurpleIcon from '../../../assets/emoji/fire-purple.svg';
import BannerEmoji from '../../My/img/BannerEmoji.svg';
import { startQuizSession } from '../Review/api';

interface TodayReviewBannerProps {
    stats: {
        wordsRemaining: number;
        accuracy: number;
        totalSaved: number;
    };
}

export const TodayReviewBanner: React.FC<TodayReviewBannerProps> = ({ stats }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleStartClick = async () => {
        setIsLoading(true);
        try {
            const session = await startQuizSession();
            // Navigate to review page with session data
            navigate('/review', { state: { session } });
        } catch (error) {
            console.error('Failed to start quiz session:', error);
            alert('Failed to start quiz session. Please try again.');
        } finally {
            setIsLoading(false);
        }
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
                <button
                    onClick={handleStartClick}
                    disabled={isLoading}
                    className="inline-flex justify-center items-center gap-[8px] px-[32px] py-[12px] bg-white text-violet-50 rounded-[12px] border border-violet-50 shadow-sm hover:bg-violet-100 active:bg-violet-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <img src={FirePurpleIcon} alt="fire" className="w-[24px] h-[24px]" />
                    <span className="font-semibold">{isLoading ? "LOADING..." : "START"}</span>
                </button>
            </div>
        </div>
    );
};

