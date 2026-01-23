import React, { useState } from 'react';
import { InteractionIcon } from '../../../components/Interaction/InteractionIcon';
import { IconButton } from '../../../components/Button/IconButton';
import { Text } from '../../../components/Text/Text';
import CloseIcon from '../../../assets/emoji/close.svg';
import SolidButton from '../../../components/Button/SolidButton';
import { UserProfile } from '../../../components/Profile/Profile';
import type { User } from '../../../types/user';

// Mock Data (이전과 동일)
const MOCK_EXPERT_DATA = {
  student: {
    id: 'student1',
    name: '김철수',
    profileImg: '',
    introduction: '영어 공부 중입니다.',
  } as User,
  correction: {
    original: {
      textBefore: 'I am ',
      wrongText: 'looking forward to meet',
      textAfter: ' you next week.'
    },
    corrected: {
      textBefore: 'I am ',
      correctText: 'looking forward to meeting',
      textAfter: ' you next week.'
    }
  },
  expert: {
    id: 'expert1',
    name: 'Mark',
    profileImg: '',
    introduction: 'Native Speaker',
    comment: 'After "look forward to", we always use a noun or gerund (-ing), not the base form of the verb. "To" here is a preposition, not part of the infinitive.'
  } as User & { comment: string }
};

interface ExpertManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  expertName?: string;
}

export default function KoreanHistoryModal({ 
  isOpen, 
  onClose,
  expertName = "Mark"
}: ExpertManagementModalProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const data = MOCK_EXPERT_DATA;

  if (!isOpen) return null;

  return (
    // [수정] Position: absolute로 변경하여 main 영역 내부에 꽉 차게 설정
    // z-30: SideMenu(z-40)와 Header(z-50)보다 낮아서 가려짐
    <div className="absolute inset-0 bg-gray-9/40 flex items-center justify-center z-30">
      
      {/* [수정] Sizing Logic */}
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex-none bg-white flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">전문가 의견관리</h2>
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
          {/* Expert Header Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <UserProfile 
                  size='small'
                  data={data.student} 
                />
              </div>
              <div className="flex items-center gap-2">
                <SolidButton
                  variant="primary"
                  size="medium"
                  label='첨삭한 내용에 만족'
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium"
                />
                <SolidButton 
                  variant="primary"
                  size="medium"
                  label='추가 문의하기'
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium"
                />
                <InteractionIcon 
                  type="bookmark" 
                  selected={isBookmarked} 
                  onToggle={setIsBookmarked} 
                />
              </div>
            </div>
          </div>

          {/* Correction Content Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="space-y-4">
              {/* Original */}
              <div>
                <span className="text-base text-gray-900 leading-relaxed">
                  {data.correction.original.textBefore}
                  <Text size="medium" state="wrong">
                    {data.correction.original.wrongText}
                  </Text>
                  {data.correction.original.textAfter}
                </span>
              </div>

              {/* Corrected */}
              <div>
                <div className="text-xs font-bold text-teal-700 mb-1 tracking-wide">CORRECTED</div>
                <span className="text-base text-gray-900 leading-relaxed">
                  {data.correction.corrected.textBefore}
                  <Text size="medium" state="right">
                    {data.correction.corrected.correctText}
                  </Text>
                  {data.correction.corrected.textAfter}
                </span>
              </div>

              {/* Expert Opinion */}
              <div className="bg-blue-100 border-l-4 border-blue-50 p-3">
                <div className="flex items-start flex-col gap-3">
                  <UserProfile 
                    size='small'
                    data={data.expert}
                  />
                  <p className="text-xs text-gray-700 leading-relaxed mt-1">
                    {data.expert.comment}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}