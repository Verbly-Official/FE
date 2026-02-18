import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SideMenu from '../../components/Nav/SideMenu';

import GNB from '../../components/Nav/GNB';
import { ChatRoomView } from './components/ChatRoomView';
import { EmptyChatState } from './components/EmptyChatState';
import { InboxSidebar } from './components/InboxSidebar';
import ChatProfileSidebar from './components/ChatProfileSidebar';

const InboxPage = () => {
    const location = useLocation();
    const { chatroomId } = useParams<{ chatroomId: string }>();
    const navigate = useNavigate();

    // selectedChatId is now derived from URL, or null if at /inbox
    const selectedChatId = chatroomId || null;

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Lifted state from InboxSidebar
    const [chatrooms, setChatrooms] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Partner info from location state (navigation from profile)
    const [initialPartner, setInitialPartner] = useState<{ name: string; imageUrl: string } | null>(null);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleSelectChat = (id: string) => {
        navigate(`/inbox/${id}`);
    };

    useEffect(() => {
        fetchChatrooms();
    }, []);

    useEffect(() => {
        // If we navigated with state (e.g. from profile), set the partner info
        if (location.state?.partner) {
            setInitialPartner(location.state.partner);
        }
    }, [location.state]);

    const fetchChatrooms = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Dynamically import to avoid circular dependencies if any, 
            // or just ensure imports are top-level. 
            // Assuming getChatrooms is imported.
            // We need to import getChatrooms at top level.
            const { getChatrooms } = await import('../../apis/chatrooms');
            const data = await getChatrooms();

            // Check if we have a pending new chat from navigation (optimistic update)
            if (location.state?.selectedChatId && location.state.partner) {
                const exists = data.find(c => c.chatroomId.toString() === location.state.selectedChatId);
                if (!exists) {
                    const newRoom = {
                        chatroomId: parseInt(location.state.selectedChatId),
                        chatroomName: location.state.partner.name,
                        imageUrl: location.state.partner.imageUrl,
                        chatMessage: "새로운 대화",
                        chatMessageCreatedAt: new Date().toISOString(),
                        unreadChatCount: 0
                    };
                    data.unshift(newRoom);
                }
            }

            setChatrooms(data);
        } catch (err) {
            setError('Failed to load chatrooms');
            console.error('Error fetching chatrooms:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Derive active partner
    const activeChatroom = chatrooms.find(c => c.chatroomId.toString() === selectedChatId);

    // Construct partner object for ChatRoomView
    const activePartner = activeChatroom
        ? { name: activeChatroom.chatroomName, avatarUrl: activeChatroom.imageUrl }
        : (selectedChatId === location.state?.selectedChatId ? initialPartner : null);

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
                        {/* Chat List Panel */}
                        <div className="w-[25%] min-w-[320px] flex-shrink-0 flex flex-col border-r border-gray-200 h-full">
                            <InboxSidebar
                                selectedChatId={selectedChatId}
                                onSelectChat={handleSelectChat}
                                chatrooms={chatrooms} // Pass lifted state
                                isLoading={isLoading}
                                error={error}
                                onRefresh={fetchChatrooms}
                            />
                        </div>

                        {/* Chat Room View or Empty State */}
                        {selectedChatId ? (
                            <ChatRoomView
                                chatroomId={selectedChatId}
                                onToggleSidebar={toggleSidebar}
                                isSidebarOpen={isSidebarOpen}
                                partnerProp={activePartner} // Pass explicit partner
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
