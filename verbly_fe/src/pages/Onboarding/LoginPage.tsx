import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import googleIcon from "../../assets/emoji/google.svg?react";
import kakaoIcon from "../../assets/emoji/kakao.svg?react";
import SolidButton from "../../components/Button/SolidButton";

const LoginPage = () => {
  const navigate = useNavigate();

  // 환경변수에서 백엔드 주소를 가져옵니다
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleGoogleLogin = () => {
    // 백엔드의 OAuth 엔드포인트로 리다이렉트
    window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
  };

  const handleKakaoLogin = () => {
    // 백엔드의 카카오 로그인 엔드포인트로 리다이렉트
    window.location.href = `${API_BASE_URL}/oauth2/authorization/kakao`;
  };

  return (
    <div className="flex w-full h-screen bg-white">
      {/* 이미지 영역 (왼쪽) */}
      <div className="w-[60%] h-full flex-shrink-0 bg-gray-100"></div>

      {/* 로그인 폼 영역 (오른쪽) */}
      <div className="flex-1 h-full flex items-center justify-center">
        <div className="flex flex-col w-[460px] items-center gap-8">
          {/* 로고 영역 */}
          <div className="w-[144px] h-[40px] flex justify-center items-center cursor-pointer">
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
              label="Continue with Google"
            />

            {/* 카카오 로그인 버튼 */}
            <SolidButton
              variant="assistive"
              size="large"
              Icon={kakaoIcon}
              className="justify-center !bg-[#FEE500] !text-black w-full hover:!bg-[#FDD835]"
              onClick={handleKakaoLogin}
              label="Continue with Kakao talk"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;