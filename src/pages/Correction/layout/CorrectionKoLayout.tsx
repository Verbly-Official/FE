import { Outlet, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import SolidButton from "../../../components/Button/SolidButton";
import Sidebar from "../components/SideBar";

export default function CorrectionKoLayout() {
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
    <>
      <div className="w-[210px] flex-shrink-0 px-[1.25rem] py-9 bg-white border border-r-0 border-[#E5E7EB]">
        <SolidButton size="large" className="w-full mb-8" label="새 글 작성하기" onClick={() => navigate("/correction/write")} />
        <Sidebar locale="ko" defaultActive={defaultActive} onChangeActive={handleSidebarChange} />
      </div>

      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </>
  );
}
