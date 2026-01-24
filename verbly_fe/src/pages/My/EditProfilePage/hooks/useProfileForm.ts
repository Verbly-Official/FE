import { useState, useEffect } from 'react';
import type { User } from '../../../../types/user';
import type { Option } from '../../../../components/Select/Select';

const VERIFICATION_TIMEOUT = 180;
const TOAST_DURATION = 3000;

interface ToastMessage {
  variant: 'cautionary' | 'positive';
  message: string;
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

  const showToast = (variant: 'cautionary' | 'positive', message: string) => {
    setToastMessage({ variant, message });
  };

  const handleImageUpload = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setPreviewImg(objectUrl);
  };

  const handleSendVerification = () => {
    if (!phone.trim()) {
      showToast('cautionary', '전화번호를 입력해주세요.');
      return;
    }

    setIsVerificationSent(true);
    setTimer(VERIFICATION_TIMEOUT);
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
      showToast('cautionary', '필수 입력칸 미입력입니다. 다시 확인해주세요.');
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
    // State
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

    // Methods
    handleImageUpload,
    handleSendVerification,
    validateAndSave,
    showToast,
  };
};