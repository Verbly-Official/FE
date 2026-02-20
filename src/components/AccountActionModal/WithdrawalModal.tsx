import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { withdrawApi } from '../../apis/user';
import { logoutApi } from '../../apis/auth';
import SolidButton from '../../components/Button/SolidButton';

import NoticeIcon from '../../assets/emoji/notice.svg';
import CheckIcon from '../../assets/emoji/check-purple.svg';

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WithdrawalModal: React.FC<WithdrawalModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [step, setStep] = useState<'confirm' | 'complete'>('confirm');

  if (!isOpen) return null;

  // 회원탈퇴 API 호출
  const handleConfirm = async () => {
    try {
      await withdrawApi(); // 회원 탈퇴 요청
      await logoutApi().catch(() => {}); // 서버 세션 로그아웃 병행 (실패해도 진행)
      setStep('complete');
    } catch (error) {
      console.error('회원탈퇴 실패:', error);
      alert('회원탈퇴 처리에 실패했습니다. 잠시 후 다시 시도해주세요.');
      onClose();
    }
  };

  // 완료 후 처리
  const handleComplete = () => {
    logout();
    onClose();
    setStep('confirm');
    window.location.href = '/login';
  };

  const handleCancel = () => {
    onClose();
    setStep('confirm');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
      <div className="bg-[var(--color-white)] rounded-2xl shadow-xl w-[660px] p-8 md:p-10 flex flex-col items-center text-center animate-fadeIn mx-4">
        
        {step === 'confirm' ? (
          <>
            <div className="mb-5">
              <div 
                className="w-[70px] h-[70px] bg-violet-50" 
                style={{
                  maskImage: `url("${NoticeIcon}")`,       
                  WebkitMaskImage: `url("${NoticeIcon}")`, 
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center'
                }}
              />
            </div>

            <h2 className="text-[40px] font-bold text-gray-7 mb-3">
              회원 탈퇴
            </h2>
            <p className="text-[length:var(--fs-title3)] text-gray-5 mb-[52px] break-keep">
              회원 탈퇴 후 모든 정보가 삭제됩니다. 정말 진행하시겠습니까?
            </p>

            <div className="flex gap-3 w-full">
              <SolidButton
                label="아니요, 하지않겠습니다."
                onClick={handleCancel}
                variant="secondary"
                size="large"
                className="flex-1 font-bold text-[length:var(--Main-Violet-10)]"
              />
              
              <SolidButton
                label="예, 탈퇴하겠습니다."
                onClick={handleConfirm}
                variant="primary"
                size="large"
                className="flex-1 font-bold text-[length:var(--fs-subtitle4)]"
              />
            </div>
          </>
        ) : (
          /* [Step 2] 완료 화면 (Complete) */
          <>
            <div className="mb-5">
               <img 
                 src={CheckIcon} 
                 alt="complete" 
                 className="w-[70px] h-[70px]" 
               />
            </div>

            <h2 className="text-[40px] font-bold text-gray-7 mb-3">
              탈퇴가 완료되었습니다
            </h2>
            <p className="text-[length:var(--fs-title3)] text-gray-5 mb-[52px] break-keep">
              그동안 버블리를 이용해주셔서 감사합니다.
            </p>

            <div className="w-full">
              <SolidButton
                label="확인"
                onClick={handleComplete}
                variant="primary"
                size="large"
                className="w-full font-bold text-[length:var(--fs-subtitle4)]"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};