import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 컴포넌트
import { Header } from '../../components/Header/Header';
import SideMenu from '../../components/Nav/SideMenu';
import OutlinedButton from '../../components/Button/OutlinedButton';
import { TextField } from '../../components/TextArea/TextField';
import Select, { type Option } from '../../components/Select/Select';
import { IconButton } from '../../components/Button';
import { Toast } from '../../components/Toast/Toast';
import type { User } from '../../types/user';

// 아이콘 및 이미지
import PersonIcon from '../../assets/emoji/person.svg';
import EditIcon from '../../assets/emoji/edit.svg';
import CloseIcon from '../../assets/emoji/close.svg';

const INITIAL_USER: User = {
  id: "user1",
  name: "코딩파트너",
  profileImg: "https://via.placeholder.com/150",
  introduction: "안녕하세요! 함께 성장하는 코딩 파트너입니다.",
};

const EMAIL_OPTIONS: Option[] = [
  { value: 'write', label: '직접입력' },
  { value: 'gmail', label: '@gmail.com' },
  { value: 'naver', label: '@naver.com' },
  { value: 'daum', label: '@daum.net' },
];

const EditProfilePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<User>(INITIAL_USER);
  const [previewImg, setPreviewImg] = useState<string>(user.profileImg || '');
  
  const [emailId, setEmailId] = useState('');
  const [emailDomain, setEmailDomain] = useState<Option | null>(null);
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [timer, setTimer] = useState(0);
  
  const [showNameErrorToast, setShowNameErrorToast] = useState(false);
  const [showVerificationToast, setShowVerificationToast] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (isVerificationSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            setIsVerificationSent(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVerificationSent, timer]);

  useEffect(() => {
    if (showNameErrorToast) {
      const timeout = setTimeout(() => {
        setShowNameErrorToast(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [showNameErrorToast]);

  useEffect(() => {
    if (showVerificationToast) {
      const timeout = setTimeout(() => {
        setShowVerificationToast(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [showVerificationToast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, name: e.target.value });
  };

  const handleIntroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, introduction: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImg(objectUrl);
    }
  };

  const handleSendVerification = () => {
    setIsVerificationSent(true);
    setTimer(180);
    setShowVerificationToast(true);
  };

  const handleSave = () => {
    if (!user.name.trim()) {
      setShowNameErrorToast(true);
      return;
    }
    console.log("저장 데이터:", { 
      ...user, 
      profileImg: previewImg,
      email: `${emailId}@${emailDomain?.label || ''}`,
      phone 
    });
    alert("프로필이 성공적으로 저장되었습니다.");
  };

  const handleCancel = () => {
    if (window.confirm("수정을 취소하고 이전 페이지로 돌아가시겠습니까?")) {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header 영역 */}
      <div className="w-full max-w-[1920px] mx-auto">
        <Header />
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div className="flex w-full max-w-[1920px] mx-auto">
        {/* 좌측 사이드 메뉴 - 모바일에서 숨김 */}
        <div className="hidden lg:block">
          <SideMenu variant="default" />
        </div>

        {/* 페이지 내용 - 반응형 패딩 */}
        <main className="flex-1 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[60px] py-6 md:py-8 lg:py-[40px]">
          
          {/* 상단 Quit 버튼 */}
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

          {/* 타이틀 영역 */}
          <div className="mb-6 md:mb-8 lg:mb-[32px]">
            <h1 className="text-xl md:text-2xl lg:text-[28px] font-bold text-gray-900 flex items-center gap-2 mb-2 lg:mb-[8px]">
              <img src={PersonIcon} alt="icon" className="w-6 h-6 md:w-7 md:h-7 lg:w-[28px] lg:h-[28px]" />
              프로필 수정
            </h1>
            <p className='text-xs md:text-sm lg:text-[14px] text-gray-500'>{user.name} 프로필 관리</p>
          </div>

          {/* 메인 컨텐츠: 모바일 1열, 태블릿+ 2열 레이아웃 */}
          <div className='flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-[24px] mb-8 md:mb-10 lg:mb-[40px]'>
            
            {/* 왼쪽: 프로필 정보 카드 */}
            <div className="flex-1 bg-white rounded-xl md:rounded-2xl lg:rounded-[24px] px-6 md:px-8 lg:px-[40px] py-8 md:py-10 lg:py-[48px] shadow-sm border border-gray-100">
              
              {/* 프로필 이미지 섹션 */}
              <div className="flex flex-col sm:flex-row items-start gap-6 md:gap-7 lg:gap-[28px] mb-6 md:mb-8 lg:mb-[32px]">
                <h2 className="text-base md:text-lg lg:text-[18px] font-semibold text-violet-500 w-full sm:w-20 lg:w-[80px] flex-shrink-0">프로필</h2>
                
                <div className="relative w-full sm:w-auto">
                  <img 
                    src={previewImg} 
                    alt="프로필 이미지" 
                    className="w-32 h-32 md:w-40 md:h-40 lg:w-[160px] lg:h-[160px] rounded-full object-cover border-2 border-gray-200 mx-auto sm:mx-0" 
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="absolute bottom-0 right-0 sm:bottom-[4px] sm:right-[4px]">
                    <IconButton
                      iconSrc={EditIcon}
                      ariaLabel="edit-profile-image"
                      size="medium"
                      shape="round"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white shadow-md border border-gray-200 hover:bg-gray-50"
                    />
                  </div>
                </div>
              </div>

              {/* 이름 입력 */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 md:gap-7 lg:gap-[28px] mb-6 md:mb-7 lg:mb-[28px]">
                <label className="text-sm md:text-[14px] font-medium text-violet-500 w-full sm:w-20 lg:w-[80px] flex-shrink-0">
                  이름 (필수)
                </label>
                <div className="w-full">
                  <TextField
                    value={user.name}
                    onChange={handleNameChange}
                    placeholder="Alice"
                    className="w-full"
                  />
                </div>
              </div>

              {/* 자기소개 입력 */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 md:gap-7 lg:gap-[28px]">
                <label className="text-sm md:text-[14px] font-medium text-violet-500 w-full sm:w-20 lg:w-[80px] flex-shrink-0">
                  자기소개
                </label>
                <div className="w-full">
                  <TextField
                    value={user.introduction}
                    onChange={handleIntroChange}
                    placeholder="자기소개"
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* 오른쪽: 연락처 정보 카드 */}
            <div className="flex-1 bg-white rounded-xl md:rounded-2xl lg:rounded-[24px] px-6 md:px-8 lg:px-[40px] py-8 md:py-10 lg:py-[48px] shadow-sm border border-gray-100">
              
              {/* 이메일 섹션 */}
              <div className="mb-8 md:mb-10 lg:mb-[40px]">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 md:gap-7 lg:gap-[28px]">
                  <h2 className="text-base md:text-lg lg:text-[18px] font-semibold text-violet-500 w-full sm:w-20 lg:w-[80px] flex-shrink-0">이메일</h2>
                  
                  <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-[12px]">
                    <div className="w-full sm:flex-1">
                      <TextField
                        value={emailId}
                        onChange={(e) => setEmailId(e.target.value)}
                        placeholder="Verbly1234"
                        className="w-full"
                      />
                    </div>
                    <span className="text-gray-400 text-base hidden sm:inline">@</span>
                    <div className="w-full sm:flex-1">
                      <Select
                        options={EMAIL_OPTIONS}
                        placeholder="직접입력"
                        onChange={(val) => setEmailDomain(val)} 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 전화번호 섹션 */}
              <div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 md:gap-7 lg:gap-[28px] mb-4 lg:mb-[16px]">
                  <h2 className="text-base md:text-lg lg:text-[18px] font-semibold text-violet-500 w-full sm:w-20 lg:w-[80px] flex-shrink-0">전화번호</h2>
                  
                  <div className="w-full">
                    <TextField
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+82 010-1234-5678"
                      className="w-full"
                    />
                  </div>
                </div>

                {/* 인증번호 발송 및 입력 */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 md:gap-7 lg:gap-[28px]">
                  <div className="w-full sm:w-20 lg:w-[80px] flex-shrink-0"></div>
                  <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-[12px]">
                    <OutlinedButton 
                      variant="assistive" 
                      size="small"
                      label={isVerificationSent ? "재발송" : "인증번호 발송"}
                      onClick={handleSendVerification}
                      className="whitespace-nowrap w-full sm:w-auto"
                    />
                    <div className="flex items-center gap-3 lg:gap-[12px] w-full">
                      <div className="flex-1">
                        <TextField
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          placeholder="인증번호 입력"
                          className="w-full"
                        />
                      </div>
                      {isVerificationSent && timer > 0 && (
                        <span className="text-sm lg:text-[14px] text-violet-500 font-medium whitespace-nowrap">
                          {formatTime(timer)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 버튼 영역 - 모바일 세로 배치, 태블릿+ 가로 배치 */}
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
              disabled={true}
              onClick={handleCancel}
              className="w-full sm:w-auto"
            />
          </div>

        </main>
      </div>

      {/* 토스트 메시지 - 이름 미입력 에러 */}
      {showNameErrorToast && (
        <div className="fixed top-20 md:top-[100px] left-1/2 transform -translate-x-1/2 z-50 px-4 w-full max-w-md">
          <Toast 
            variant="cautionary" 
            message="필수 입력칸 미입력입니다. 다시 확인해주세요." 
          />
        </div>
      )}

      {/* 토스트 메시지 - 인증번호 발송 완료 */}
      {showVerificationToast && (
        <div className="fixed top-20 md:top-[100px] left-1/2 transform -translate-x-1/2 z-50 px-4 w-full max-w-md">
          <Toast 
            variant="positive" 
            message="인증번호 전송완료" 
          />
        </div>
      )}
    </div>
  );
};

export default EditProfilePage;