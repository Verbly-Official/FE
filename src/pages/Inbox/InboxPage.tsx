import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SideMenu from '../../components/Nav/SideMenu';

import GNB from '../../components/Nav/GNB';
import { ChatRoomView } from './components/ChatRoomView';
import { EmptyChatState } from './components/EmptyChatState';
import { InboxSidebar } from './components/InboxSidebar';
import ChatProfileSidebar from './components/ChatProfileSidebar';

const InboxPage = () => {
    const { chatroomId } = useParams<{ chatroomId: string }>();
    const navigate = useNavigate();
    const [selectedChatId, setSelectedChatId] = useState<string | null>(chatroomId || null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // URL 파라미터가 변경되면 selectedChatId 업데이트
    useEffect(() => {
        if (chatroomId) {
            setSelectedChatId(chatroomId);
        }
    }, [chatroomId]);

    // 채팅방 선택 시 URL 업데이트 (선택 사항, UX에 따라 결정)
    const handleSelectChat = (id: string) => {
        setSelectedChatId(id);
        navigate(`/inbox/${id}`);
    };

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
                                onSelectChat={handleSelectChat}
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
