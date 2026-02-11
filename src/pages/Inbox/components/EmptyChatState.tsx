import React from 'react';


export const EmptyChatState: React.FC = () => {
    return (
        <div className="flex-1 bg-gray-50 h-full flex items-center justify-center">
            <div className="text-center text-gray-400">
                <span className="text-body1-medium16 text-gray-400">
                    Select a chat to start messaging
                </span>
            </div>
        </div>
    );
};
