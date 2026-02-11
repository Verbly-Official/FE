import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar";

export default function CorrectionNativeLayout() {
  return (
    <>
      <div className="w-[210px] flex-shrink-0 px-[1.25rem] py-9 bg-white border border-r-0 border-[#E5E7EB]">
        <Sidebar locale="en" />
      </div>

      <Outlet />
    </>
  );
}
