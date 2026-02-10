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
      console.log('🔐 OAuth 콜백 처리 시작 (API 인증 방식)');

      try {
        // 1. 쿠키 설정 대기 (0.5초)
        await new Promise(resolve => setTimeout(resolve, 500));

        // 2. JS로 쿠키를 읽는 건 포기하고(불가능하니), 바로 서버에 물어봅니다.
        // 브라우저가 알아서 쿠키를 실어 보내줍니다.
        console.log('📡 내 정보 조회 요청: GET /user/me');
        const response = await getMyProfileApi();

        if (response.isSuccess) {
          const userInfo = response.result;
          login(userInfo);

          // 정상적인 응답(200) 안에 상태값이 있다면 그걸로 분기
          if (userInfo.status === 'NEED_ONBOARDING') {
            navigate('/login/selectLanguage', { replace: true });
          } else {
            const homePath = userInfo.nativeLang === 'ko' ? '/my/korean' : '/my/native';
            navigate(homePath, { replace: true });
          }
        }
      } catch (error: any) {
        console.error('❌ 로그인 확인 중 응답:', error);

        // 404 에러는 "인증은 됐으나 유저 정보가 없는 상태" -> 온보딩으로 이동
        if (error.response?.status === 404) {
           console.log('👶 신규 유저(404) -> 온보딩 페이지로 이동');
           navigate('/login/selectLanguage', { replace: true });
           return;
        }
        
        // 401 에러라면 진짜 인증 실패 (쿠키 안 넘어감)
        if (error.response?.status === 401) {
            navigate('/login?error=인증_실패(쿠키없음)', { replace: true });
            return;
        }

        // 기타 에러
        navigate('/login?error=로그인_처리_실패', { replace: true });
      }
    };

    processLogin();
  }, [navigate, login]);

  return (
    <div className="flex flex-col items-center justify-center bg-[#FBFBFB] w-full min-h-screen gap-12 px-4">
      <video 
        src={loadingVideo}
        autoPlay 
        loop 
        muted 
        playsInline
        className="w-auto max-w-[400px] h-auto"
      />
      <div className="flex flex-col justify-center items-center gap-4">
        <span className="text-[24px]">홈 화면으로 이동 중이에요</span>
        <span className="text-[24px]">잠시만 기다려 주세요...</span>
      </div>
    </div>
  );
};

export default OAuthCallbackPage;