import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GNB from '../../components/Nav/GNB';
import SideMenu from '../../components/Nav/SideMenu';
import OutlinedButton from '../../components/Button/OutlinedButton';
import { IconButton } from '../../components/Button';
import { Toast } from '../../components/Toast/Toast';
import { ProfileImageSection } from './components/ProfileImageSection';
import { ProfileInfoForm } from './components/ProfileInfoForm';
import { EmailForm } from './components/EmailForm';
import { PhoneVerificationForm } from './components/PhoneVerificationForm';
import { useProfileForm } from './hooks/useProfileForm';
import type { User } from '../../types/user';
import type { Option } from '../../components/Select/Select';
import PersonIcon from '../../assets/emoji/person.svg';
import CloseIcon from '../../assets/emoji/close.svg';

const INITIAL_USER: User = {
  id: "",
  name: "",
  profileImg: "",
  bio: "",
};

const EMAIL_OPTIONS: Option[] = [
  { value: 'write', label: '직접입력' },
  { value: 'gmail', label: '@gmail.com' },
  { value: 'naver', label: '@naver.com' },
  { value: 'daum', label: '@daum.net' },
];

const EditProfilePage = () => {
  const navigate = useNavigate();
  
  const {
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
  } = useProfileForm(INITIAL_USER);

  const [initialData, setInitialData] = useState<any>(null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (user.id && !initialData) {
      setInitialData({
        user: { ...user },
        previewImg,
        emailId,
        emailDomain,
        customEmailDomain,
        phone,
      });
    }
  }, [user, previewImg, emailId, emailDomain, customEmailDomain, phone, initialData]);

  useEffect(() => {
    if (!initialData) return;

    const isNameChanged = user.name !== initialData.user.name;
    const isBioChanged = user.bio !== initialData.user.bio;
    const isImageChanged = previewImg !== initialData.previewImg;
    const isEmailIdChanged = emailId !== initialData.emailId;
    const isEmailDomainChanged = emailDomain?.value !== initialData.emailDomain?.value;
    const isCustomDomainChanged = customEmailDomain !== initialData.customEmailDomain;
    const isPhoneChanged = phone !== initialData.phone;

    const hasChanges = isNameChanged || isBioChanged || isImageChanged || 
                       isEmailIdChanged || isEmailDomainChanged || 
                       isCustomDomainChanged || isPhoneChanged;

    setIsDirty(hasChanges);
  }, [user, previewImg, emailId, emailDomain, customEmailDomain, phone, initialData]);

  const handleSave = async () => {
    const savedData = await validateAndSave(); 
    if (savedData) {
       setInitialData({
        user: { ...user },
        previewImg,
        emailId,
        emailDomain,
        customEmailDomain,
        phone,
      });
      setIsDirty(false);
      navigate(-1);
    }
  };

  const handleQuit = () => {
      navigate(-1);
  };

  const handleReset = () => {
    if (!initialData) return;
    setUser(initialData.user);
    setEmailId(initialData.emailId);
    setEmailDomain(initialData.emailDomain);
    setCustomEmailDomain(initialData.customEmailDomain);
    setPhone(initialData.phone);
  };

  return (
    // 전체 레이아웃 (GNB, SideMenu는 정사이즈 유지)
    <div className="w-full h-screen overflow-hidden bg-bg0 flex flex-col">
      <GNB />
      
      <div className="w-full flex flex-1 overflow-hidden mx-auto">
        <SideMenu variant="profile" />

        {/* 메인 영역: 여기서 스케일 적용 */}
        <main className="flex-1 overflow-hidden relative">
          <div className="w-[111.2%] h-[111.2%] origin-top-left scale-[0.9] overflow-y-auto">
            <div className="w-full max-w-[1800px] mx-auto px-4 py-6 md:px-8 lg:px-12 relative">
              
              <div className="flex items-center gap-2 mb-6 md:mb-8 lg:mb-[40px]">
                <IconButton 
                  iconSrc={CloseIcon} 
                  ariaLabel='quit'
                  size="small" 
                  shape="square" 
                  onClick={handleQuit} 
                />
                <span className='text-[length:var(--fs-body2)] text-gray-5'>Quit</span>
              </div>

              <div className="mb-6 md:mb-8 lg:mb-[32px]">
                <h1 className="text-[length:var(--fs-title1)] font-bold text-gray-9 flex items-center gap-2 mb-2 lg:mb-[8px]">
                  <img src={PersonIcon} alt="icon" className="w-6 h-6 md:w-7 md:h-7 lg:w-[28px] lg:h-[28px]" />
                  프로필 수정
                </h1>
                <p className='text-[length:var(--fs-body2)] text-gray-5'>
                  {user.name || 'User'} 프로필 관리
                </p>
              </div>

              <div className='flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-[24px] mb-8 md:mb-10 lg:mb-[40px]'>
                
                <div className="flex-1 bg-[var(--color-white)] rounded-xl md:rounded-2xl lg:rounded-[24px] px-6 md:px-8 lg:px-[40px] py-8 md:py-10 lg:py-[48px] shadow-sm border border-gray-1">
                  <ProfileImageSection 
                    key={initialData ? 'loaded' : 'loading'} 
                    previewImg={previewImg}
                    onImageUpload={handleImageUpload}
                  />
                  <ProfileInfoForm
                    name={user.name}
                    introduction={user.bio}
                    onNameChange={(value) => setUser({ ...user, name: value })}
                    onIntroChange={(value) => setUser({ ...user, bio: value })}
                  />
                </div>

                <div className="flex-1 bg-[var(--color-white)] rounded-xl md:rounded-2xl lg:rounded-[24px] px-6 md:px-8 lg:px-[40px] py-8 md:py-10 lg:py-[48px] shadow-sm border border-gray-1">
                  <EmailForm
                    emailId={emailId}
                    emailDomain={emailDomain}
                    customEmailDomain={customEmailDomain}
                    onEmailIdChange={setEmailId}
                    onEmailDomainChange={setEmailDomain}
                    onCustomDomainChange={setCustomEmailDomain}
                    emailOptions={EMAIL_OPTIONS}
                  />
                  <PhoneVerificationForm
                    phone={phone}
                    verificationCode={verificationCode}
                    isVerificationSent={isVerificationSent}
                    timer={timer}
                    onPhoneChange={setPhone}
                    onVerificationCodeChange={setVerificationCode}
                    onSendVerification={handleSendVerification}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 md:gap-4 lg:gap-[16px]">
                <OutlinedButton 
                  variant="primary"
                  size="medium"
                  label="변경사항 저장"
                  onClick={handleSave}
                  className="w-full sm:w-auto"
                />
                <OutlinedButton 
                  variant="primary"
                  size="medium"
                  label="프로필 초기화"
                  disabled={!isDirty} 
                  onClick={handleReset}
                  className="w-full sm:w-auto"
                />
              </div>

            </div>
          </div>
        </main>
      </div>

      {toastMessage && (
        <div className="fixed top-20 md:top-[100px] left-1/2 transform -translate-x-1/2 z-50 px-4 w-full max-w-md">
          <Toast 
            variant={toastMessage.variant}
            message={toastMessage.message}
            bgClassName={toastMessage.bgClassName}
            iconColorClassName={toastMessage.iconColorClassName}
          />
        </div>
      )}
    </div>
  );
};

export default EditProfilePage;