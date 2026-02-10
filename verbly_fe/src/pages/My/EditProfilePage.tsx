import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 컴포넌트
import GNB from '../../components/Nav/GNB';
import SideMenu from '../../components/Nav/SideMenu';
import OutlinedButton from '../../components/Button/OutlinedButton';
import { IconButton } from '../../components/Button';
import { Toast } from '../../components/Toast/Toast';

// 페이지 전용 컴포넌트
import { ProfileImageSection } from './components/ProfileImageSection';
import { ProfileInfoForm } from './components/ProfileInfoForm';
import { EmailForm } from './components/EmailForm';
import { PhoneVerificationForm } from './components/PhoneVerificationForm';

// Custom Hook
import { useProfileForm } from './hooks/useProfileForm';

// 타입 & 상수
import type { User } from '../../types/user';
import type { Option } from '../../components/Select/Select';
import PersonIcon from '../../assets/emoji/person.svg';
import CloseIcon from '../../assets/emoji/close.svg';

// 초기값 (API 로딩 전 잠시 보여질 값)
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
  
  // Hook 사용
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

  // ✅ 저장 핸들러 (비동기 처리)
  const handleSave = async () => {
    // API 호출이 완료될 때까지 기다립니다.
    const savedData = await validateAndSave(); 
    if (savedData) {
      // 저장이 성공했을 때 추가적인 동작(예: 페이지 이동)이 필요하면 여기에 작성하세요.
      // 예: navigate('/my');
    }
  };

  const handleCancel = () => {
      navigate(-1);
  };

  return (
    // ✅ [레이아웃 수정] 전체 페이지 래퍼 (스크롤 및 높이 설정 통일)
    <div className="w-full bg-[#F8FAFC] flex flex-col flex-1 overflow-hidden min-h-screen">
      {/* Header */}
      <GNB />
      
      {/* Main Content Wrapper */}
      <div className="w-full flex flex-col md:flex-row flex-1 overflow-hidden mx-auto">
        
        {/* Left Sidebar */}
        <SideMenu variant="default" />

        {/* Page Content */}
        {/* ✅ [레이아웃 수정] main 영역에 스크롤 적용 */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          
          {/* ✅ [레이아웃 수정] 내부 컨테이너 너비 제한 (max-w-[1800px]) 및 패딩 적용 */}
          <div className="w-full max-w-[1800px] mx-auto px-4 py-6 md:px-8 lg:px-12 relative">
            
            {/* Quit Button */}
            <div className="flex items-center gap-2 mb-6 md:mb-8 lg:mb-[40px]">
              <IconButton 
                iconSrc={CloseIcon} 
                ariaLabel='quit'
                size="small" 
                shape="square" 
                onClick={handleCancel} 
              />
              <span className='text-sm md:text-[14px] text-gray-500'>Quit</span>
            </div>

            {/* Title */}
            <div className="mb-6 md:mb-8 lg:mb-[32px]">
              <h1 className="text-xl md:text-2xl lg:text-[28px] font-bold text-gray-900 flex items-center gap-2 mb-2 lg:mb-[8px]">
                <img src={PersonIcon} alt="icon" className="w-6 h-6 md:w-7 md:h-7 lg:w-[28px] lg:h-[28px]" />
                프로필 수정
              </h1>
              <p className='text-xs md:text-sm lg:text-[14px] text-gray-500'>
                {user.name || 'User'} 프로필 관리
              </p>
            </div>

            {/* Main Cards */}
            <div className='flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-[24px] mb-8 md:mb-10 lg:mb-[40px]'>
              
              {/* Profile Card */}
              <div className="flex-1 bg-white rounded-xl md:rounded-2xl lg:rounded-[24px] px-6 md:px-8 lg:px-[40px] py-8 md:py-10 lg:py-[48px] shadow-sm border border-gray-100">
                <ProfileImageSection 
                  previewImg={previewImg}
                  onImageUpload={handleImageUpload}
                />
                <ProfileInfoForm
                  name={user.name}
                  introduction={user.bio} // User 타입의 bio를 introduction props로 전달
                  onNameChange={(value) => setUser({ ...user, name: value })}
                  onIntroChange={(value) => setUser({ ...user, bio: value })}
                />
              </div>

              {/* Contact Card */}
              <div className="flex-1 bg-white rounded-xl md:rounded-2xl lg:rounded-[24px] px-6 md:px-8 lg:px-[40px] py-8 md:py-10 lg:py-[48px] shadow-sm border border-gray-100">
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

            {/* Action Buttons */}
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
                disabled={false}
                onClick={handleCancel} // 필요에 따라 초기화 로직 별도 구현 가능
                className="w-full sm:w-auto"
              />
            </div>

          </div>
        </main>
      </div>

      {/* Toast Message */}
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