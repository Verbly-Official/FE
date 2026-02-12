import React, { useState, useEffect } from 'react';
import GNB from '../../components/Nav/GNB';
import SideMenu from '../../components/Nav/SideMenu';
import TrendingTag from '../../components/TrendingTag/TrendingTag';
import { TodayReviewBanner } from './components/TodayReviewBanner';
import { MyLibrarySection } from './components/MyLibrarySection';
import { UserStatsCard } from '../../components/ProfileCard/UserStatsCard';
import { LibraryItemCreateTest } from './components/LibraryItemCreateTest';
import { getLibraryItems } from '../../apis/library';
import { getViewerInfo } from '../../apis/home';
import type { LibraryItem } from '../../types/library';
import type { ViewerInfo } from '../../types/home';

const LibraryPage: React.FC = () => {
    const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showTest, setShowTest] = useState(false);
    const [viewer, setViewer] = useState<ViewerInfo | null>(null);

    useEffect(() => {
        fetchLibraryItems();
        fetchViewer();
    }, []);

    const fetchViewer = async () => {
        try {
            const data = await getViewerInfo();
            setViewer(data);
        } catch (err) {
            console.error('Error fetching viewer info:', err);
        }
    };

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
                <div className="hidden md:flex flex-shrink-0">
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
                        <UserStatsCard
                            userData={{
                                id: 'viewer',
                                name: viewer?.nickname ?? '',
                                level: viewer?.level ? parseInt(viewer.level.replace("LV", "")) : 1,
                                profileImg: viewer?.imageUrl ?? '',
                                introduction: '',
                                role: 'FOREIGNER',
                            }}
                            stats={{
                                follow: viewer?.following ?? 0,
                                streak: viewer?.streak ?? 0,
                                point: viewer?.point ?? 0,
                                correctionReceived: viewer?.correctionReceived ?? 0,
                            }}
                        />
                        <TrendingTag />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LibraryPage;
