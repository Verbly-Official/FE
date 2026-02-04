import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { getMyProfileApi } from '../../apis/auth';
import { getCookie } from '../../utils/cookieUtils';
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

      // 1. 쿠키 도착 대기 (백엔드 리다이렉트 후 쿠키 설정 시간 고려)
      await new Promise(resolve => setTimeout(resolve, 800));

      // 2. 쿠키 존재 여부 우선 확인 (개발 환경 디버깅용)
      // 배포 환경에서는 HttpOnly 쿠키라 안 보일 수 있지만, 로컬에서는 확인 가능할 수 있음
      const hasCookie = document.cookie.includes('accessToken') || document.cookie.includes('isSuccess');
      if (!hasCookie && import.meta.env.DEV) {
         console.warn('⚠️ 경고: 브라우저에서 accessToken 쿠키가 감지되지 않았습니다.');
      }

      try {
        console.log('📡 사용자 정보 조회 시도... GET /api/user/me');
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
        
        // -------------------------------------------------------------
        // 🚨 [에러 분석 및 처리]
        // -------------------------------------------------------------
        let errorMsg = '로그인 처리 중 문제가 발생했습니다.';
        
        // CASE 1: 401 Unauthorized (쿠키 없음)
        if (error.response?.status === 401) {
            console.error('🚨 인증 실패: 서버로부터 쿠키(Token)를 받지 못했습니다.');
            errorMsg = '서버로부터 인증 정보를 받지 못했습니다. (Set-Cookie 누락)';
        }
        // CASE 2: 404 Not Found (신규 유저 아님, 그냥 API 못 찾음)
        else if (error.response?.status === 404) {
            // 백엔드가 HTML(에러페이지)을 줬을 가능성 높음
            console.error('🚨 404 발생: API 경로가 잘못되었거나 유저 정보가 없습니다.');
            
            // 혹시라도 신규 유저 코드가 들어있는지 확인
            const resData = error.response?.data;
            if (resData?.code === 'USER2001' || getCookie('userStatus') === 'NEED_ONBOARDING') {
                navigate('/login/select-language', { replace: true });
                return;
            }
            errorMsg = '계정 정보를 찾을 수 없습니다. (404)';
        }
        // CASE 3: HTML 응답이 와서 JSON 파싱 에러가 난 경우
        else if (error.message?.includes('JSON') || error.response?.headers?.['content-type']?.includes('text/html')) {
            console.error('🚨 서버 응답 형식이 잘못되었습니다. (HTML 반환됨)');
            errorMsg = '서버 에러가 발생했습니다. (잘못된 응답 형식)';
        }

        // 로그인 페이지로 돌려보내면서 에러 메시지 전달
        navigate(`/login?error=${encodeURIComponent(errorMsg)}`, { replace: true });
      }
    };

    processLogin();
  }, [navigate, login]);

  return (
    <div className="flex flex-col items-center justify-center bg-[#FBFBFB] w-full min-h-screen gap-[46px] p-[110px_646px_390px];">
       {/* 스타일 일부 수정: 화면 중앙 정렬을 위해 min-h-screen과 padding 조정 권장 */}
      <video 
        src={loadingVideo}
        autoPlay 
        loop 
        muted 
        playsInline
        className="w-[400px] h-auto" // 크기 제어 클래스 추가 권장
      />
      <div className='flex w-auto flex-col justify-center items-center gap-[16px]'>
        <span className='text-[24px]'>홈 화면으로 이동 중이에요</span>
        <span className='text-[24px]'>잠시만 기다려 주세요...</span>
      </div>
    </div>
  );
};

export default OAuthCallbackPage;