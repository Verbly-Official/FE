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
          <div className="flex">
            {/* 왼쪽 메뉴 카드 */}
            <div className="w-[278px] h-[940px] px-[20px] py-9 bg-white rounded-l-[12px] border border-r-0 border-[#E5E7EB]">
              <SolidButton className="w-full h-[60px] px-[20px] py-[32px] mb-8">새 글 작성하기</SolidButton>
              <div>
                <div className="flex items-start text-[#9E9E9E] text-[17px] font-semibold leading-[100%] font-pretendard">내 문서</div>
                {/* <OutlinedButton iconSrc="/icons/bookmark.svg" pressed={pressed} onClick={() => setPressed((prev) => !prev)}>
                  북마크
                </OutlinedButton> */}
              </div>
            </div>

            {/* 메인 카드 */}
            <div className="flex-1 min-h-[940px] rounded-r-[12px] border border-[#E5E7EB] bg-[#FBFBFB] items-center">
              <div className="flex px-6 py-9 items-center gap-[20px] rounded-[12px] border border-[#D9D9D9] bg-white"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Correction_Main;
