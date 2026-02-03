import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { getCookie, deleteMultipleCookies } from '../../utils/cookieUtils';

const OAuthCallbackPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const processOAuthCallback = async () => {
      try {
        console.log('🔹 OAuth Callback 처리 시작');

        // 1. 쿠키에서 인증 정보 추출
        const accessToken = getCookie('accessToken');
        const refreshToken = getCookie('refreshToken');
        const status = getCookie('status');
        const userId = getCookie('userId');
        const provider = getCookie('provider');
        const nickname = getCookie('nickname');
        const profileImage = getCookie('profileImage');
        const email = getCookie('email');

        console.log('📦 쿠키 데이터:', {
          hasAccessToken: !!accessToken,
          hasRefreshToken: !!refreshToken,
          status,
          userId,
          provider,
        });

        // 2. 토큰 유효성 검증
        if (!accessToken || !refreshToken) {
          console.error('❌ 토큰이 쿠키에 없습니다');
          setErrorMessage('로그인 처리에 실패했습니다. 토큰을 받지 못했습니다.');
          
          // 실패 시에도 혹시 남아있을 쿠키 삭제
          deleteMultipleCookies([
            'accessToken',
            'refreshToken',
            'userId',
            'provider',
            'nickname',
            'profileImage',
            'email',
            'status',
          ]);

          // 3초 후 로그인 페이지로 이동
          setTimeout(() => {
            navigate('/login', { replace: true });
          }, 3000);
          return;
        }

        // 3. localStorage에 토큰 저장
        console.log('✅ 토큰을 localStorage에 저장합니다');
        login(accessToken, refreshToken);

        // 4. 추가 사용자 정보를 localStorage에 저장 (선택사항)
        if (userId) localStorage.setItem('userId', userId);
        if (provider) localStorage.setItem('provider', provider);
        if (nickname) localStorage.setItem('nickname', nickname);
        if (profileImage) localStorage.setItem('profileImage', profileImage);
        if (email) localStorage.setItem('email', email);

        // 5. 쿠키에서 민감한 정보 즉시 삭제 (보안 필수!)
        console.log('🔒 쿠키에서 민감 정보 삭제 중...');
        deleteMultipleCookies([
          'accessToken',
          'refreshToken',
          'userId',
          'provider',
          'nickname',
          'profileImage',
          'email',
          'status',
        ]);

        // 6. 사용자 상태에 따라 페이지 이동
        console.log('🚀 페이지 이동:', status);
        if (status === 'NEED_ONBOARDING') {
          navigate('/login/select-language', { replace: true });
        } else {
          navigate('/home-korean', { replace: true });
        }
      } catch (error) {
        console.error('❌ OAuth 콜백 처리 중 오류:', error);
        setErrorMessage('로그인 처리 중 오류가 발생했습니다.');

        // 오류 발생 시에도 쿠키 삭제
        deleteMultipleCookies([
          'accessToken',
          'refreshToken',
          'userId',
          'provider',
          'nickname',
          'profileImage',
          'email',
          'status',
        ]);

        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 3000);
      }
    };

    processOAuthCallback();
  }, [navigate, login]);

  // 에러 메시지가 있으면 에러 화면 표시
  if (errorMessage) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center gap-4 max-w-md px-6">
          {/* 에러 아이콘 */}
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          {/* 에러 메시지 */}
          <h2 className="text-xl font-semibold text-gray-900">로그인 실패</h2>
          <p className="text-center text-gray-600">{errorMessage}</p>
          <p className="text-sm text-gray-500">잠시 후 로그인 페이지로 이동합니다...</p>
        </div>
      </div>
    );
  }

  // 로딩 화면
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      {/* 로딩 스피너 */}
      <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin border-t-primary-500"></div>
      <p className="mt-4 text-lg font-medium text-gray-600">로그인 처리 중...</p>
      <p className="mt-2 text-sm text-gray-500">잠시만 기다려주세요</p>
    </div>
  );
};

export default OAuthCallbackPage;