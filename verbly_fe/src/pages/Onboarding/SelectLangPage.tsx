import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from '../../components/Select/Select';
import SolidButton from '../../components/Button/SolidButton';
import OutlinedButton from '../../components/Button/OutlinedButton';
import Logo from '../../components/Logo/Logo';
import { Text } from '../../components/Text/Text';

// 언어 선택 옵션 정의
const LANGUAGE_OPTIONS = [
  { label: '한국어', value: 'Korean' },
  { label: 'English', value: 'English' },
];

const SelectLangPage = () => {
  const navigate = useNavigate();
  
  // 상태 관리
  const [learningLang, setLearningLang] = useState<string>('');
  const [nativeLang, setNativeLang] = useState<string>('');

  const handleComplete = () => {
    if (learningLang && nativeLang) {
      console.log('Learning:', learningLang, 'Native:', nativeLang);
      // 로컬 스토리지 저장 등의 로직 추가 가능
      navigate('/home'); 
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-5 py-10">
      {/* 모바일 대응을 위한 최대 너비 설정 컨테이너 */}
      <div className="flex flex-col items-center w-full max-w-[500px] gap-10">
        
        {/* 1. Logo Section */}
        <div className="flex flex-col items-center justify-center w-full mb-2">
          <Logo variant="hori" />
        </div>

        {/* 2. Form Section */}
        <div className="flex flex-col w-full gap-6">
          
          {/* Learning Language Select */}
          <div className="flex flex-col w-full gap-2">
            <Text size="medium" state="default">Learning</Text>
            <Select
              placeholder="언어를 선택해주세요"
              options={LANGUAGE_OPTIONS}
              value={learningLang}
              onChange={(val) => setLearningLang(val)}
              size="large"
              className="!w-full"
            />
          </div>

          {/* Native Language Select */}
          <div className="flex flex-col w-full gap-2">
            <Text size="medium" state="default">Native Language</Text>
            <Select
              placeholder="언어를 선택해주세요"
              options={LANGUAGE_OPTIONS}
              value={nativeLang}
              onChange={(val) => setNativeLang(val)}
              size="large"
              className="!w-full"
            />
          </div>
        </div>

        {/* 3. Button Section */}
        <div className="flex flex-col w-full gap-3 mt-4">
          {/* Complete Button */}
          <SolidButton 
            variant="primary" 
            size="large" 
            className="w-full"
            disabled={!learningLang || !nativeLang}
            onClick={handleComplete}
          >
            Complete
          </SolidButton>

          {/* Logout Button */}
          <OutlinedButton 
            variant="secondary"
            size="large"
            className="w-full"
            onClick={handleLogout}
          >
            Logout
          </OutlinedButton>
        </div>

      </div>
    </div>
  );
};

export default SelectLangPage;