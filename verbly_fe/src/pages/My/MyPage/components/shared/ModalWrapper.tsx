import React from 'react';
import { IconButton } from '../../../../../components/Button/IconButton';
import CloseIcon from '../../../../../assets/emoji/close.svg';

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-gray-9/40 flex items-center justify-center z-30">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex-none bg-white flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          </div>
          <IconButton 
            iconSrc={CloseIcon}
            onClick={onClose}
            ariaLabel="닫기"
            size="small"
            shape="square"
            className="!bg-transparent hover:!bg-gray-100 !border-none"
          />
        </div>

        {/* Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
};