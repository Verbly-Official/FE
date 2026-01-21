import React from "react";
import { useState } from "react";
import GNB from "../../components/Nav/GNB";
import SideMenu from "../../components/Nav/SideMenu";
import SolidButton from "../../components/Button/SolidButton";
import Plus from "../../assets/emoji/plus.svg?react";
import Tab from "../../components/Tab/Tab";
import BtnTab from "../../components/Tab/BtnTab";
import Sidebar from "./SideBar";
import DocumentTable from "./DocumentTable";
import File from "../../assets/emoji/file.svg?react";
import { Pagination } from "../../components/Pagination/Pagination";

const Correction_Main = () => {
  const [pressed, setPressed] = useState(false);
  const [page, setPage] = useState(1);

  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = ["All", "Completed", "In Progress", "Pending"];

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
              <SolidButton size="large" className="w-full mb-8">
                <Plus className="w-[18px] h-[18px] text-white" />새 글 작성하기
              </SolidButton>
              <Sidebar />
            </div>

            {/* 메인 카드 */}
            <div className="flex-1 px-[122px] py-9 min-h-[940px] rounded-r-[12px] border border-[#E5E7EB] bg-[#FBFBFB] items-center">
              <div className="flex px-6 py-9 items-center gap-[20px] rounded-[12px] border border-[#D9D9D9] bg-white">
                <File className="w-[26.667px] h-[33.333px] text-[#353535]" />

                <div>
                  <div className="flex items-start text-[#9E9E9E] text-[17px] font-semibold leading-[100%] font-pretendard">Total Request</div>
                  <div className="text-[#353535] font-['Pretendard'] text-4xl font-bold leading-none">24</div>
                </div>
              </div>

              <div className="flex">
                {tabs.map((text, index) => (
                  <button key={index} type="button" onClick={() => setSelectedTab(index)}>
                    <Tab text={text} isSelected={index === selectedTab} />
                  </button>
                ))}
              </div>

              <div className="pt-7 pb-3">{/* <BtnTab /> */}</div>

              <DocumentTable />
              <Pagination currentPage={page} totalPages={10} onChange={setPage} shape="num" className="flex items-center justify-center pt-[8px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Correction_Main;
