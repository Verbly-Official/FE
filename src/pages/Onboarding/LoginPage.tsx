// src/pages/Onboarding/LoginPage.tsx
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../../components/Logo/Logo";
import googleIcon from "../../assets/emoji/google.svg?react";
import kakaoIcon from "../../assets/emoji/kakao.svg?react";
import SolidButton from "../../components/Button/SolidButton";
import onboardingImg from "./onboarding.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      setErrorMessage(decodeURIComponent(error));
      const timer = setTimeout(() => setErrorMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const handleGoogleLogin = () => {
    window.location.href = `${BASE_URL}/oauth2/authorization/google`;
  };

  const handleKakaoLogin = () => {
    window.location.href = `${BASE_URL}/oauth2/authorization/kakao`;
  };

  return (
    // [80% 배율 적용] 외부 컨테이너: 화면 넘침 방지
    <div className="w-full h-screen overflow-hidden bg-[var(--color-white)]">
      {/* [80% 배율 적용] 내부 컨테이너: 
         - w-[125%], h-[125vh]: 0.8배로 줄였을 때 화면에 딱 맞게 하기 위해 1.25배로 키움 (1 / 0.8 = 1.25)
         - scale-[0.8]: 전체를 80%로 축소
         - origin-top-left: 좌상단을 기준으로 축소
      */}
      <div className="flex w-[125%] h-[125vh] origin-top-left scale-[0.8]">
        {/* 왼쪽: 이미지 영역 (60% 비율) */}
        <div className="w-[60%] h-full flex-shrink-0 overflow-hidden">
          <img 
            src={onboardingImg} 
            alt="Onboarding"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 오른쪽: 로그인 폼 영역 */}
        <div className="flex-1 h-full flex items-center justify-center">
          <div className="flex flex-col w-[460px] items-center gap-8">
            <div className="w-[144px] h-[40px] flex justify-center items-center cursor-pointer">
              <Logo variant="hori" />
            </div>

            <div className="flex flex-col gap-[24px] w-full">
              <SolidButton
                variant="assistive"
                size="large"
                Icon={googleIcon}
                className="justify-center !text-gray-9 text-opacity-85 w-full border border-gray-2"
                onClick={handleGoogleLogin}
                label="Continue with Google"
              />

              <SolidButton
                variant="assistive"
                size="large"
                Icon={kakaoIcon}
                className="justify-center !bg-[#FEE500] !text-[var(--color-black)] w-full hover:!bg-[#FDD835]"
                onClick={handleKakaoLogin}
                label="Continue with Kakao talk"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;