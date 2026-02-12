import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from '../../components/Select/Select';
import SolidButton from '../../components/Button/SolidButton';
import OutlinedButton from '../../components/Button/OutlinedButton';
import Logo from '../../components/Logo/Logo';
import { Text } from '../../components/Text/Text';
import { useAuthStore } from '../../store/useAuthStore';
import { saveOnboardingApi, validateLanguageSelection } from '../../apis/user';
import { handleLogout, getMyProfileApi } from '../../apis/auth';
import { getCookie, setCookie, clearOAuthInfoCookies } from '../../utils/cookieUtils';

const LANGUAGE_OPTIONS = [
  { label: '한국어', value: 'ko' },
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

  const handleComplete = async () => {
    if (!validation.isValid) {
      setError(validation.error || '입력값을 확인해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const nickname = getCookie('nickname') || '';
      const profileImage = getCookie('profileImage') || '';

      const response = await saveOnboardingApi({
        nickname,
        profileImage,
        nativeLang,
        learningLang,
      });

      if (response.isSuccess) {
        const { accessToken, refreshToken, userId, status } = response.result;
        
        if (accessToken && refreshToken) {
            setCookie('accessToken', accessToken, { path: '/' });
            setCookie('refreshToken', refreshToken, { path: '/' });
        }

        clearOAuthInfoCookies();

        updateUserInfo({ 
          userId: userId,
          nickname: response.result.nickname,
          profileImage: response.result.profileImage,
          nativeLang, 
          learningLang, 
          status: status as any
        });
        
        localStorage.setItem('learningLanguage', learningLang);
        localStorage.setItem('nativeLanguage', nativeLang);

        const homePath = nativeLang === 'ko' ? '/home/korean' : '/home/native';
        navigate(homePath, { replace: true });
      }

    } catch (err: any) {
      console.error('❌ 온보딩 에러:', err);

      if (err.response?.status === 400) {
        try {
          const profileRes = await getMyProfileApi();
          if (profileRes.isSuccess && profileRes.result.status === 'ACTIVE') {
            login(profileRes.result);
            const homePath = profileRes.result.nativeLang === 'ko' ? '/home/korean' : '/home/native';
            navigate(homePath, { replace: true });
            return;
          }
        } catch (checkErr) { 
          console.error('상태 재확인 실패:', checkErr);
        }
      }

      const errorMessage = err.response?.data?.message || '이미 처리되었거나 잘못된 요청입니다.';
      setError(errorMessage);
      
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoutClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await handleLogout(true);
    } catch (error) {
      console.error('로그아웃 처리 중 오류:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--color-white)] px-5 py-10">
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
            <div className="w-full p-3 bg-pink-100 border border-pink-20 rounded-lg">
              <p className="text-[length:var(--fs-body2)] text-pink-20">{error}</p>
            </div>
          )}
          
          {/* 유효성 경고 (text-orange-500 -> text-pink-20 통일) */}
          {!validation.isValid && nativeLang && learningLang && (
            <div className="w-full">
               <p className="text-[length:var(--fs-body2)] text-pink-20 text-center">
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