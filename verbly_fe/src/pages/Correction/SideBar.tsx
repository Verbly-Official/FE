import React, { useState } from "react";
import { IconButton } from "../../components/Button";
import { TextButton } from "../../components/Button/TextButton";
import SideMenu_Tab from "../../components/Nav/SideMenu_Tab";
import DocIcon from "../../assets/emoji/file.svg";
import StarIcon from "../../assets/emoji/star-false.svg";
import RecentIcon from "../../assets/emoji/reload.svg";
import FolderIcon from "../../assets/emoji/folder.svg";

type MenuKey = "all" | "favorites" | "recent" | "drafts" | "templates";

export default function Sidebar() {
  const [active, setActive] = useState<MenuKey>("all");

  return (
    <aside className="w-[240px] bg-white">
      <div className="mb-6">
        <p className="flex items-start text-[#9E9E9E] pb-[8px] text-[17px] font-semibold leading-[100%] font-pretendard">내 문서</p>
        <div className="space-y-2">
          <SideMenu_Tab label="전체" isSelected={active === "all"} onClick={() => setActive("all")}></SideMenu_Tab>
          <SideMenu_Tab label="즐겨찾기" isSelected={active === "favorites"} onClick={() => setActive("favorites")} />
          <SideMenu_Tab label="최근" isSelected={active === "recent"} onClick={() => setActive("recent")} />
        </div>
      </div>

      <div>
        <p className="flex items-start text-[#9E9E9E] pb-[8px] text-[17px] font-semibold leading-[100%] font-pretendard">내 폴더</p>
        <div className="space-y-2">
          <SideMenu_Tab label="임시저장" isSelected={active === "drafts"} onClick={() => setActive("drafts")} />
          <SideMenu_Tab label="템플릿" isSelected={active === "templates"} onClick={() => setActive("templates")} />
        </div>
      </div>
    </aside>
  );
}
