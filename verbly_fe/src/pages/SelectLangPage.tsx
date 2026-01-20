import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from '../components/Select/Select';
import SolidButton from '../components/Button/SolidButton';
import OutlinedButton from '../components/Button/OutlinedButton';
import Logo from '../components/Logo/Logo';
import { Text } from '../components/Text/Text';

// 언어 선택 옵션 정의
const LANGUAGE_OPTIONS = [
  { label: '한국어', value: 'Korean' },
  { label: 'English', value: 'English' },
];

const SelectLangPage = () => {
  const navigate = useNavigate();
  
  // 상태 관리
  const [learningLang, setLearningLang] = useState<string>('');
  const [nativeLang, setNativeLang] = useState<string>(''); // 기본값 한국어 설정 가능

  const handleComplete = () => {
    if (learningLang && nativeLang) {
      console.log('Learning:', learningLang, 'Native:', nativeLang);
      navigate('/home'); // 완료 후 이동할 경로 (예시)
    }
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    navigate('/login'); // 로그아웃 후 이동할 경로
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-5">
      {/* 전체 컨텐츠를 감싸는 컨테이너 (너비 제한) */}
      <div className="flex flex-col items-center w-full max-w-[1920px] gap-10">
        
        {/* 1. Logo Section */}
        <div className="mb-4 w-[144px] h-[40px] flex justify-center items-center">
          <Logo variant="hori" />
        </div>

        {/* 2. Form Section */}
        <div className="w-full flex flex-col gap-6">
          
          {/* Learning Language Select */}
          <Select
            label="Learning"
            placeholder="Text"
            options={LANGUAGE_OPTIONS}
            value={learningLang}
            onChange={(val) => setLearningLang(val)}
            size="large"
          />

          {/* Native Language Select */}
          <Select
            label="Native Language"
            placeholder="Text"
            options={LANGUAGE_OPTIONS}
            value={nativeLang}
            onChange={(val) => setNativeLang(val)}
            size="large"
          />
        </div>

        {/* 3. Button Section */}
        <div className="w-full flex flex-col gap-3 mt-4">
          {/* Complete Button (Solid) */}
          <SolidButton 
            variant="primary" 
            size="large" 
            className="w-full"
            disabled={!learningLang || !nativeLang} // 선택 안되면 비활성화 (선택사항)
            onClick={handleComplete}
          >
            <Text size="small" state="default">Complete</Text>
          </SolidButton>

          {/* Logout Button (Outlined) */}
          <OutlinedButton 
            variant="secondary"
            size="large"
            className="w-full"
            onClick={handleLogout}
          >
            <Text size="small" state="default">Logout</Text>
          </OutlinedButton>
        </div>

      </div>
    </div>
  );
};

export default SelectLangPage;