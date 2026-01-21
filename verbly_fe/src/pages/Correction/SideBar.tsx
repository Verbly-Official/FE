import React, { useState } from "react";
import { IconButton } from "../../components/Button";
import { TextButton } from "../../components/Button/TextButton";

import DocIcon from "../../assets/emoji/file.svg";
import StarIcon from "../../assets/emoji/star-false.svg";
import RecentIcon from "../../assets/emoji/reload.svg";
import FolderIcon from "../../assets/emoji/folder.svg";

type MenuKey = "all" | "favorites" | "recent" | "drafts" | "templates";

function SidebarItem({ label, iconSrc, active, onClick }: { label: string; iconSrc: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left",
        "transition-colors",
        active ? "bg-[#F1ECFC] border border-[#B79CFF] text-[#6D28D9]" : "border border-transparent text-[#1F1F1F] hover:bg-gray-50",
      ].join(" ")}
    >
      <IconButton ariaLabel={label} size="small" shape="square" iconSrc={iconSrc} className="bg-transparent hover:bg-transparent active:bg-transparent shadow-none" />
      <span className="text-[16px] font-semibold">{label}</span>
    </button>
  );
}

export default function Sidebar() {
  const [active, setActive] = useState<MenuKey>("all");

  return (
    <aside className="w-[240px] bg-white ">
      <div className="mb-6">
        <p className="flex items-start text-[#9E9E9E] pb-[8px] text-[17px] font-semibold leading-[100%] font-pretendard">내 문서</p>
        <div className="space-y-2">
          <SidebarItem label="모든 문서" iconSrc={DocIcon} active={active === "all"} onClick={() => setActive("all")} />
          <SidebarItem label="즐겨찾기" iconSrc={StarIcon} active={active === "favorites"} onClick={() => setActive("favorites")} />
          <SidebarItem label="최근 항목" iconSrc={RecentIcon} active={active === "recent"} onClick={() => setActive("recent")} />
        </div>
      </div>

      <div>
        <p className="flex items-start text-[#9E9E9E] pb-[8px] text-[17px] font-semibold leading-[100%] font-pretendard">내 폴더</p>
        <div className="space-y-2">
          <SidebarItem label="임시 저장" iconSrc={FolderIcon} active={active === "drafts"} onClick={() => setActive("drafts")} />
          <SidebarItem label="템플릿" iconSrc={FolderIcon} active={active === "templates"} onClick={() => setActive("templates")} />
        </div>
      </div>
    </aside>
  );
}
