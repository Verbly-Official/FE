import { useState } from 'react';
import SideMenu from '../../components/Nav/SideMenu';
import { Header } from '../../components/Header/Header';
import { ChatRoomView } from './components/ChatRoomView';
import { EmptyChatState } from './components/EmptyChatState';
import { InboxSidebar } from './components/InboxSidebar';

const InboxPage = () => {
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

    return (
        <div className="flex flex-col h-screen bg-white overflow-hidden">
            {/* Global Header - Fixed Top */}
            <Header />

            {/* Main Layout - Below Header */}
            <div className="flex flex-1 min-h-0">
                {/* Left Side Menu - Percentage width (20%) with min-width for stability */}
                <div className="w-[20%] min-w-[300px] flex-shrink-0 border-r border-gray-200 h-full overflow-y-auto">
                    <SideMenu variant="default" />
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
                            <ChatRoomView chatroomId={selectedChatId} />
                        ) : (
                            <EmptyChatState />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InboxPage;
