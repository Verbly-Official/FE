import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate import 추가
import Logo from "../components/Logo/Logo";
import googleIcon from "../assets/emoji/google.svg";
import kakaoIcon from "../assets/emoji/kakao.svg";
import SolidButton from "../components/Button/SolidButton";
import { Text } from "../components/Text/Text";

const LoginPage = () => {
  const navigate = useNavigate(); // navigate 함수 생성

  const handleLogin = () => {
    // 실제 로그인 로직 처리 후 이동하거나, 바로 이동
    navigate("/select-language");
  };

  return (
    // 전체 컨테이너: Flex Row로 좌우 분할
    <div className="flex w-full h-screen bg-white">
      {/* 1. 이미지 영역 (왼쪽) */}
      <div className="w-[60%] h-full flex-shrink-0 bg-gray-100"></div>

      {/* 2. 로그인 폼 영역 (오른쪽 나머지) */}
      <div className="flex-1 h-full flex items-center justify-center">
        {/* 로그인 폼 컨테이너 */}
        <div className="flex flex-col w-[460px] items-center gap-8">
          {/* 로고 */}
          <div className="w-[144px] h-[40px] flex justify-center items-center">
            <Logo variant="hori" />
          </div>

          {/* 소셜 로그인 버튼들 */}
          <div className="flex flex-col gap-3 w-auto h-[144px]">
            {/* 구글 로그인 버튼 */}
            <SolidButton
              variant="assistive"
              size="large"
              iconSrc={googleIcon}
              className="justify-center !text-gray-9 text-opacity-85"
              onClick={handleLogin} // 클릭 핸들러 연결
            >
              <Text size="medium" state="default">
                Continue with Google
              </Text>
            </SolidButton>

            {/* 카카오 로그인 버튼 */}
            <SolidButton
              variant="assistive"
              size="large"
              iconSrc={kakaoIcon}
              className="justify-center !text-gray-9 text-opacity-85 !bg-[#FFE100] !hover:bg-gray-2"
              onClick={handleLogin} // 클릭 핸들러 연결
            >
              <Text size="medium" state="default">
                Continue with Kakao Talk
              </Text>
            </SolidButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
