import { Outlet, useNavigate } from "react-router-dom";
import SolidButton from "../../../components/Button/SolidButton";
import Sidebar from "../components/SideBar";

export default function CorrectionKoLayout() {
  const navigate = useNavigate();

  return (
    <>
      {/* 왼쪽 메뉴 카드 */}
      <div className="w-[210px] flex-shrink-0 px-[1.25rem] py-9 bg-white border border-r-0 border-[#E5E7EB]">
        <SolidButton size="large" className="w-full mb-8" label="새 글 작성하기" onClick={() => navigate("/correction/write")} />

        <Sidebar
          locale="ko"
          onChangeActive={(key) => {
            if (key === "drafts") navigate("/correction/draft");
            else navigate("/correction");
          }}
        />
      </div>

      {/* 오른쪽 콘텐츠 */}
      <Outlet />
    </>
  );
}
