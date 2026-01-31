import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const OAuthCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    // 1. URL 쿼리 파라미터에서 값 추출
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const isSuccess = searchParams.get('isSuccess'); // 백엔드가 보내준다면 확인 가능 (선택사항)

    console.log("🔹 OAuth Callback 진입");
    console.log("Params Check:", { accessToken, refreshToken, isSuccess });

    // 2. 토큰 유효성 검사 및 로그인 처리
    if (accessToken && refreshToken) {
      console.log("✅ 로그인 성공! 토큰을 스토어에 저장합니다.");
      
      // Zustand 스토어에 토큰 저장 (타입 단언 as string 사용)
      login(accessToken as string, refreshToken as string);

      // 3. 페이지 이동 로직
      // (기존 회원은 홈으로, 신규 회원은 온보딩으로 보내는 구분 값 'status'가 있다면 활용)
      const status = searchParams.get('status'); 
      
      if (status === 'NEED_ONBOARDING') {
        navigate('/login/select-language', { replace: true });
      } else {
        navigate('/home-korean', { replace: true });
      }

    } else {
      // ❌ 실패 케이스
      console.error("❌ 로그인 실패: 토큰이 URL에 없습니다.");
      console.log("Current URL:", window.location.href); // 디버깅용 현재 주소 출력
      
      alert("로그인 처리에 실패했습니다. 다시 시도해 주세요.");
      navigate('/login', { replace: true });
    }
  }, [navigate, login, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      {/* 로딩 스피너 */}
      <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin border-t-primary-500"></div>
      <p className="mt-4 text-lg font-medium text-gray-600">로그인 처리 중...</p>
    </div>
  );
};

export default OAuthCallbackPage;