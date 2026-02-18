import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import Sidebar from "../components/SideBar";

export default function CorrectionNativeLayout() {
  const { pathname } = useLocation();
  const isListPage = pathname.includes("/correction/native/list");

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSidebarChange = (key: "all" | "favorites" | "recent" | "drafts" | "templates") => {
    // 기존 쿼리 유지/정리용
    const next = new URLSearchParams(searchParams);

    // 사이드바 필터는 bookmark / sort 만 담당한다고 가정
    next.delete("bookmark");
    next.delete("sort");

    if (key === "favorites") next.set("bookmark", "true");
    if (key === "recent") next.set("sort", "true");

    next.delete("page");

    setSearchParams(next);
  };

  const defaultActive = searchParams.get("bookmark") === "true" ? "favorites" : searchParams.get("sort") === "true" ? "recent" : "all";

  return (
    <>
      {!isListPage && (
        <div className="w-[210px] flex-shrink-0 px-[1.25rem] py-9 bg-white border border-r-0 border-[#E5E7EB]">
          <Sidebar locale="en" defaultActive={defaultActive} onChangeActive={handleSidebarChange} />
        </div>
      )}

      <div className="flex-1 min-w-0 min-h-0">
        <Outlet />
      </div>
    </>
  );
}
