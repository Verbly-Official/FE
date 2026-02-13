//import { useState } from "react";
import { GradientButton } from "../Button";
import SideMenu_Tab from "./SideMenu_Tab";
import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "../../assets/emoji/home.svg";
import LibraryIcon from "../../assets/emoji/folder.svg";
import CorrectionIcon from "../../assets/emoji/edit.svg";
import InboxIcon from "../../assets/emoji/message1.svg";
import ProfileIcon from "../../assets/emoji/person.svg";

interface SideMenuProps {
  variant?: "default" | "small" | "profile";
  onWriteClick?: () => void;
}

export default function SideMenu({
  variant = "default",
  onWriteClick,
}: SideMenuProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const renderIcon = (src: string) => (
    <img src={src} className="w-full h-full" />
  );

  const menus = [
    {
      label: "Home",
      icon: HomeIcon,
      path: "/home/korean",
    },
    {
      label: "Library",
      icon: LibraryIcon,
      path: "/library",
    },
    {
      label: "Correction",
      icon: CorrectionIcon,
      path: "/correction",
    },
    {
      label: "Inbox",
      icon: InboxIcon,
      path: "/inbox",
    },
    {
      label: "Profile",
      icon: ProfileIcon,
      path: "/my/korean",
    },
  ];

  switch (variant) {
    case "default":
      return (
        <div className="w-60 min-h-screen px-10 py-12 flex flex-col gap-7 bg-white">
          {menus.map((menu) => (
            <SideMenu_Tab
              key={menu.label}
              label={menu.label}
              isSelected={location.pathname.startsWith(menu.path)}
              onClick={() => {
                navigate(menu.path);
              }}
              icon={renderIcon(menu.icon)}
            />
          ))}

          <GradientButton
            size="medium"
            onClick={onWriteClick}
            className="w-full whitespace-nowrap"
          >
            Write Post!
          </GradientButton>
        </div>
      );
    case "small":
      return (
        <div className="w-24 min-h-screen px-5 py-12 flex flex-col gap-7">
          {menus.map((menu) => (
            <div
              key={menu.label}
              onClick={() => {
                navigate(menu.path);
              }}
              className={`w-14 h-14 px-4 py-4
              flex items-center justify-center
              rounded-xl cursor-pointer
              ${
                location.pathname.startsWith(menu.path)
                  ? "bg-violet-100 border border-violet-50"
                  : "bg-transparent"
              }
            `}
            >
              {renderIcon(menu.icon)}
            </div>
          ))}
        </div>
      );
    case "profile":
      return (
        <div className="w-60 min-h-screen px-10 py-12 flex flex-col gap-7 bg-white">
          {menus.map((menu) => (
            <SideMenu_Tab
              key={menu.label}
              label={menu.label}
              isSelected={location.pathname === menu.path}
              onClick={() => {
                navigate(menu.path);
              }}
              icon={renderIcon(menu.icon)}
            />
          ))}
        </div>
      );
  }
}
