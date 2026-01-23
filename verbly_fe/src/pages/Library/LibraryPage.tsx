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
        <div className="min-h-screen bg-bg0 flex flex-col">
            {/* Header */}
            <Header />

            <div className="flex flex-row w-full h-[calc(100vh-60px)]">
                {/* Left Sidebar - 크기 조정 */}
                <div className="flex-shrink-0 [&>div]:w-[200px] [&>div]:px-[20px] [&>div]:py-[30px] [&>div]:gap-[16px] [&_div[class*='w-[221px]']]:!w-full [&_div[class*='h-[56px]']]:!h-[44px] [&_div[class*='h-[60px]']]:!h-[48px] [&_div[class*='text-[24px]']]:!text-[18px] [&_div[class*='px-[32px]']]:!px-[20px] [&_div[class*='py-[20px]']]:!py-[12px]">
                    <SideMenu />
                </div>

                {/* Main Content Wrapper */}
                <div className="flex-1 flex flex-row gap-[20px] px-[20px] py-[24px] overflow-auto max-w-[1400px] mx-auto">

                    {/* Center Content */}
                    <div className="flex-1 flex flex-col gap-[20px] min-w-0">
                        <TodayReviewBanner />
                        <MyLibrarySection words={MOCK_LIBRARY_WORDS} />
                    </div>

                    {/* Right Sidebar */}
                    <div className="w-[300px] flex-shrink-0 flex flex-col gap-[20px]">
                        <UserStatsCard userData={MOCK_USER_PROFILE} stats={MOCK_USER_STATS} />

                        {/* TrendingTag - 300px로 오버라이드 */}
                        <div className="[&>div]:!w-[300px] [&>div]:!p-[20px]">
                            <TrendingTag />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LibraryPage;
