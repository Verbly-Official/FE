import { useState } from 'react';
import SideMenu from '../../components/Nav/SideMenu';

import { ContentBadge } from '../../components/Badge/ContentBadge';
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
        <div className="flex flex-col h-screen bg-white overflow-hidden">
            {/* Global Header - Fixed Top */}
            <Header />

            {/* Main Layout - Below Header */}
            <div className="flex flex-1 min-h-0">
                {/* Left Side Menu - Percentage width (20%) with min-width for stability */}
                <div className={`${isSidebarOpen ? 'w-[96px]' : 'w-[20%] min-w-[300px]'} flex-shrink-0 border-r border-gray-200 h-full overflow-y-auto transition-all duration-300`}>
                    <SideMenu variant={isSidebarOpen ? "small" : "default"} />
                </div>

                {/* Content Area - Flex grow */}
                <div className="flex-1 flex min-w-0 h-full">
                    {/* Split View Content */}
                    <div className="flex-1 flex min-h-0">
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
