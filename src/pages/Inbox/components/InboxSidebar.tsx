import React, { useState, useEffect } from 'react';
import { SearchBar } from '../../../components/SearchBar/SearchBar';
import { Avatar } from '../../../components/Avatar/Avatar';
import { Badge as ContentBadge } from '../../../components/Badge/ContentBadge';
import { IconButton } from '../../../components/Button/IconButton';
import { Text } from '../../../components/Text/Text';
import { getChatrooms, searchChatrooms } from '../../../apis/chatrooms';
import type { ChatroomListItem, ChatProfile } from '../../../types/chat';
import ReloadIcon from '../../../assets/emoji/reload.svg';

interface InboxSidebarProps {
    selectedChatId: string | null;
    onSelectChat: (id: string) => void;
}

export const InboxSidebar: React.FC<InboxSidebarProps> = ({ selectedChatId, onSelectChat }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [chatrooms, setChatrooms] = useState<ChatroomListItem[]>([]);
    const [profileResults, setProfileResults] = useState<ChatProfile[]>([]);
    const [messageResults, setMessageResults] = useState<ChatroomListItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch chatrooms on mount
    useEffect(() => {
        fetchChatrooms();
    }, []);

    const fetchChatrooms = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getChatrooms();
            setChatrooms(data);
        } catch (err) {
            setError('Failed to load chatrooms');
            console.error('Error fetching chatrooms:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle search
    useEffect(() => {
        const performSearch = async () => {
            if (!searchQuery.trim()) {
                setProfileResults([]);
                setMessageResults([]);
                return;
            }

            try {
                const results = await searchChatrooms(searchQuery);
                setProfileResults(results.chatProfileResponseDTOList);
                setMessageResults(results.outerChatroomInfoResponseDTOList);
            } catch (err) {
                console.error('Error searching chatrooms:', err);
            }
        };

        const debounceTimer = setTimeout(performSearch, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchQuery]);

    // Determine which chatrooms to display
    const chatroomsToDisplay = searchQuery ? messageResults : chatrooms;

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

        if (diffInHours < 24) {
            return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });
        } else {
            return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
        }
    };

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
                        onClick={fetchChatrooms}
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
                            {profileResults.map((profile) => (
                                <div
                                    key={`profile-${profile.chatroomId}`}
                                    className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer"
                                    onClick={() => onSelectChat(profile.chatroomId.toString())}
                                >
                                    <Avatar src={profile.imageUrl} className="w-[48px] h-[48px]" />
                                    <span className="text-[12px] font-bold text-gray-900">{profile.chatroomName}</span>
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
                {isLoading ? (
                    <div className="px-[30px] py-10 text-center text-gray-400 text-sm">
                        Loading...
                    </div>
                ) : error ? (
                    <div className="px-[30px] py-10 text-center text-red-500 text-sm">
                        {error}
                    </div>
                ) : (
                    <div className="flex flex-col">
                        {chatroomsToDisplay.length > 0 ? (
                            chatroomsToDisplay.map((room) => (
                                <div
                                    key={room.chatroomId}
                                    onClick={() => onSelectChat(room.chatroomId.toString())}
                                    className={`flex items-start gap-3 px-[30px] py-[24px] hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50
                                        ${selectedChatId === room.chatroomId.toString() ? 'bg-violet-100' : ''}
                                    `}
                                >
                                    {/* Avatar */}
                                    <Avatar src={room.imageUrl} className="w-[48px] h-[48px] flex-shrink-0" />

                                    {/* Content */}
                                    <div className="flex-1 min-w-0 flex flex-col gap-[10px]">
                                        <div className="flex items-center justify-between">
                                            <Text size="medium" className="font-bold text-gray-900">{room.chatroomName}</Text>
                                            <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                                                {formatTime(room.chatMessageCreatedAt)}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-gray-500 text-sm truncate pr-2">
                                                {room.chatMessage}
                                            </p>
                                            {room.unreadChatCount > 0 && (
                                                <ContentBadge
                                                    content={room.unreadChatCount.toString()}
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
                                {searchQuery ? '검색 결과가 없습니다.' : '채팅방이 없습니다.'}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
