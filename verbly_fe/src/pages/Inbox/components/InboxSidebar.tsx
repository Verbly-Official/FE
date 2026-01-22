import React, { useState } from 'react';
import { SearchBar } from '../../../components/SearchBar/SearchBar';
import { Avatar } from '../../../components/Avatar/Avatar';
import { Badge as ContentBadge } from '../../../components/Badge/ContentBadge';
import { IconButton } from '../../../components/Button/IconButton';
import { Text } from '../../../components/Text/Text';
import { mockChatrooms } from '../mocks/chatData';
import ReloadIcon from '../../../assets/emoji/reload.svg';

interface InboxSidebarProps {
    selectedChatId: string | null;
    onSelectChat: (id: string) => void;
}

export const InboxSidebar: React.FC<InboxSidebarProps> = ({ selectedChatId, onSelectChat }) => {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter results separately for Profiles and Messages
    const profileResults = mockChatrooms.filter((room) =>
        room.partner.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const messageResults = mockChatrooms.filter((room) =>
        room.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // For the initial view (no search), we show all chatrooms in the message list
    const chatroomsToDisplay = searchQuery ? messageResults : mockChatrooms;

    return (
        <div className="w-full flex-shrink-0 flex flex-col border-r border-gray-200 h-full">
            <div className="px-[30px] py-[24px] flex-shrink-0">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-[24px] font-bold text-gray-900">Chat</h1>
                    <IconButton
                        iconSrc={ReloadIcon}
                        shape="round"
                        size="small"
                        ariaLabel="Refresh"
                        className="!bg-transparent hover:!bg-gray-100"
                    />
                </div>

                {/* Search Bar */}
                <div className="mb-6 [&>div>div]:!w-full">
                    <SearchBar
                        placeholder="Search"
                        className="w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Section: Profile (Horizontal List) - Only show when searching and has results */}
                {searchQuery && profileResults.length > 0 && (
                    <div className="mb-6">
                        <span className="text-body2-medium14 text-gray-500 mb-3 block">프로필</span>
                        <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar">
                            {profileResults.map((room) => (
                                <div key={`profile-${room.id}`} className="flex flex-col items-center gap-2 flex-shrink-0">
                                    <Avatar src={room.partner.avatarUrl} className="w-[48px] h-[48px]" />
                                    <span className="text-[12px] font-bold text-gray-900">{room.partner.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Section Header */}
                <span className="text-body2-medium14 text-gray-500 mb-2 block">메세지</span>
            </div>

            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col">
                    {chatroomsToDisplay.length > 0 ? (
                        chatroomsToDisplay.map((room) => (
                            <div
                                key={room.id}
                                onClick={() => onSelectChat(room.id.toString())}
                                className={`flex items-start gap-3 px-[30px] py-[24px] hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50
                                    ${selectedChatId === room.id.toString() ? 'bg-violet-100' : ''}
                                `}
                            >
                                {/* Avatar */}
                                <Avatar src={room.partner.avatarUrl} className="w-[48px] h-[48px] flex-shrink-0" />

                                {/* Content */}
                                <div className="flex-1 min-w-0 flex flex-col gap-[10px]">
                                    <div className="flex items-center justify-between">
                                        <Text size="medium" className="font-bold text-gray-900">{room.partner.name}</Text>
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
                        ))
                    ) : (
                        <div className="px-[30px] py-10 text-center text-gray-400 text-sm">
                            검색 결과가 없습니다.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
