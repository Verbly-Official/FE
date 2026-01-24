import React, { useState } from "react";
import GNB from "../../components/Nav/GNB";
import SideMenu from "../../components/Nav/SideMenu";
import SolidButton from "../../components/Button/SolidButton";
import Tab from "../../components/Tab/Tab";
import BtnTab_C from "./BtnTab_c";
import Sidebar from "./SideBar";
import DocumentTable from "./DocumentTable";
import File from "../../assets/emoji/file.svg?react";
import { Pagination } from "../../components/Pagination/Pagination";
import plusSrc from "../../assets/emoji/plus.svg";
import { useNavigate } from "react-router-dom";

const Correction_Main = () => {
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = ["All", "Completed", "In Progress", "Pending"];

  const handleNewPost = () => {
    navigate("/correction/write");
  };

  return (
    <div className="min-h-screen">
      {/* 1. GNB */}
      <div className="w-full max-w-[1920px] mx-auto">
        <GNB variant="home" />
      </div>

      {/* 2. 좌측 아이콘바 + 컨텐츠 */}
      <div className="flex w-full max-w-[1920px] mx-auto">
        {/* 가장 왼쪽 사이드바(컴포넌트) */}
        <SideMenu variant="small" />

        {/* 컨텐츠 영역 */}
        <div className="flex-1 min-w-0 px-[28px] py-[30px] bg-[#F8FAFC]">
          <div className="flex min-w-0">
            {/* 왼쪽 메뉴 카드 (고정폭 유지) */}
            <div className="w-[250px] h-[940px] px-[20px] py-9 bg-white rounded-l-[12px] border border-r-0 border-[#E5E7EB] flex-shrink-0">
              <SolidButton size="large" className="w-full mb-8" iconSrc={plusSrc} label="새 글 작성하기" onClick={handleNewPost} />
              <Sidebar />
            </div>

            {/* 메인 카드 */}
            <div
              className="
                flex-1 min-w-0
                py-9
                min-h-[940px]
                rounded-r-[12px]
                border border-[#E5E7EB]
                bg-[#FBFBFB]
                items-center
                px-[clamp(48px,6vw,122px)]
              "
            >
              <div className="flex px-6 py-9 items-center gap-[20px] rounded-[12px] border border-[#D9D9D9] bg-white">
                <div
                  className="flex items-center gap-[10px] p-2 rounded-[8px] bg-[var(--Point-Blue-90,#E0EBFF)]
"
                >
                  <File className="w-[26.667px] h-[33.333px] text-[#353535] " />
                </div>

                <div>
                  <div className="flex items-start text-[#9E9E9E] text-[17px] font-semibold leading-[100%] font-pretendard">Total Request</div>
                  <div className="text-[#353535] font-pretendard text-4xl font-bold leading-none">24</div>
                </div>
              </div>

              <div className="flex mt-8 overflow-x-auto whitespace-nowrap">
                {tabs.map((label, index) => (
                  <Tab key={index} label={label} isSelected={index === selectedTab} onClick={() => setSelectedTab(index)} />
                ))}
                <span className="w-full border-b border-[var(--Strok-line2,#ADADAD)]" />
              </div>

              <div className="pt-7 pb-3">
                <BtnTab_C />
              </div>

              <div className="w-full overflow-x-auto">
                <div className="min-w-[900px]">
                  <DocumentTable />
                </div>
              </div>

              <Pagination currentPage={page} totalPages={10} onChange={setPage} shape="num" className="flex items-center justify-center pt-[8px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Correction_Main;
