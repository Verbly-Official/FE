import { useState, useEffect } from 'react';
import type { User } from '../../../types/user';
import type { Option } from '../../../components/Select/Select';

const VERIFICATION_TIMEOUT = 180;
const TOAST_DURATION = 3000;

interface ToastMessage {
  variant: 'cautionary' | 'positive';
  message: string;
  // Toast.tsx를 수정하지 않고 스타일을 덮어씌우기 위한 옵션
  bgClassName?: string;
  iconColorClassName?: string;
}

export const useProfileForm = (initialUser: User) => {
  const [user, setUser] = useState<User>(initialUser);
  const [previewImg, setPreviewImg] = useState<string>(initialUser.profileImg || '');
  
  const [emailId, setEmailId] = useState('');
  const [emailDomain, setEmailDomain] = useState<Option | null>(null);
  const [customEmailDomain, setCustomEmailDomain] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [timer, setTimer] = useState(0);
  
  const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null);

  // 타이머 관리
  useEffect(() => {
    if (!isVerificationSent || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          setIsVerificationSent(false);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isVerificationSent, timer]);

  // Toast 자동 숨김
  useEffect(() => {
    if (!toastMessage) return;

    const timeout = setTimeout(() => {
      setToastMessage(null);
    }, TOAST_DURATION);

    return () => clearTimeout(timeout);
  }, [toastMessage]);

  // 스타일 옵션을 받을 수 있도록 함수 파라미터 확장
  const showToast = (
    variant: 'cautionary' | 'positive', 
    message: string, 
    options?: { bgClassName?: string; iconColorClassName?: string }
  ) => {
    setToastMessage({ variant, message, ...options });
  };

  const handleImageUpload = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setPreviewImg(objectUrl);
  };

  // 전화번호 입력 확인 로직 삭제
  const handleSendVerification = () => {
    // 전화번호 입력 여부와 상관없이 바로 전송 로직 수행

    setIsVerificationSent(true);
    setTimer(VERIFICATION_TIMEOUT);
    
    // positive variant 사용 - Toast.tsx의 기본 positive 아이콘(초록색 체크박스)이 표시됨
    showToast('positive', '인증번호 전송완료');
  };

  const getFullEmail = () => {
    if (!emailId) return '';
    
    if (emailDomain?.value === 'write') {
      return customEmailDomain ? `${emailId}@${customEmailDomain}` : emailId;
    }
    
    return emailDomain?.label ? `${emailId}${emailDomain.label}` : emailId;
  };

  const validateAndSave = () => {
    if (!user.name.trim()) {
      // 이름 미입력 시 붉은 배경/흰색 아이콘 적용
      showToast('cautionary', '필수 입력칸 미입력입니다. 다시 확인해주세요.', {
        bgClassName: 'bg-[#FF6363]',
        iconColorClassName: 'text-white'
      });
      return false;
    }

    const savedData = {
      ...user,
      profileImg: previewImg,
      email: getFullEmail(),
      phone,
    };

    console.log("저장 데이터:", savedData);
    return savedData;
  };

  return {
    user,
    setUser,
    previewImg,
    emailId,
    setEmailId,
    emailDomain,
    setEmailDomain,
    customEmailDomain,
    setCustomEmailDomain,
    phone,
    setPhone,
    verificationCode,
    setVerificationCode,
    isVerificationSent,
    timer,
    toastMessage,
    handleImageUpload,
    handleSendVerification,
    validateAndSave,
    showToast,
  };
};