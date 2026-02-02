import React, { useState } from 'react';
import { ModalWrapper } from './ModalWrapper';
import { StudentHeader } from './StudentHeader';
import { CorrectionContent } from './CorrectionContent';
import type { User } from '../../../types/user';

// Mock Data
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

interface ExpertHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  expertName?: string;
}

export default function ExpertHistoryModal({ 
  isOpen, 
  onClose,
  expertName = "Mark"
}: ExpertHistoryModalProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const data = MOCK_EXPERT_DATA;

  return (
    <ModalWrapper 
      isOpen={isOpen} 
      onClose={onClose} 
      title="의견관리"
    >
      <StudentHeader 
        student={data.student}
        isBookmarked={isBookmarked}
        onBookmarkToggle={setIsBookmarked}
        showActions={false}
      />
      <CorrectionContent 
        correction={data.correction}
        expert={data.expert}
      />
    </ModalWrapper>
  );
}