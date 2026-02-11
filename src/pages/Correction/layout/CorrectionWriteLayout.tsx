import { Outlet, useLocation, useNavigate } from "react-router-dom";

import GNB from "../../../components/Nav/GNB";
import SideMenu from "../../../components/Nav/SideMenu";
import SolidButton from "../../../components/Button/SolidButton";
import Sidebar from "../components/SideBar";

import BtnTabs from "../../../components/Tab/BtnTabs";
import WriteIcon from "../../../assets/emoji/write.svg";
import TempleteIcon from "../../../assets/emoji/template.svg";

const CorrectionWriteLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeIndex = location.pathname.startsWith("/correction/write/templete") ? 1 : 0;

  return (
    <div className="min-h-screen">
      {/* 1. GNB */}
      <div className="w-full max-w-[1920px] mx-auto">
        <GNB variant="home" />
      </div>

      {/* 2. 좌측 아이콘바 + 컨텐츠 */}
      <div className="flex w-full max-w-[1920px] mx-auto">
        <SideMenu variant="small" />

        {/* 컨텐츠 영역 */}
        <div className="flex-1 px-[1.75rem] py-[1.875rem] bg-[#F8FAFC]">
          {/* 탭 영역 */}
          <div className="flex items-center p-4 h-[72px] w-full rounded-t-[0.75rem] border border-[#E5E7EB] border-b-0 bg-white">
            <BtnTabs
              btnTabs={["Write", "Template"]}
              iconSrcs={[WriteIcon, TempleteIcon]}
              defaultIndex={activeIndex}
              onChange={(index) => {
                if (index === 0) navigate("/correction/write");
                else navigate("/correction/write/template");
              }}
            />
          </div>

          {/* 좌우 카드 영역 */}
          <div className="flex">
            {/* 왼쪽 메뉴 카드 (공통) */}
            <div className="w-[200px] flex-shrink-0 px-[1.25rem] py-9 bg-white border border-r-0 border-[#E5E7EB]">
              <SolidButton size="large" className="w-full mb-8" label="새 글 작성하기" onClick={() => navigate("/correction/write")} />
              <Sidebar locale="ko" />
            </div>

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorrectionWriteLayout;
