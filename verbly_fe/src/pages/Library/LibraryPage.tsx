import React from 'react';
import { Header } from '../../components/Header/Header';
import SideMenu from '../../components/Nav/SideMenu';
import TrendingTag from '../../components/TrendingTag/TrendingTag';
import { TodayReviewBanner } from './components/TodayReviewBanner';
import { MyLibrarySection } from './components/MyLibrarySection';
import { UserStatsCard } from './components/UserStatsCard';
import { MOCK_LIBRARY_WORDS, MOCK_USER_PROFILE, MOCK_USER_STATS } from './mockData';

const LibraryPage: React.FC = () => {
    return (
        <div className="w-full bg-bg0 flex flex-col flex-1 overflow-hidden">
            {/* Header */}
            <Header />

            {/* Main Content Wrapper - 모든 화면 크기에 반응형 */}
            <div className="w-full flex flex-col md:flex-row flex-1 overflow-hidden">
                {/* Left Sidebar - 반응형 너비 */}
                <div className="hidden md:flex flex-shrink-0 w-[200px] lg:w-[250px] xl:w-[280px] [&>div]:w-full [&>div]:px-[16px] md:[&>div]:px-[20px] lg:[&>div]:px-[24px] [&>div]:py-[32px] md:[&>div]:py-[40px] [&>div]:gap-[16px] md:[&>div]:gap-[20px] [&_div[class*='w-[221px]']]:!w-full [&_div[class*='h-[56px]']]:!h-[48px] [&_div[class*='h-[60px]']]:!h-[48px] [&_div[class*='text-[24px]']]:!text-[16px] md:[&_div[class*='text-[24px]']]:!text-[18px] [&_div[class*='px-[32px]']]:!px-[12px] md:[&_div[class*='px-[32px]']]:!px-[14px] [&_div[class*='py-[20px]']]:!py-[12px] md:[&_div[class*='py-[20px]']]:!py-[14px]">
                    <SideMenu />
                </div>

                {/* Content Area - 반응형 */}
                <div className="flex-1 flex flex-col lg:flex-row gap-[8px] lg:gap-[12px] px-[16px] md:px-[16px] lg:px-[20px] py-[20px] md:py-[24px] lg:py-[28px] overflow-y-auto">

                    {/* Center Content */}
                    <div className="flex-1 flex flex-col gap-[20px] md:gap-[24px] lg:gap-[28px] min-w-0">
                        <TodayReviewBanner />
                        <MyLibrarySection words={MOCK_LIBRARY_WORDS} />
                    </div>

                    {/* Right Sidebar - 반응형 (lg 이상에서만 표시) */}
                    <div className="hidden lg:flex w-[260px] xl:w-[280px] flex-shrink-0 flex-col gap-[16px]">
                        <UserStatsCard userData={MOCK_USER_PROFILE} stats={MOCK_USER_STATS} />
                        <TrendingTag />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LibraryPage;
