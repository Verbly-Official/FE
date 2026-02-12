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
        <div className="w-[300px] min-h-screen px-[40px] py-[50px] flex flex-col gap-[28px] bg-white">
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

          <GradientButton
            onClick={onWriteClick}
            className="w-full whitespace-nowrap"
          >
            Write Post!
          </GradientButton>
        </div>
      );
    case "small":
      return (
        <div className="w-[96px] min-h-screen px-[20px] py-[50px] flex flex-col gap-[28px]">
          {menus.map((menu) => (
            <div
              key={menu.label}
              onClick={() => {
                navigate(menu.path);
              }}
              className={`w-[56px] h-[56px] px-[16px] py-[16px]
              flex items-center justify-center
              rounded-[12px] cursor-pointer
              ${
                location.pathname === menu.path
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
        <div className="w-[300px] min-h-screen px-[40px] py-[50px] flex flex-col gap-[28px] bg-white">
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
