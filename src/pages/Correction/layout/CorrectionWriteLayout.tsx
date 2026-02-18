import { Outlet, useNavigate, useSearchParams, useLocation } from "react-router-dom";

import GNB from "../../../components/Nav/GNB";
import SideMenu from "../../../components/Nav/SideMenu";
import SolidButton from "../../../components/Button/SolidButton";
import Sidebar from "../components/SideBar";

const CorrectionWriteLayout = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  const handleSidebarChange = (key: "all" | "favorites" | "recent" | "drafts" | "templates") => {
    // drafts는 별도 페이지로
    if (key === "drafts") {
      navigate("/correction/draft");
      return;
    }

    // ko 메인으로 유지
    if (pathname !== "/correction/ko") navigate("/correction/ko");

    const next = new URLSearchParams(searchParams);

    // 기존 필터 제거
    next.delete("bookmark");
    next.delete("sort");
    next.delete("page"); // 필터 바뀌면 페이지 리셋(선택)

    if (key === "favorites") next.set("bookmark", "true");
    if (key === "recent") next.set("sort", "true");
    // all이면 아무것도 안 넣음

    setSearchParams(next);
  };

  const defaultActive = searchParams.get("bookmark") === "true" ? "favorites" : searchParams.get("sort") === "true" ? "recent" : "all";

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
          {/* 좌우 카드 영역 */}
          <div className="flex">
            {/* 왼쪽 메뉴 카드 (공통) */}
            <div className="w-[210px] flex-shrink-0 px-[1.25rem] py-9 bg-white border border-r-0 border-[#E5E7EB]">
              <SolidButton size="large" className="w-full mb-8" label="새 글 작성하기" onClick={() => navigate("/correction/write")} />
              <Sidebar locale="ko" defaultActive={defaultActive} onChangeActive={handleSidebarChange} />
            </div>

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorrectionWriteLayout;
