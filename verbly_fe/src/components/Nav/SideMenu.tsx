import { useState } from "react";
import { GradientButton } from "../Button";
import SideMenu_Tab from "./SideMenu_Tab";

export default function SideMenu({ variant = "default" }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const renderIcon = (src: string) => (
    <img src={src} className="w-full h-full" />
  );

  const menus = [
    {
      label: "Home",
      icon: "../../src/assets/emoji/home.svg",
    },
    {
      label: "Library",
      icon: "../../src/assets/emoji/folder.svg",
    },
    {
      label: "Correction",
      icon: "../../src/assets/emoji/edit.svg",
    },
    {
      label: "Inbox",
      icon: "../../src/assets/emoji/message1.svg",
    },
    {
      label: "Profile",
      icon: "../../src/assets/emoji/person.svg",
    },
  ];

  switch (variant) {
    case "default":
      return (
        <div className="w-[300px] min-h-screen px-[40px] py-[50px] flex flex-col gap-[28px] bg-white">
          {menus.map((menu, index) => (
            <SideMenu_Tab
              key={menu.label}
              label={menu.label}
              isSelected={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
              icon={renderIcon(menu.icon)}
            />
          ))}

          <GradientButton>Write Post!</GradientButton>
        </div>
      );
    case "small":
      return (
        <div className="w-[96px] min-h-screen px-[20px] py-[50px] flex flex-col gap-[28px]">
          {menus.map((menu, index) => (
            <div
              key={menu.label}
              onClick={() => setSelectedIndex(index)}
              className={`w-[56px] h-[56px] px-[16px] py-[16px]
              flex items-center justify-center
              rounded-[12px] cursor-pointer
              ${selectedIndex === index ? "bg-violet-100 border border-violet-50" : "bg-transparent"}
            `}
            >
              {renderIcon(menu.icon)}
            </div>
          ))}
        </div>
      );
  }
}
