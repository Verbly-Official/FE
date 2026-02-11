import React, { useState } from 'react';
import { ModalWrapper } from './ModalWrapper';
import { StudentHeader } from './StudentHeader';
import { CorrectionContent } from './CorrectionContent';
import type { User } from '../../../types/user';
import { useAuthStore } from '../../../store/useAuthStore';

interface KoreanHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any; 
}

export default function KoreanHistoryModal({ 
  isOpen, 
  onClose,
  data 
}: KoreanHistoryModalProps) {
  
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { userInfo } = useAuthStore();

  if (!data) return null;

  const modalContent = {
    // ✅ [수정] introduction -> bio 로 변경 (User 타입 정의 일치)
    student: {
      id: userInfo?.userId.toString() || 'guest',
      name: userInfo?.nickname || 'Guest',
      profileImg: userInfo?.profileImage || '',
      bio: userInfo?.bio || '', // 여기가 수정됨
    } as User,
    
    correction: {
      original: {
        textBefore: '',
        wrongText: data.originalText || '(원문 내용 없음)',
        textAfter: ''
      },
      corrected: {
        textBefore: '',
        correctText: data.correctedText || '(첨삭 내용 없음)',
        textAfter: ''
      }
    },
    
    expert: {
      id: 'expert',
      name: data.expertName || 'Expert',
      profileImg: data.imageUrl || '',
      // 전문가 정보는 User 타입과 별개로 처리하거나, 필요 시 bio로 통일
      bio: data.location || 'Professional Corrector', 
      comment: data.comment || '작성된 코멘트가 없습니다.'
    } as any // 전문가 객체 구조가 User와 다를 수 있어 유연하게 처리
  };

  return (
    <ModalWrapper 
      isOpen={isOpen} 
      onClose={onClose} 
      title="전문가 의견관리"
    >
      <StudentHeader 
        student={modalContent.student}
        isBookmarked={isBookmarked}
        onBookmarkToggle={setIsBookmarked}
        showActions={true} 
      />
      
      <CorrectionContent 
        correction={modalContent.correction}
        expert={modalContent.expert}
      />
    </ModalWrapper>
  );
}