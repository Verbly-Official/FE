import { Outlet } from "react-router-dom";
import GNB from "../../../components/Nav/GNB";
import SideMenu from "../../../components/Nav/SideMenu";

export default function CorrectionMainLayout() {
  return (
    <div className="min-h-screen">
      <div className="w-full max-w-[1920px] mx-auto">
        <GNB variant="home" />
      </div>

      <div className="flex w-full max-w-[1920px] mx-auto">
        <SideMenu variant="small" />

        <div className="flex-1 px-[1.75rem] py-[1.875rem] bg-[#F8FAFC]">
          <div className="flex">
            {/* 왼쪽 메뉴 + 오른쪽 콘텐츠를 Outlet에서 결정 */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
