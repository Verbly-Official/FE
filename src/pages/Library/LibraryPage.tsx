import React, { useState, useEffect } from 'react';
import GNB from '../../components/Nav/GNB';
import SideMenu from '../../components/Nav/SideMenu';
import TrendingTag from '../../components/TrendingTag/TrendingTag';
import { TodayReviewBanner } from './components/TodayReviewBanner';
import { MyLibrarySection } from './components/MyLibrarySection';
import { UserStatsCard } from './components/UserStatsCard';
import { LibraryItemCreateTest } from './components/LibraryItemCreateTest';
import { getLibraryItems } from '../../apis/library';
import type { LibraryItem } from '../../types/library';

const LibraryPage: React.FC = () => {
    const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showTest, setShowTest] = useState(false);

    useEffect(() => {
        fetchLibraryItems();
    }, []);

    const fetchLibraryItems = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getLibraryItems({ page: 0, size: 100 });
            setLibraryItems(response.content);
        } catch (err) {
            setError('Failed to load library items');
            console.error('Error fetching library items:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Mock data for components that don't have API yet
    const MOCK_USER_PROFILE = {
        id: '1',
        name: 'User',
        level: 1,
        profileImg: '',
        introduction: 'LV.1',
        role: 'FOREIGNER' as const,
    };

    const MOCK_USER_STATS = {
        follow: 0,
        streak: 0,
        point: 0,
        correctionReceived: 0,
    };

    const MOCK_TODAY_REVIEW_STATS = {
        wordsRemaining: libraryItems.length,
        accuracy: 0,
        totalSaved: libraryItems.length,
    };

    return (
        <div className="w-full bg-bg0 flex flex-col flex-1 overflow-hidden">
            {/* Header */}
            <GNB variant="search" />

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
                        {/* Test Toggle Button */}
                        <button
                            onClick={() => setShowTest(!showTest)}
                            className="self-start px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors text-sm font-medium"
                        >
                            {showTest ? '❌ 테스트 닫기' : '🧪 API 테스트 열기'}
                        </button>

                        {/* Test Component */}
                        {showTest && (
                            <LibraryItemCreateTest />
                        )}

                        <TodayReviewBanner stats={MOCK_TODAY_REVIEW_STATS} />
                        <MyLibrarySection
                            items={libraryItems}
                            isLoading={isLoading}
                            error={error}
                            onRefresh={fetchLibraryItems}
                        />
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
