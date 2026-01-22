import SideMenu from '../../components/Nav/SideMenu';

import { SearchBar } from '../../components/SearchBar/SearchBar';
import { Avatar } from '../../components/Avatar/Avatar';
import { ContentBadge } from '../../components/Badge/ContentBadge';
import { Header } from '../../components/Header/Header';
import { mockChatrooms } from './mocks/chatData';

const InboxPage = () => {
    return (
        <div className="flex flex-col h-screen bg-white overflow-hidden">
            {/* Global Header - Fixed Top */}
            <Header />

            {/* Main Layout - Below Header */}
            <div className="flex flex-1 min-h-0">
                {/* Left Side Menu - Fixed width */}
                <div className="flex-shrink-0 border-r border-gray-200 h-full overflow-y-auto">
                    <SideMenu variant="default" />
                </div>

                {/* Content Area - Flex grow */}
                <div className="flex-1 flex min-w-0 h-full">
                    {/* Split View Content */}
                    <div className="flex-1 flex min-h-0">
                        {/* Chat List Panel - Fixed Width (e.g., 400px) */}
                        <div className="w-[400px] flex flex-col border-r border-gray-200 h-full">
                            <div className="p-6 flex-shrink-0">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <h1 className="text-[24px] font-bold text-gray-900">Chat</h1>
                                    <button className="p-2 hover:bg-gray-100 rounded-full">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.53614 4 7.33236 5.11309 5.86477 6.86477" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round" />
                                            <path d="M4 4V8H8" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Search Bar */}
                                <div className="mb-6 [&>div>div]:!w-full">
                                    <SearchBar placeholder="Search" className="w-full" />
                                </div>

                                {/* Section Header */}
                                <h2 className="text-sm font-semibold text-gray-500 mb-2">메세지</h2>
                            </div>

                            {/* Scrollable List */}
                            <div className="flex-1 overflow-y-auto">
                                <div className="flex flex-col">
                                    {mockChatrooms.map((room) => (
                                        <div
                                            key={room.id}
                                            className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50"
                                        >
                                            {/* Avatar */}
                                            <Avatar src={room.partner.avatarUrl} className="w-[48px] h-[48px] flex-shrink-0" />

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-base font-bold text-gray-900">{room.partner.name}</span>
                                                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{room.time}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-gray-500 text-sm truncate pr-2">
                                                        {room.lastMessage}
                                                    </p>
                                                    {room.unreadCount > 0 && (
                                                        <ContentBadge
                                                            content={room.unreadCount.toString()}
                                                            size="small"
                                                            className="!bg-[#713DE3] !text-white !h-[20px] !px-[6px] !rounded-full !text-[11px] flex-shrink-0"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Empty Chat View - Flex 1 */}
                        <div className="flex-1 bg-gray-50 h-full flex items-center justify-center">
                            {/* Placeholder for empty state or selected chat */}
                            <div className="text-center text-gray-400">
                                {/* You can add an illustration here later */}
                                <p>Select a chat to start messaging</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InboxPage;
