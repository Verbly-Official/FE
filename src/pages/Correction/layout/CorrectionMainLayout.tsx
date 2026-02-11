import { Outlet, useLocation } from "react-router-dom";
import GNB from "../../../components/Nav/GNB";
import SideMenu from "../../../components/Nav/SideMenu";

export default function CorrectionMainLayout() {
  const { pathname } = useLocation();

  const isNativeList = pathname.startsWith("/correction/native/list");

  return (
    <div className="min-h-screen">
      <div className="w-full max-w-[1920px] mx-auto">
        <GNB variant="home" />
      </div>

      <div className="flex w-full max-w-[1920px] mx-auto">
        <SideMenu variant="small" />

        <div className={`flex-1 bg-[#F8FAFC] ${isNativeList ? "" : "px-[1.75rem] py-[1.875rem]"}`}>
          <div className="flex">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
