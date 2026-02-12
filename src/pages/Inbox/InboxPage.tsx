import { useState } from 'react';
import SideMenu from '../../components/Nav/SideMenu';

import GNB from '../../components/Nav/GNB';
import { ChatRoomView } from './components/ChatRoomView';
import { EmptyChatState } from './components/EmptyChatState';
import { InboxSidebar } from './components/InboxSidebar';
import ChatProfileSidebar from './components/ChatProfileSidebar';

const InboxPage = () => {
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex flex-col h-screen bg-bg0">
            {/* 1. GNB */}
            <GNB variant="search" />

            {/* 2. Main Content Wrapper */}
            <div className="flex flex-1 overflow-hidden">
                {/* 3. Sidebar */}
                <div className="hidden md:flex flex-shrink-0 w-[200px] lg:w-[250px] xl:w-[280px] bg-white border-r border-line1">
                    <SideMenu />
                </div>

                {/* 4. Content Area - Flex grow */}
                <div className="flex-1 flex min-w-0 h-full overflow-hidden bg-white">
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
        </div>
    );
};

export default InboxPage;
