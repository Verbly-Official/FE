import { useState, useEffect } from 'react';
import { useAuthStore } from '../../../store/useAuthStore';
import { 
  updateUserProfileApi, 
  sendPhoneVerificationApi, 
  verifyPhoneVerificationApi 
} from '../../../apis/user';
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
  const [isVerified, setIsVerified] = useState(false); // ✅ 인증 완료 상태 추가
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

      // 기존 전화번호가 있다면 인증된 상태로 시작
      if (userInfo.phoneNumber) {
        setIsVerified(true);
      }

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
    if (file.size > 10 * 1024 * 1024) {
        showToast('cautionary', '이미지 파일은 10MB 이하로 업로드해주세요.', { bgClassName: 'bg-[#FF6363]', iconColorClassName: 'text-white' });
        return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImg(reader.result as string);
    reader.readAsDataURL(file);
  };

  // ✅ 전화번호 변경 핸들러 (번호 변경 시 인증 상태 초기화)
  const handlePhoneChange = (value: string) => {
    const regex = /^[0-9-]*$/;
    if (regex.test(value)) {
        setPhone(value);
        // 저장된 번호와 다르면 인증 상태 초기화
        if (value !== userInfo?.phoneNumber) {
            setIsVerified(false);
            setIsVerificationSent(false);
            setVerificationCode('');
            setTimer(0);
        } else {
            setIsVerified(true);
        }
    }
  };

  // 토스트 타이머
  useEffect(() => {
    if (!toastMessage) return;
    const t = setTimeout(() => setToastMessage(null), TOAST_DURATION);
    return () => clearTimeout(t);
  }, [toastMessage]);

  // 인증 타이머 (인증 완료되면 정지)
  useEffect(() => {
    if (!isVerificationSent || isVerified) return;
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
  }, [isVerificationSent, isVerified]);

  // ✅ 인증번호 발송 핸들러 (API 호출 추가)
  const handleSendVerification = async () => {
    if (!phone) {
       showToast('cautionary', '전화번호를 입력해주세요.', { bgClassName: 'bg-[#FF6363]', iconColorClassName: 'text-white' });
       return;
    }
    
    // 백엔드 전송용: 하이픈 제거
    const rawPhone = phone.replace(/-/g, '');
    const phoneRegex = /^01[016789]\d{7,8}$/;

    if (!phoneRegex.test(rawPhone)) {
       showToast('cautionary', '올바른 휴대전화 번호를 입력해주세요.', { bgClassName: 'bg-[#FF6363]', iconColorClassName: 'text-white' });
       return;
    }
    
    try {
        await sendPhoneVerificationApi(rawPhone);
        
        setIsVerificationSent(true);
        setIsVerified(false);
        setTimer(VERIFICATION_TIMEOUT);
        showToast('positive', '인증번호가 발송되었습니다.');
    } catch (error: any) {
        console.error('인증번호 발송 실패:', error);
        // 500 에러 등이 발생해도 여기서 잡아서 토스트를 띄웁니다.
        const msg = error.response?.data?.message || '인증번호 발송에 실패했습니다.';
        showToast('cautionary', msg, { bgClassName: 'bg-[#FF6363]', iconColorClassName: 'text-white' });
    }
  };

  // ✅ 인증번호 검증 핸들러 추가
  const handleVerifyCode = async () => {
    if (!verificationCode) {
        showToast('cautionary', '인증번호를 입력해주세요.', { bgClassName: 'bg-[#FF6363]', iconColorClassName: 'text-white' });
        return;
    }

    const rawPhone = phone.replace(/-/g, '');

    try {
        await verifyPhoneVerificationApi(rawPhone, verificationCode);
        setIsVerified(true);
        setIsVerificationSent(false);
        showToast('positive', '인증이 완료되었습니다.');
    } catch (error: any) {
        console.error('인증 실패:', error);
        const msg = error.response?.data?.message || '인증번호가 올바르지 않습니다.';
        showToast('cautionary', msg, { bgClassName: 'bg-[#FF6363]', iconColorClassName: 'text-white' });
    }
  };

  // 유효성 검사 및 저장
  const validateAndSave = async () => {
    // 1. 닉네임 검사
    if (!user.name || !user.name.trim()) {
      showToast('cautionary', '이름을 입력해주세요.', { bgClassName: 'bg-[#FF6363]', iconColorClassName: 'text-white' });
      return null;
    }
    if (user.name.length > 10) {
      showToast('cautionary', '닉네임은 최대 10자입니다.', { bgClassName: 'bg-[#FF6363]', iconColorClassName: 'text-white' });
      return null;
    }

    // 2. 자기소개 검사
    if (user.bio && user.bio.length > 150) {
      showToast('cautionary', '자기소개는 최대 150자까지 입력 가능합니다.', { bgClassName: 'bg-[#FF6363]', iconColorClassName: 'text-white' });
      return null;
    }

    // 3. 이메일 조합 및 검사
    let finalEmail = '';
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

    // 4. 전화번호 검사 (인증 여부 확인)
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
        
        // ✅ 인증되지 않은 번호는 저장 불가
        if (!isVerified) {
             showToast('cautionary', '전화번호 인증을 완료해주세요.', { bgClassName: 'bg-[#FF6363]', iconColorClassName: 'text-white' });
             return null;
        }
    }

    try {
      const updateParams: UpdateProfileParams = {
        nickname: user.name,
        bio: user.bio,
        email: finalEmail,
        phoneNumber: phone.replace(/-/g, ''), // 하이픈 제거 후 전송
      };

      const response = await updateUserProfileApi(updateParams, selectedFile);

      if (response && response.isSuccess) {
        const result = response.result;
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
    setPreviewImg,
    emailId,
    setEmailId,
    emailDomain,
    setEmailDomain,
    customEmailDomain,
    setCustomEmailDomain,
    phone,
    setPhone: handlePhoneChange, // 변경된 핸들러 사용
    verificationCode,
    setVerificationCode,
    isVerificationSent,
    isVerified, // 내보내기
    timer,
    toastMessage,
    handleImageUpload,
    handleSendVerification,
    handleVerifyCode, // 내보내기
    validateAndSave,
  };
};