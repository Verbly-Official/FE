import { useEffect, useState, useRef } from 'react'; // useRef 추가
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { getCookie, deleteMultipleCookies } from '../../utils/cookieUtils';
import loadingVideo from './video/loading.mp4';

const OAuthCallbackPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  // 중복 실행 방지를 위한 ref
  const isProcessing = useRef(false);

  useEffect(() => {
    // 이미 처리 중이거나 처리가 완료되었다면 중단
    if (isProcessing.current) return;
    isProcessing.current = true;

    const processOAuthCallback = async () => {
      try {
        console.log('🔹 OAuth Callback 처리 시작');

        // 1. 쿠키에서 인증 정보 및 사용자 정보 추출
        const accessToken = getCookie('accessToken');
        const refreshToken = getCookie('refreshToken');
        const status = getCookie('status');
        
        const userId = getCookie('userId');
        const provider = getCookie('provider');
        const nickname = getCookie('nickname');
        const profileImage = getCookie('profileImage');
        const email = getCookie('email');

        console.log('📦 쿠키 데이터 확인:', {
          hasAccessToken: !!accessToken,
          hasRefreshToken: !!refreshToken,
          status,
        });

        // 2. 토큰 유효성 검증
        if (!accessToken || !refreshToken) {
          console.error('❌ 토큰이 쿠키에 없습니다');
          setErrorMessage('로그인 처리에 실패했습니다. 정보를 불러오지 못했습니다.');
          
          // 실패 시에도 혹시 모를 잔여 쿠키 삭제
          deleteMultipleCookies([
            'accessToken', 'refreshToken', 'userId', 'provider', 
            'nickname', 'profileImage', 'email', 'status'
          ]);

          setTimeout(() => {
            navigate('/login', { replace: true });
          }, 3000);
          return;
        }

        // 3. 스토어에 저장
        console.log('✅ 인증 정보를 스토어에 저장합니다');
        login(accessToken, refreshToken, {
          // 필수값(Required)들이 null이면 빈 문자열('')로 처리하여 타입 에러 방지
          userId: userId || '', 
          nickname: nickname || '',
          profileImage: profileImage || '',
          
          // 선택값(Optional)들이 null이면 undefined로 처리
          email: email || undefined,
          provider: provider || undefined, // 👈 수정된 부분 (null -> undefined 변환)
        });

        // 4. 쿠키 삭제 (중요: 저장 후 삭제)
        deleteMultipleCookies([
          'accessToken', 'refreshToken', 'userId', 'provider', 
          'nickname', 'profileImage', 'email', 'status'
        ]);

        // 5. 페이지 이동
        console.log('🚀 페이지 이동:', status);
        if (status === 'NEED_ONBOARDING') {
          navigate('/login/select-language', { replace: true });
        } else {
          navigate('/home-korean', { replace: true });
        }

      } catch (error) {
        console.error('❌ OAuth 콜백 처리 중 오류:', error);
        setErrorMessage('로그인 처리 중 오류가 발생했습니다.');
        
        // 에러 발생 시 쿠키 청소
        deleteMultipleCookies([
          'accessToken', 'refreshToken', 'userId', 'provider', 
          'nickname', 'profileImage', 'email', 'status'
        ]);
        
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 3000);
      }
    };

    processOAuthCallback();
  }, [navigate, login]);

  return (
    <div className="flex flex-col items-center justify-center bg-[#FBFBFB] w-full min-h-screen gap-[46px]">
       {/* 스타일 일부 수정: 화면 중앙 정렬을 위해 min-h-screen과 padding 조정 권장 */}
      <video 
        src={loadingVideo}
        autoPlay 
        loop 
        muted 
        playsInline
        className="w-[200px] h-auto" // 크기 제어 클래스 추가 권장
      />
      <div className='flex w-auto flex-col justify-center items-center gap-[16px]'>
        <span className='text-[24px] font-bold'>홈 화면으로 이동 중이에요</span>
        <span className='text-[18px] text-gray-500'>잠시만 기다려 주세요...</span>
        {errorMessage && (
          <span className='text-red-500 text-[16px] mt-2 font-medium'>{errorMessage}</span>
        )}
      </div>
    </div>
  );
};

export default OAuthCallbackPage;