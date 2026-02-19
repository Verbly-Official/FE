import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { getMyProfileApi } from '../../apis/user';
import loadingVideo from './video/loading.mp4';

const OAuthCallbackPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const isProcessing = useRef(false);

  useEffect(() => {
    if (isProcessing.current) return;
    isProcessing.current = true;

    const processLogin = async () => {
      useAuthStore.getState().logout();
      console.log('🔐 OAuth 콜백 처리 시작 (API 인증 방식)');

      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log('📡 내 정보 조회 요청: GET /user/me');
        const response = await getMyProfileApi();

        if (response.isSuccess) {
          const userInfo = response.result;
          login(userInfo);

          if (userInfo.status === 'NEED_ONBOARDING') {
            navigate('/login/selectLanguage', { replace: true });
          } else {
            const homePath = userInfo.nativeLang === 'kr' ? '/home/korean' : '/home/native';
            navigate(homePath, { replace: true });
          }
        }
      } catch (error: any) {
        console.error('❌ 로그인 확인 중 응답:', error);
        if (error.response?.status === 404) {
           console.log('👶 신규 유저(404) -> 온보딩 페이지로 이동');
           navigate('/login/selectLanguage', { replace: true });
           return;
        }
        
        if (error.response?.status === 401) {
            navigate('/login?error=인증_실패(쿠키없음)', { replace: true });
            return;
        }

        navigate('/login?error=로그인_처리_실패', { replace: true });
      }
    };

    processLogin();
  }, [navigate, login]);

  return (
    // [80% 배율 적용] 외부 래퍼
    <div className="w-full h-screen overflow-hidden bg-bg1">
      {/* [80% 배율 적용] 내부 컨텐츠: 125% 크기로 늘린 후 0.8로 축소 */}
      <div className="flex flex-col items-center justify-center w-[125%] h-[125vh] gap-12 px-4 origin-top-left scale-[0.8]">
        <video 
          src={loadingVideo}
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-auto max-w-[630px] h-auto"
        />
        <div className="flex flex-col justify-center items-center gap-4">
          <span className="text-[length:var(--fs-title1)]">홈 화면으로 이동 중이에요</span>
          <span className="text-[length:var(--fs-title1)]">잠시만 기다려 주세요...</span>
        </div>
      </div>
    </div>
  );
};

export default OAuthCallbackPage;