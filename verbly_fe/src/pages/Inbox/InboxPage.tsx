import { useState } from 'react';
import SideMenu from '../../components/Nav/SideMenu';

import { Header } from '../../components/Header/Header';
import { ChatRoomView } from './components/ChatRoomView';
import { EmptyChatState } from './components/EmptyChatState';
import { InboxSidebar } from './components/InboxSidebar';
import ChatProfileSidebar from './components/ChatProfileSidebar';

const InboxPage = () => {
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen">
              {/* 1. GNB */}
              <div className="w-full max-w-[1920px] mx-auto">
                <Header />
              </div>
        
              {/* 2. 좌측 아이콘바 + 컨텐츠 */}
              <div className="flex w-full max-w-[1920px] mx-auto">
                {/* 가장 왼쪽 사이드바(컴포넌트) */}
                <SideMenu />
                </div>

                {/* Content Area - Flex grow */}
                <div className="flex-1 flex min-w-0 h-full overflow-hidden">
                    {/* Split View Content */}
                    <div className="flex-1 flex min-h-0 overflow-hidden">
                        {/* Chat List Panel - Percentage Width (25%) */}
                        <div className="w-[25%] min-w-[320px] flex-shrink-0 flex flex-col border-r border-gray-200 h-full">
                            <InboxSidebar
                                selectedChatId={selectedChatId}
                                onSelectChat={setSelectedChatId}
                            />
                        </div>

                        {/* Chat Room View or Empty State */}
                        {selectedChatId ? (
                            <ChatRoomView
                                chatroomId={selectedChatId}
                                onToggleSidebar={toggleSidebar}
                                isSidebarOpen={isSidebarOpen}
                            />
                        ) : (
                            <EmptyChatState />
                        )}

                        {/* Right Profile Sidebar */}
                        {isSidebarOpen && selectedChatId && (
                            <div className="w-[360px] flex-shrink-0 border-l border-gray-200 h-full overflow-y-auto bg-white">
                                <ChatProfileSidebar chatroomId={selectedChatId} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
    );
};

export default InboxPage;
