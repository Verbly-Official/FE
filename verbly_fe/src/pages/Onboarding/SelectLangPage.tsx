import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from '../../components/Select/Select';
import SolidButton from '../../components/Button/SolidButton';
import OutlinedButton from '../../components/Button/OutlinedButton';
import Logo from '../../components/Logo/Logo';
import { Text } from '../../components/Text/Text';
import { useAuthStore } from '../../store/useAuthStore';
import instance from '../../apis/axios';

// 언어 선택 옵션 정의
const LANGUAGE_OPTIONS = [
  { label: '한국어', value: 'Korean' },
  { label: 'English', value: 'English' },
];

const SelectLangPage = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  
  // 상태 관리
  const [learningLang, setLearningLang] = useState<string>('');
  const [nativeLang, setNativeLang] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleComplete = async () => {
    if (!learningLang || !nativeLang) return;

    setIsLoading(true);
    setError('');

    try {
      // 백엔드로 온보딩 정보 전송 (API 명세에 맞게 수정 필요)
      const response = await instance.post('/user/onboarding', {
        learningLanguage: learningLang,
        nativeLanguage: nativeLang,
      });

      if (response.data.isSuccess) {
        console.log('✅ 온보딩 완료:', response.data);
        
        // 로컬 스토리지에 언어 설정 저장 (선택사항)
        localStorage.setItem('learningLanguage', learningLang);
        localStorage.setItem('nativeLanguage', nativeLang);

        // 홈 화면으로 이동
        navigate('/home-korean', { replace: true });
      } else {
        setError(response.data.message || '온보딩 처리에 실패했습니다.');
      }
    } catch (err: any) {
      console.error('❌ 온보딩 API 호출 실패:', err);
      setError(
        err.response?.data?.message || '온보딩 처리 중 오류가 발생했습니다.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    // Zustand 스토어 초기화
    logout();
    
    // 로컬 스토리지의 추가 정보도 삭제
    localStorage.removeItem('userId');
    localStorage.removeItem('provider');
    localStorage.removeItem('nickname');
    localStorage.removeItem('profileImage');
    localStorage.removeItem('email');
    localStorage.removeItem('learningLanguage');
    localStorage.removeItem('nativeLanguage');
    
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-5 py-10">
      <div className="flex flex-col items-center w-full max-w-[500px] gap-10">
        
        {/* 로고 Section */}
        <div className="flex flex-col items-center justify-center w-full mb-2">
          <Logo variant="hori" />
        </div>

        {/* Form Section */}
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

          {/* 에러 메시지 표시 */}
          {error && (
            <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>

        {/* Button Section */}
        <div className="flex flex-col w-full gap-3 mt-4">
          {/* Complete Button */}
          <SolidButton 
            variant="primary" 
            size="large" 
            className="w-full"
            label={isLoading ? 'Processing...' : 'Complete'}
            disabled={!learningLang || !nativeLang || isLoading}
            onClick={handleComplete}
          />

          {/* Logout Button */}
          <OutlinedButton 
            variant="secondary"
            size="large"
            className="w-full"
            label='Logout'
            onClick={handleLogout}
            disabled={isLoading}
          />
        </div>

      </div>
    </div>
  );
};

export default SelectLangPage;