import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore'; // 경로가 맞는지 확인 필요
import { logoutApi } from '../../apis/auth';
import SolidButton from '../../components/Button/SolidButton';

// ✅ [수정 1] 아이콘을 이미지 경로로 불러옵니다.
// 경로가 ../../assets/emoji/ 가 맞는지 확인해주세요. (My/components 기준이라면 ../../../assets/... 일 수 있습니다)
import NoticeIcon from '../../assets/emoji/notice.svg'; 
import CheckIcon from '../../assets/emoji/check-purple.svg'; // 완료 시 보여줄 체크 아이콘

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [step, setStep] = useState<'confirm' | 'complete'>('confirm');

  if (!isOpen) return null;

  // 로그아웃 API 호출
  const handleConfirm = async () => {
    try {
      await logoutApi();
      setStep('complete');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      // 에러 시에도 클라이언트 처리는 진행하거나, 알림 후 닫기
      alert('로그아웃 요청 중 오류가 발생했습니다.');
      onClose();
    }
  };

  // 완료 후 처리
  const handleComplete = () => {
    logout(); 
    navigate('/login'); 
    onClose();
    setStep('confirm'); 
  };

  const handleCancel = () => {
    onClose();
    setStep('confirm');
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
      <div className="bg-[var(--color-white)] rounded-lg shadow-xl w-[660px] p-8 md:p-10 flex flex-col items-center text-center animate-fadeIn mx-4">
        
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
              로그아웃
            </h2>
            <p className="text-[length:var(--fs-title3)] text-gray-5 mb-13 break-keep">
              접속 중인 계정에서 로그아웃 하시겠습니까?
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
                label="예, 로그아웃합니다."
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
               {/* ✅ [수정 3] 완료 상태이므로 체크 아이콘 사용 및 img 태그 적용 */}
               <img 
                 src={CheckIcon} 
                 alt="complete" 
                 className="w-[70px] h-[70px]" 
               />
            </div>

            <h2 className="text-[40px] font-bold text-gray-7 mb-3">
              로그아웃이 완료되었습니다.
            </h2>
            <p className="text-[length:var(--fs-title3)] text-gray-5 mb-13 break-keep">
              이용해주셔서 감사합니다. 로그인이 필요할 경우 재로그인 해주세요.
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