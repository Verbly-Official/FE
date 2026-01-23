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

// [초기 데이터]
const INITIAL_USER: User = {
  id: "user1",
  name: "코딩파트너",
  profileImg: "https://via.placeholder.com/150",
  introduction: "안녕하세요! 함께 성장하는 코딩 파트너입니다.",
};

// 이메일 선택 옵션
const EMAIL_OPTIONS: Option[] = [
  { value: 'write', label: '직접입력' },
  { value: 'gmail', label: 'gmail.com' },
  { value: 'naver', label: 'naver.com' },
  { value: 'daum', label: 'daum.net' },
];

const EditProfilePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 상태 관리
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [previewImg, setPreviewImg] = useState<string>(user.profileImg || '');
  
  // 추가 폼 상태 (이메일, 전화번호 등)
  const [emailId, setEmailId] = useState('');
  const [emailDomain, setEmailDomain] = useState<Option | null>(null);
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  // 인증번호 관련 상태
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [timer, setTimer] = useState(0);
  
  // 토스트 상태 (두 가지 토스트 메시지)
  const [showNameErrorToast, setShowNameErrorToast] = useState(false);
  const [showVerificationToast, setShowVerificationToast] = useState(false);

  // 타이머 처리
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

  // 이름 에러 토스트 자동 숨김
  useEffect(() => {
    if (showNameErrorToast) {
      const timeout = setTimeout(() => {
        setShowNameErrorToast(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [showNameErrorToast]);

  // 인증번호 발송 토스트 자동 숨김
  useEffect(() => {
    if (showVerificationToast) {
      const timeout = setTimeout(() => {
        setShowVerificationToast(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [showVerificationToast]);

  // 시간 포맷 (MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 핸들러: 텍스트 입력
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, name: e.target.value });
  };

  const handleIntroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, introduction: e.target.value });
  };

  // 핸들러: 이미지 업로드
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImg(objectUrl);
    }
  };

  // 핸들러: 인증번호 발송/재발송
  const handleSendVerification = () => {
    setIsVerificationSent(true);
    setTimer(180); // 3분 (180초)
    setShowVerificationToast(true);
  };

  // 핸들러: 저장
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

  // 핸들러: 취소
  const handleCancel = () => {
    if (window.confirm("수정을 취소하고 이전 페이지로 돌아가시겠습니까?")) {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 1. Header 영역 */}
      <div className="w-full max-w-[1920px] mx-auto">
        <Header />
      </div>

      {/* 2. 메인 컨텐츠 영역 */}
      <div className="flex w-full max-w-[1920px] mx-auto">
        {/* 좌측 사이드 메뉴 */}
        <SideMenu variant="default" />

        {/* 페이지 내용 */}
        <main className="flex-1 px-[60px] py-[40px]">
          
          {/* 상단 Quit 버튼 */}
          <div className="flex items-center gap-2 mb-[40px]">
            <IconButton 
              iconSrc={CloseIcon} 
              ariaLabel='quit'
              size="small" 
              shape="square" 
              onClick={handleCancel} 
            />
            <span className='text-[14px] text-gray-500'>Quit</span>
          </div>

          {/* 타이틀 영역 */}
          <div className="mb-[32px]">
            <h1 className="text-[28px] font-bold text-gray-900 flex items-center gap-2 mb-[8px]">
              <img src={PersonIcon} alt="icon" className="w-[28px] h-[28px]" />
              프로필 수정
            </h1>
            <p className='text-[14px] text-gray-500'>{user.name} 프로필 관리</p>
          </div>

          {/* 메인 컨텐츠: 좌우 2분할 레이아웃 */}
          <div className='flex gap-[24px] mb-[40px]'>
            
            {/* 왼쪽: 프로필 정보 카드 */}
            <div className="flex-1 bg-white rounded-[24px] px-[40px] py-[48px] shadow-sm border border-gray-100">
              
              {/* 프로필 이미지 섹션 */}
              <div className="flex items-start gap-[28px] mb-[32px]">
                <h2 className="text-[18px] font-semibold text-violet-500 w-[80px] flex-shrink-0">프로필</h2>
                
                <div className="relative w-full">
                  <img 
                    src={previewImg} 
                    alt="프로필 이미지" 
                    className="w-[160px] h-[160px] rounded-full object-cover border-2 border-gray-200" 
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="absolute bottom-[4px] right-[4px]">
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
              <div className="flex items-center gap-[28px] mb-[28px]">
                <label className="text-[14px] font-medium text-violet-500 w-[80px] flex-shrink-0">
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
              <div className="flex items-center gap-[28px]">
                <label className="text-[14px] font-medium text-violet-500 w-[80px] flex-shrink-0">
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
            <div className="flex-1 bg-white rounded-[24px] px-[40px] py-[48px] shadow-sm border border-gray-100">
              
              {/* 이메일 섹션 */}
              <div className="mb-[40px]">
                <div className="flex items-center gap-[28px]">
                  <h2 className="text-[18px] font-semibold text-violet-500 w-[80px] flex-shrink-0">이메일</h2>
                  
                  <div className="w-full flex items-center gap-[12px]">
                    <div className="w-full">
                      <TextField
                        value={emailId}
                        onChange={(e) => setEmailId(e.target.value)}
                        placeholder="Verbly1234"
                        className="w-full"
                      />
                    </div>
                    <span className="text-gray-400 text-[16px]">@</span>
                    <div className="w-full">
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
                <div className="flex items-center gap-[28px] mb-[16px]">
                  <h2 className="text-[18px] font-semibold text-violet-500 w-[80px] flex-shrink-0">전화번호</h2>
                  
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
                <div className="flex items-center gap-[28px]">
                  <div className="w-[80px] flex-shrink-0"></div>
                  <div className="w-full flex items-center gap-[12px]">
                    <OutlinedButton 
                      variant="assistive" 
                      size="small"
                      label={isVerificationSent ? "재발송" : "인증번호 발송"}
                      onClick={handleSendVerification}
                      className="whitespace-nowrap"
                    />
                    <div className="flex items-center gap-[12px] w-full">
                      <div className="flex-1">
                        <TextField
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          placeholder="인증번호 입력"
                          className="w-full"
                        />
                      </div>
                      {isVerificationSent && timer > 0 && (
                        <span className="text-[14px] text-violet-500 font-medium whitespace-nowrap">
                          {formatTime(timer)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 버튼 영역 */}
          <div className="flex justify-end gap-[16px]">
            <OutlinedButton 
              variant="primary"
              size="medium"
              label="변경사항 저장"
              onClick={handleSave}
            />
            <OutlinedButton 
              variant="primary"
              size="medium"
              label="프로필 초기화"
              disabled={true}
              onClick={handleCancel}
            />
          </div>

        </main>
      </div>

      {/* 토스트 메시지 - 이름 미입력 에러 */}
      {showNameErrorToast && (
        <div className="fixed top-[100px] left-1/2 transform -translate-x-1/2 z-50">
          <Toast 
            variant="cautionary" 
            message="필수 입력칸 미입력입니다. 다시 확인해주세요." 
          />
        </div>
      )}

      {/* 토스트 메시지 - 인증번호 발송 완료 */}
      {showVerificationToast && (
        <div className="fixed top-[100px] left-1/2 transform -translate-x-1/2 z-50">
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