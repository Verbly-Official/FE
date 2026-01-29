import React, { useMemo, useState } from "react";
import SideMenu_Tab from "../../components/Nav/SideMenu_Tab";
import DocIcon from "../../assets/emoji/file.svg?react";
import StarIcon from "../../assets/emoji/star-false.svg?react";
import RecentIcon from "../../assets/emoji/reload.svg?react";
import FolderIcon from "../../assets/emoji/folder.svg?react";

type MenuKey = "all" | "favorites" | "recent" | "drafts" | "templates";
type Locale = "ko" | "en";

type SidebarItem = {
  key: MenuKey;
  label: string;
  icon: React.ReactNode;
};

type SidebarSection = {
  title: string;
  items: SidebarItem[];
};

type SidebarProps = {
  locale: Locale;
  defaultActive?: MenuKey;
  onChangeActive?: (key: MenuKey) => void;
};

const SIDEBAR_CONTENT: Record<Locale, SidebarSection[]> = {
  ko: [
    {
      title: "내 문서",
      items: [
        { key: "all", label: "전체", icon: <DocIcon className="w-4 h-[20px]" /> },
        { key: "favorites", label: "즐겨찾기", icon: <StarIcon className="w-4 h-[20px]" /> },
        { key: "recent", label: "최근", icon: <RecentIcon className="w-4 h-[20px]" /> },
      ],
    },
    {
      title: "내 폴더",
      items: [
        { key: "drafts", label: "임시저장", icon: <FolderIcon className="w-4 h-[20px]" /> },
        { key: "templates", label: "템플릿", icon: <FolderIcon className="w-4 h-[20px]" /> },
      ],
    },
  ],
  en: [
    {
      title: "My correction",
      items: [
        { key: "all", label: "All", icon: <DocIcon className="w-4 h-[20px]" /> },
        { key: "favorites", label: "Favorites", icon: <StarIcon className="w-4 h-[20px]" /> },
        { key: "recent", label: "Recent", icon: <RecentIcon className="w-4 h-[20px]" /> },
      ],
    },
  ],
};

export default function Sidebar({ locale, defaultActive = "all", onChangeActive }: SidebarProps) {
  const [active, setActive] = useState<MenuKey>(defaultActive);

  const sections = useMemo(() => SIDEBAR_CONTENT[locale], [locale]);

  const handleClick = (key: MenuKey) => {
    setActive(key);
    onChangeActive?.(key);
  };

  return (
    <aside className="bg-white p-3">
      {sections.map((section) => (
        <div key={section.title} className="mb-6 last:mb-0">
          <p className="flex items-start text-[#9E9E9E] pb-[8px] text-[17px] font-semibold leading-[100%] font-pretendard">{section.title}</p>

          <div className="space-y-2">
            {section.items.map((item) => (
              <SideMenu_Tab key={item.key} label={item.label} isSelected={active === item.key} onClick={() => handleClick(item.key)} icon={item.icon} />
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
