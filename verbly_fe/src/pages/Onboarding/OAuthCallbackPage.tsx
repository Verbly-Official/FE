import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { getMyProfileApi } from '../../apis/auth';
import loadingVideo from './video/loading.mp4';

const OAuthCallbackPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const isProcessing = useRef(false);

  useEffect(() => {
    // React Strict Mode 중복 실행 방지
    if (isProcessing.current) return;
    isProcessing.current = true;

    const processLogin = async () => {
      console.log('🔐 OAuth 콜백 처리 시작');

      // 쿠키 도착 대기 (백엔드 리다이렉트 후 쿠키 설정 시간 고려)
      await new Promise(resolve => setTimeout(resolve, 800));

      // HttpOnly 쿠키는 document.cookie로 확인 불가능하므로
      // 직접 API 요청으로 인증 상태를 확인
      if (import.meta.env.DEV) {
        console.log('🔐 쿠키 기반 인증 확인 중... (HttpOnly 쿠키는 JS에서 직접 확인 불가)');
      }

      try {
        console.log('📡 사용자 정보 조회 시도... GET /user/me');
        const response = await getMyProfileApi();

        if (!response || !response.isSuccess) {
          throw new Error(response?.message || '로그인에 실패했습니다.');
        }

        const userInfo = response.result;
        login(userInfo);

        console.log('✅ 로그인 성공! 상태:', userInfo.status);

        if (userInfo.status === 'NEED_ONBOARDING') {
          navigate('/login/select-language', { replace: true });
        } else {
          const homePath = userInfo.nativeLang === 'ko' ? '/home-korean' : '/home-native';
          navigate(homePath, { replace: true });
        }

      } catch (error: any) {
        console.error('❌ 로그인 처리 중 오류 발생:', error);
        
        let errorMsg = '로그인 처리 중 문제가 발생했습니다.';
        
        // CASE 1: 401 Unauthorized (쿠키 없음 또는 만료)
        if (error.response?.status === 401) {
          console.error('🚨 인증 실패: 서버로부터 유효한 인증 정보를 받지 못했습니다.');
          errorMsg = '인증에 실패했습니다. 다시 로그인해주세요.';
        }
        // CASE 2: 404 Not Found
        else if (error.response?.status === 404) {
          console.error('🚨 404 발생: 사용자 정보를 찾을 수 없습니다.');
          
          // 신규 유저인 경우 온보딩으로
          const resData = error.response?.data;
          if (resData?.code === 'USER2001' || resData?.result?.status === 'NEED_ONBOARDING') {
            navigate('/login/select-language', { replace: true });
            return;
          }
          errorMsg = '계정 정보를 찾을 수 없습니다.';
        }
        // CASE 3: HTML 응답 (서버 에러)
        else if (
          error.message?.includes('JSON') || 
          error.response?.headers?.['content-type']?.includes('text/html')
        ) {
          console.error('🚨 서버가 HTML을 반환했습니다. (서버 내부 오류 가능성)');
          errorMsg = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
        }

        // 에러 발생 시 로그인 페이지로 리다이렉트
        navigate(`/login?error=${encodeURIComponent(errorMsg)}`, { replace: true });
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
        className="w-full max-w-[400px] h-auto"
      />
      <div className="flex flex-col justify-center items-center gap-4">
        <span className="text-2xl font-medium">홈 화면으로 이동 중이에요</span>
        <span className="text-2xl font-medium">잠시만 기다려 주세요...</span>
      </div>
    </div>
  );
};

export default OAuthCallbackPage;