import React, { useState, type KeyboardEvent, useRef, useEffect } from 'react';
import { TextField } from '../../../components/TextArea/TextField';
import ClipIcon from '../../../assets/emoji/clip.svg';

interface ChatInputProps {
    onSend: (content: string) => void;
    disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled = false }) => {
    const [message, setMessage] = useState('');
    const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

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

    const toggleAttachmentMenu = () => {
        if (!disabled) {
            setShowAttachmentMenu(!showAttachmentMenu);
        }
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowAttachmentMenu(false);
            }
        };

        if (showAttachmentMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showAttachmentMenu]);

    return (
        <div className="px-6 py-4 border-t border-gray-200 bg-white relative">
            {/* Attachment Popover */}
            {showAttachmentMenu && (
                <div
                    ref={menuRef}
                    className="absolute bottom-[calc(100%-10px)] left-6 z-50 inline-flex flex-col items-start p-[20px_28px] gap-[14px] bg-white border border-[#ADADAD] rounded-[12px] shadow-lg"
                >
                    <button
                        className="flex items-center gap-1 hover:opacity-70 transition"
                        onClick={() => {
                            console.log('Add photos and files clicked');
                            setShowAttachmentMenu(false);
                        }}
                    >
                        <img src={ClipIcon} alt="clip" className="w-5 h-5" />
                        <span className="text-[length:var(--fs-subtitle2)] font-medium text-gray-900">사진 및 파일 추가</span>
                    </button>
                </div>
            )}

            <div className="flex items-center gap-2">
                <TextField
                    shape="round"
                    showBtn={true}
                    placeholder="메시지 입력하기..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onSendClick={handleSend}
                    onPlusClick={toggleAttachmentMenu}
                    disabled={disabled}
                    className="flex-1"
                />
            </div>
        </div>
    );
};
