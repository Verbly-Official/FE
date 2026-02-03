import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { saveOnboardingApi } from '../../apis/user';
import { logoutApi } from '../../apis/auth';

const SelectLangPage = () => {
  const navigate = useNavigate();
  const { setUserInfo, logout } = useAuthStore();
  
  // 백엔드 규격(@Size max=3)에 맞는 코드값 사용 ("ko", "en")
  const [nativeLang, setNativeLang] = useState<string>(''); 
  const [learningLang, setLearningLang] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // ✅ 유효성 검사: 둘 다 선택되어야 함 (빈 문자열이면 false)
  // nativeLang과 learningLang이 같으면 안 된다는 로직도 추가 가능
  const isValid = nativeLang !== '' && learningLang !== '' && (nativeLang !== learningLang);

  const handleStart = async () => {
    // 버튼이 disabled 상태여도 엔터키 등으로 실행되는 것 방지
    if (!isValid || isLoading) return;
    
    setIsLoading(true);

    try {
      console.log('📡 온보딩 정보 전송:', { nativeLang, learningLang });

      // 1. API 호출
      const data = await saveOnboardingApi({
        nativeLang,
        learningLang,
      });

      if (data.isSuccess) {
        console.log('✅ 온보딩 완료:', data.result);

        // 2. 스토어 정보 갱신 (status: "ACTIVE"로 변경된 정보 저장)
        setUserInfo(data.result);

        // 3. 홈 화면 이동 (모국어에 따라 분기)
        if (data.result.nativeLang === 'ko') { // "ko" 확인
          navigate('/home-korean', { replace: true });
        } else {
          navigate('/home-native', { replace: true });
        }
      } else {
        alert(data.message || '정보 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('❌ 온보딩 에러:', error);
      alert('오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  // 로그아웃 (이전 단계 코드 유지)
  const handleLogout = async () => {
    await logoutApi();
    logout();
    localStorage.removeItem('auth-storage');
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-5 py-10 bg-white relative">
      {/* 상단 로그아웃 */}
      <div className="absolute top-6 right-6">
        <button onClick={handleLogout} className="text-gray-400 text-sm underline">
          로그아웃
        </button>
      </div>

      <div className="flex flex-col items-center mt-20 gap-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          어떤 언어로<br />학습하시겠어요?
        </h1>

        {/* 1. 모국어 선택 */}
        <div className="w-full">
          <p className="mb-2 font-bold text-gray-700">나의 모국어</p>
          <div className="flex gap-3">
            <LanguageButton 
              label="한국어" 
              value="ko" // 👈 백엔드 규격에 맞춰 "ko" 사용
              isSelected={nativeLang === 'ko'} 
              onClick={setNativeLang} 
            />
            <LanguageButton 
              label="English" 
              value="en" 
              isSelected={nativeLang === 'en'} 
              onClick={setNativeLang} 
            />
          </div>
        </div>

        {/* 2. 학습 언어 선택 */}
        <div className="w-full">
          <p className="mb-2 font-bold text-gray-700">배우고 싶은 언어</p>
          <div className="flex gap-3">
            <LanguageButton 
              label="한국어" 
              value="ko" 
              isSelected={learningLang === 'ko'} 
              onClick={setLearningLang}
              disabled={nativeLang === 'ko'} // 모국어와 같으면 선택 불가 처리
            />
            <LanguageButton 
              label="English" 
              value="en" 
              isSelected={learningLang === 'en'} 
              onClick={setLearningLang}
              disabled={nativeLang === 'en'}
            />
          </div>
        </div>

        {/* 시작하기 버튼 */}
        <button
          onClick={handleStart}
          disabled={!isValid} // 👈 값이 없으면 버튼 비활성화 (백엔드 400 에러 방지)
          className={`w-full py-4 rounded-xl text-lg font-bold mt-10 transition-all duration-200
            ${isValid 
              ? 'bg-[#7C51D2] text-white hover:bg-[#6A43B5] shadow-lg cursor-pointer' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
        >
          {isLoading ? '저장 중...' : '시작하기'}
        </button>
      </div>
    </div>
  );
};

// 버튼 UI 컴포넌트
interface LangButtonProps {
  label: string;
  value: string;
  isSelected: boolean;
  onClick: (val: string) => void;
  disabled?: boolean;
}

const LanguageButton = ({ label, value, isSelected, onClick, disabled }: LangButtonProps) => (
  <button
    onClick={() => onClick(value)}
    disabled={disabled}
    className={`flex-1 py-4 border rounded-xl font-bold transition-all duration-200
      ${isSelected 
        ? 'border-[#7C51D2] bg-[#F5F1FF] text-[#7C51D2] ring-1 ring-[#7C51D2]' 
        : 'border-gray-200 text-gray-500 bg-white hover:border-gray-300'
      }
      ${disabled ? 'opacity-40 cursor-not-allowed bg-gray-50 border-gray-100' : ''}
    `}
  >
    {label}
  </button>
);

export default SelectLangPage;