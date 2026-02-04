import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from '../../components/Select/Select';
import SolidButton from '../../components/Button/SolidButton';
import OutlinedButton from '../../components/Button/OutlinedButton';
import Logo from '../../components/Logo/Logo';
import { Text } from '../../components/Text/Text';
import { useAuthStore } from '../../store/useAuthStore';
import { saveOnboardingApi, validateLanguageSelection } from '../../apis/user';
import { handleLogout, getMyProfileApi } from '../../apis/auth'; // ✅ handleLogout import 추가

const LANGUAGE_OPTIONS = [
  { label: '한국어', value: 'ko' },  // ✅ 'kr' -> 'ko' 수정
  { label: 'English', value: 'en' },
];

const SelectLangPage = () => {
  const navigate = useNavigate();
  const [learningLang, setLearningLang] = useState<string>('');
  const [nativeLang, setNativeLang] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { updateUserInfo, login } = useAuthStore();

  const validation = validateLanguageSelection(nativeLang, learningLang);
  const isButtonDisabled = !validation.isValid || isLoading;

  /**
   * 온보딩 완료 핸들러
   */
  const handleComplete = async () => {
    if (!validation.isValid) {
      setError(validation.error || '입력값을 확인해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('📝 온보딩 정보 저장 시도...');
      
      const response = await saveOnboardingApi({
        nativeLang,
        learningLang,
      });

      if (response.isSuccess) {
        console.log('✅ 온보딩 성공');
        updateUserInfo({ nativeLang, learningLang, status: 'ACTIVE' });
        localStorage.setItem('learningLanguage', learningLang);
        localStorage.setItem('nativeLanguage', nativeLang);

        const homePath = nativeLang === 'ko' ? '/home-korean' : '/home-native';
        navigate(homePath, { replace: true });
      }

    } catch (err: any) {
      console.error('❌ 온보딩 에러:', err);

      // ✅ 400 에러 발생 시 (이미 온보딩된 유저일 가능성)
      if (err.response?.status === 400) {
        console.log('⚠️ 400 에러 감지 - 유저 상태 재확인 중...');
        
        try {
          // 내 최신 정보 조회
          const profileRes = await getMyProfileApi();
          
          if (profileRes.isSuccess && profileRes.result.status === 'ACTIVE') {
            console.log('🚀 확인 완료: 이미 활동 중인 유저입니다. 홈으로 이동합니다.');
            
            // 최신 정보로 스토어 업데이트
            login(profileRes.result);
            
            // 홈으로 강제 이동
            const homePath = profileRes.result.nativeLang === 'ko' ? '/home-korean' : '/home-native';
            navigate(homePath, { replace: true });
            return;
          }
        } catch (checkErr) {
          console.error('상태 재확인 실패:', checkErr);
        }
      }

      // 진짜 에러인 경우 메시지 표시
      const errorMessage = err.response?.data?.message 
        || '이미 처리되었거나 잘못된 요청입니다.';
      setError(errorMessage);
      
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 로그아웃 핸들러 (auth.ts의 통합 함수 사용)
   */
  const handleLogoutClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    
    try {
      await handleLogout(true); // ✅ auth.ts의 통합 함수 호출
    } catch (error) {
      console.error('로그아웃 처리 중 오류:', error);
      // handleLogout 내부에서 이미 리다이렉트 처리됨
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-5 py-10">
      <div className="flex flex-col items-center w-full max-w-[500px] gap-10">
        <div className="flex flex-col items-center justify-center w-full mb-2">
          <Logo variant="hori" />
        </div>

        <div className="flex flex-col w-full gap-6">
          <div className="flex flex-col w-full gap-2">
            <Text size="medium" state="default">Learning</Text>
            <Select
              placeholder="언어를 선택해주세요"
              options={LANGUAGE_OPTIONS}
              value={learningLang}
              onChange={(val) => { setLearningLang(val); if (error) setError(''); }}
              size="large"
              className="!w-full"
            />
          </div>

          <div className="flex flex-col w-full gap-2">
            <Text size="medium" state="default">Native Language</Text>
            <Select
              placeholder="언어를 선택해주세요"
              options={LANGUAGE_OPTIONS}
              value={nativeLang}
              onChange={(val) => { setNativeLang(val); if (error) setError(''); }}
              size="large"
              className="!w-full"
            />
          </div>

          {error && (
            <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          
          {!validation.isValid && nativeLang && learningLang && (
            <div className="w-full">
               <p className="text-sm text-orange-500 text-center">
                 {validation.error || '모국어와 학습 언어는 달라야 합니다.'}
               </p>
            </div>
          )}
        </div>

        <div className="flex flex-col w-full gap-3 mt-4">
          <SolidButton 
            variant="primary" 
            size="large" 
            className="w-full"
            label={isLoading ? 'Processing...' : 'Complete'}
            disabled={isButtonDisabled} 
            onClick={handleComplete}
          />
          <OutlinedButton 
            variant="secondary"
            size="large"
            className="w-full"
            label='Logout'
            onClick={handleLogoutClick}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectLangPage;