import { useState, useEffect } from 'react';
import { useAuthStore } from '../../../store/useAuthStore';
import { updateUserProfileApi } from '../../../apis/user';
import { type User, type UpdateProfileParams } from '../../../types/user';
import { type ToastVariant } from '../../../components/Toast/Toast';
import { type Option } from '../../../components/Select/Select';

const VERIFICATION_TIMEOUT = 180;
const TOAST_DURATION = 3000;

interface ToastMessage {
  variant: ToastVariant;
  message: string;
  bgClassName?: string;
  iconColorClassName?: string;
}

export const useProfileForm = (initialUser: User) => {
  const { userInfo, updateUserInfo } = useAuthStore();
  
  // 상태 관리
  const [user, setUser] = useState<User>(initialUser);
  const [previewImg, setPreviewImg] = useState<string>(initialUser.profileImg || '');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // 이메일 관련 상태
  const [emailId, setEmailId] = useState('');
  const [emailDomain, setEmailDomain] = useState<Option | null>(null);
  const [customEmailDomain, setCustomEmailDomain] = useState('');
  
  // 전화번호 관련 상태
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [timer, setTimer] = useState(0);
  
  // UI 상태
  const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null);

  // 1. 초기 데이터 로드 (Store -> Local State)
  useEffect(() => {
    if (userInfo) {
      setUser({
        id: userInfo.userId.toString(),
        name: userInfo.nickname,
        profileImg: userInfo.profileImage,
        bio: userInfo.bio || '',
      });
      setPreviewImg(userInfo.profileImage || '');
      setPhone(userInfo.phoneNumber || '');

      if (userInfo.email) {
        const [id, domain] = userInfo.email.split('@');
        if (id) setEmailId(id);
        if (domain) {
          const knownDomains = ['gmail.com', 'naver.com', 'daum.net'];
          if (knownDomains.includes(domain)) {
            setEmailDomain({ value: domain.split('.')[0], label: `@${domain}` });
          } else {
            setEmailDomain({ value: 'write', label: '직접입력' });
            setCustomEmailDomain(domain);
          }
        }
      }
    }
  }, [userInfo]);

  // 유틸리티: 토스트 메시지 표시
  const showToast = (variant: ToastVariant, message: string, options?: any) => {
    setToastMessage({ variant, message, ...options });
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (file: File) => {
    // 파일 크기 체크 (프론트 선행 체크) - 10MB
    if (file.size > 10 * 1024 * 1024) {
        showToast('cautionary', '이미지 파일은 10MB 이하로 업로드해주세요.', { bgClassName: 'bg-[#FF6363]', iconColorClassName: 'text-white' });
        return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImg(reader.result as string);
    reader.readAsDataURL(file);
  };

  // 토스트 타이머
  useEffect(() => {
    if (!toastMessage) return;
    const t = setTimeout(() => setToastMessage(null), TOAST_DURATION);
    return () => clearTimeout(t);
  }, [toastMessage]);

  // 인증 타이머
  useEffect(() => {
    if (!isVerificationSent) return;
    const interval = window.setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          window.clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isVerificationSent]);

  const handleSendVerification = () => {
    if (!phone) {
       showToast('cautionary', '전화번호를 입력해주세요.', { bgClassName: 'bg-[#FF6363]', iconColorClassName: 'text-white' });
       return;
    }
    const phoneRegex = /^[0-9+\-]+$/;
    if (!phoneRegex.test(phone)) {
       showToast('cautionary', '유효한 전화번호를 입력해주세요.', { bgClassName: 'bg-[#FF6363]', iconColorClassName: 'text-white' });
       return;
    }
    
    setIsVerificationSent(true);
    setTimer(VERIFICATION_TIMEOUT);
    showToast('positive', '인증번호가 발송되었습니다.');
  };

  // 유효성 검사 및 저장=
  const validateAndSave = async () => {
    // 1. 닉네임 검사 (필수, 10자 제한 - PR 기준)
    if (!user.name || !user.name.trim()) {
      showToast('cautionary', '이름을 입력해주세요.', { bgClassName: 'bg-[#FF6363]', iconColorClassName: 'text-white' });
      return null;
    }
    if (user.name.length > 10) {
      showToast('cautionary', '닉네임은 최대 10자입니다.', { bgClassName: 'bg-[#FF6363]', iconColorClassName: 'text-white' });
      return null;
    }

    // 2. 자기소개 검사 (선택, 150자 제한)
    if (user.bio && user.bio.length > 150) {
      showToast('cautionary', '자기소개는 최대 150자까지 입력 가능합니다.', { bgClassName: 'bg-[#FF6363]', iconColorClassName: 'text-white' });
      return null;
    }

    // 3. 이메일 조합 및 검사 (선택, 30자 제한)
    let finalEmail = '';
    
    // ID가 입력된 경우 도메인까지 완성되어야 함
    if (emailId) { 
        if (!emailDomain) {
            showToast('cautionary', '이메일 도메인을 선택해주세요.', { bgClassName: 'bg-[#FF6363]', iconColorClassName: 'text-white' });
            return null;
        }

        if (emailDomain.value === 'write') {
          if (!customEmailDomain) {
             showToast('cautionary', '이메일 도메인을 입력해주세요.', { bgClassName: 'bg-[#FF6363]', iconColorClassName: 'text-white' });
             return null;
          }
          finalEmail = `${emailId}@${customEmailDomain.replace('@', '')}`;
        } else {
          const domainStr = emailDomain.label.replace('@', ''); 
          finalEmail = `${emailId}@${domainStr}`;
        }
    }
    
    // 이메일 유효성 체크
    if (finalEmail) {
        if (finalEmail.length > 30) {
             showToast('cautionary', '이메일은 최대 30자까지 입력 가능합니다.', { bgClassName: 'bg-[#FF6363]', iconColorClassName: 'text-white' });
             return null;
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(finalEmail)) {
             showToast('cautionary', '이메일 형식이 올바르지 않습니다.', { bgClassName: 'bg-[#FF6363]', iconColorClassName: 'text-white' });
             return null;
        }
    }

    // 4. 전화번호 검사 (선택, 7~20자, 숫자/+/- 허용)
    if (phone) {
        const phoneRegex = /^[0-9+\-]+$/;
        if (!phoneRegex.test(phone)) {
             showToast('cautionary', '전화번호는 숫자, +, - 기호만 사용할 수 있습니다.', { bgClassName: 'bg-[#FF6363]', iconColorClassName: 'text-white' });
             return null;
        }
        if (phone.length < 7 || phone.length > 20) {
             showToast('cautionary', '전화번호는 7자에서 20자 사이여야 합니다.', { bgClassName: 'bg-[#FF6363]', iconColorClassName: 'text-white' });
             return null;
        }
    }

    try {
      // API 요청 파라미터 구성
      const updateParams: UpdateProfileParams = {
        nickname: user.name,
        bio: user.bio,
        email: finalEmail,
        phoneNumber: phone,
      };

      const response = await updateUserProfileApi(updateParams, selectedFile);

      if (response && response.isSuccess) {
        const result = response.result;
        
        // 스토어 업데이트 (클라이언트 상태 동기화)
        updateUserInfo({
            nickname: result.nickname,
            bio: result.bio,
            profileImage: result.profileImage,
            email: result.email,
            phoneNumber: result.phoneNumber
        });
        
        showToast('positive', '프로필이 성공적으로 변경되었습니다.');
        return user;
      }
    } catch (error: any) {
      console.error('프로필 수정 실패:', error);
      
      const errorCode = error.response?.data?.code;
      const errorMessage = error.response?.data?.message;

      // 에러 코드별 처리
      if (errorCode === 'IMAGE4006') {
         showToast('cautionary', '이미지 형식의 파일만 업로드할 수 있습니다.', { bgClassName: 'bg-[#FF6363]', iconColorClassName: 'text-white' });
      } else if (errorCode === 'IMAGE4007') {
         showToast('cautionary', '이미지 파일은 10MB 이하로 업로드해주세요.', { bgClassName: 'bg-[#FF6363]', iconColorClassName: 'text-white' });
      } else {
         showToast('cautionary', errorMessage || '프로필 수정 중 오류가 발생했습니다.', { bgClassName: 'bg-[#FF6363]', iconColorClassName: 'text-white' });
      }
    }
    return null;
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
  };
};