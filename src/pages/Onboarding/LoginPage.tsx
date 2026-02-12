// src/pages/Onboarding/LoginPage.tsx
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../../components/Logo/Logo";
import googleIcon from "../../assets/emoji/google.svg?react";
import kakaoIcon from "../../assets/emoji/kakao.svg?react";
import SolidButton from "../../components/Button/SolidButton";

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
    <div className="flex w-full h-screen bg-[var(--color-white)]">
      <div className="w-[60%] h-full flex-shrink-0 bg-gray-1"></div>

      <div className="flex-1 h-full flex items-center justify-center">
        <div className="flex flex-col w-[460px] items-center gap-8">
          <div className="w-[144px] h-[40px] flex justify-center items-center cursor-pointer">
            <Logo variant="hori" />
          </div>

          {/*에러 메세지 추후 삭제 예정*/}
          {errorMessage && (
            <div className="w-full p-4 bg-pink-100 border border-pink-20 rounded-lg">
              <p className="text-[length:var(--fs-body2)] text-pink-20 text-center">{errorMessage}</p>
            </div>
          )}

          <div className="flex flex-col gap-3 w-full">
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
  );
};

export default LoginPage;