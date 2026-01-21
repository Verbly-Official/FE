import React from 'react';
import Logo from '../Logo/Logo';

import BellIcon from '../../assets/emoji/bell-on.svg';
import { SearchBar } from '../SearchBar/SearchBar';
import { IconButton } from '../Button/IconButton';

interface HeaderProps {
    className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
    return (
        <div className={`flex items-center justify-between w-full h-[60px] bg-white px-[40px] py-[8px] border-b border-gray-200 z-50 relative ${className}`}>
            {/* Left: Logo */}
            <div className="flex-shrink-0">
                <Logo variant="hori" />
            </div>

            {/* Center: Search Bar */}
            <div className="flex-1 max-w-[680px] mx-4 [&>div>div]:!w-full">
                <SearchBar
                    placeholder="Search topics, users or keywords..."
                    className="w-full"
                />
            </div>

            {/* Right: Notification */}
            <div className="flex-shrink-0 relative">
                <IconButton
                    iconSrc={BellIcon}
                    shape="round"
                    size="medium"
                    ariaLabel="Notifications"
                />
                <div className="w-[8px] h-[8px] absolute right-[10px] top-[10px] rounded-full bg-violet-500 pointer-events-none" />
            </div>
        </div>
    );
};
