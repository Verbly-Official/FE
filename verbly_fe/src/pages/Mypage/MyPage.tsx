import React from "react";
import { useState } from "react";
import GNB from "../../components/Nav/GNB";
import SideMenu from "../../components/Nav/SideMenu";
import SolidButton from "../../components/Button/SolidButton";
import OutlinedButton from "../../components/Button/OutlinedButton";
import File from "../../assets/emoji/file.svg";

const Correction_Main = () => {
  const [pressed, setPressed] = useState(false);

  return (
    <div className="min-h-screen ">
      {/* 1. GNB */}
      <div className="w-full max-w-[1920px] mx-auto">
        <GNB variant="home" />
      </div>

      {/* 2. 좌측 아이콘바 + 컨텐츠 */}
      <div className="flex w-full max-w-[1920px] mx-auto">
        {/* 가장 왼쪽 사이드바(컴포넌트) */}
        <SideMenu variant="small" />

        {/* 컨텐츠 영역 */}
        <div className="flex-1 px-[28px] py-[30px] bg-[#F8FAFC]">
          
          </div>
      </div>
    </div>
  );
};

export default Correction_Main;
