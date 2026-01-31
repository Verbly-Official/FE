import { useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import googleIcon from '../../assets/emoji/google.svg?react';
import kakaoIcon from '../../assets/emoji/kakao.svg?react';
import SolidButton from '../../components/Button/SolidButton';

const LoginPage = () => {
  // 뒤로가기 등의 기능을 위해 navigate를 준비했지만, 소셜 로그인은 href 이동을 사용합니다.
  const navigate = useNavigate();

  // 환경변수에서 백엔드 주소를 가져옵니다. (없을 경우를 대비해 localhost 폴백을 넣어두면 개발 시 편리합니다)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
  };

  const handleKakaoLogin = () => {
    // 백엔드의 카카오 로그인 엔드포인트로 리다이렉트
    window.location.href = `${API_BASE_URL}/oauth2/authorization/kakao`;
  };

  return (
    // 전체 컨테이너: Flex Row로 좌우 분할
    <div className="flex w-full h-screen bg-white">
      {/* 1. 이미지 영역 (왼쪽) - 추후 이미지가 들어갈 수 있음 */}
      <div className="w-[60%] h-full flex-shrink-0 bg-gray-100"></div>

      {/* 2. 로그인 폼 영역 (오른쪽 나머지) */}
      <div className="flex-1 h-full flex items-center justify-center">
        {/* 로그인 폼 내부 컨테이너 */}
        <div className="flex flex-col w-[460px] items-center gap-8">
          
          {/* 로고 영역 */}
          <div className="w-[144px] h-[40px] flex justify-center items-center cursor-pointer">
             {/* Logo 컴포넌트 내부에서 이미 navigate 처리가 되어 있으나, 필요시 여기서 감쌀 수도 있습니다. */}
            <Logo variant="hori" />
          </div>

          {/* 소셜 로그인 버튼 목록 */}
          <div className="flex flex-col gap-3 w-full">
            
            {/* 구글 로그인 버튼 */}
            <SolidButton
              variant="assistive"
              size="large"
              Icon={googleIcon}
              className="justify-center !text-gray-9 text-opacity-85 w-full border border-gray-200"
              onClick={handleGoogleLogin}
              label='Continue with Google'
            />

            {/* 카카오 로그인 버튼 */}
            <SolidButton
              variant="assistive"
              size="large"
              Icon={kakaoIcon}
              className="justify-center !bg-[#FEE500] !text-black w-full hover:!bg-[#FDD835]" // 카카오 고유 컬러 적용
              onClick={handleKakaoLogin}
              label='Continue with Kakao talk'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;