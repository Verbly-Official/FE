import React, { useState, type KeyboardEvent } from 'react';
import { TextField } from '../../../components/TextArea/TextField';

interface ChatInputProps {
    onSend: (content: string) => void;
    disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled = false }) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim() && !disabled) {
            onSend(message.trim());
            setMessage('');
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="px-6 py-4 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-2">
                <TextField
                    shape="round"
                    showBtn={true}
                    placeholder="메시지 입력하기..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onSendClick={handleSend}
                    disabled={disabled}
                    className="flex-1"
                />
            </div>
        </div>
    );
};
