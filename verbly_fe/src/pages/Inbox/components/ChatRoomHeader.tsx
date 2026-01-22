import React from 'react';
import type { Partner } from '../../../types/chat';
import { Avatar } from '../../../components/Avatar/Avatar';
import { Badge as ContentBadge } from '../../../components/Badge/ContentBadge';
import { IconButton } from '../../../components/Button/IconButton';
import MoreIcon from '../../../assets/emoji/more-vert.svg';

interface ChatRoomHeaderProps {
    partner: Partner;
}

export const ChatRoomHeader: React.FC<ChatRoomHeaderProps> = ({ partner }) => {
    return (
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
            {/* Left: Avatar + Name + Badges */}
            <div className="flex items-center gap-4">
                <Avatar src={partner.avatarUrl} className="w-[48px] h-[48px]" />

                <div className="flex items-center gap-2">
                    <span className="text-subtitle6-semi18 text-gray-900">
                        {partner.name}
                    </span>

                    {partner.status === 'online' && (
                        <ContentBadge
                            content="Online"
                            size="small"
                            className="!bg-blue-100 !text-blue-60"
                        />
                    )}
                </div>
            </div>

            {/* Right: More options button */}
            <IconButton
                iconSrc={MoreIcon}
                shape="round"
                size="medium"
                ariaLabel="More options"
                className="!bg-white hover:!bg-gray-100"
            />
        </div>
    );
};
