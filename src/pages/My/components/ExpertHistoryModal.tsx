import React from 'react';
import { ModalWrapper } from './ModalWrapper';
import { StudentHeader } from './StudentHeader';
import { CorrectionContent } from './CorrectionContent';
import type { User } from '../../../types/user';
import { useAuthStore } from '../../../store/useAuthStore';

interface ExpertHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

export default function ExpertHistoryModal({ 
  isOpen, 
  onClose,
  data
}: ExpertHistoryModalProps) {
  
  const { userInfo } = useAuthStore();

  if (!data) return null;

  const modalContent = {
    student: {
      id: userInfo?.userId.toString() || 'guest',
      name: userInfo?.nickname || 'Guest',
      profileImg: userInfo?.profileImage || '',
      bio: userInfo?.bio || '', 
    } as User,
    
    correction: {
      original: {
        textBefore: '',
        wrongText: data.originalText || 'No content',
        textAfter: ''
      },
      corrected: {
        textBefore: '',
        correctText: data.correctedText || 'No content',
        textAfter: ''
      }
    },
    expert: {
      id: 'expert',
      name: data.expertName || 'Expert',
      profileImg: data.imageUrl || '',
      bio: data.location || 'Native Speaker', // 전문가 정보도 bio 사용 권장
      comment: data.comment || 'No comment provided.'
    } as any
  };

  return (
    <ModalWrapper 
      isOpen={isOpen} 
      onClose={onClose} 
      title="의견관리"
    >
      <StudentHeader 
        student={modalContent.student}
        isBookmarked={false}
        onBookmarkToggle={() => {}}
        showActions={false}
      />
      <CorrectionContent 
        correction={modalContent.correction}
        expert={modalContent.expert}
      />
    </ModalWrapper>
  );
}