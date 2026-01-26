import { useState } from "react";
import Logo from "../Logo/Logo";
import { SearchBar } from "../SearchBar/SearchBar";
import GNB_Alarm from "./GNB_Alarm";

export default function GNB({ variant = "default" }) {
  const [isActive, setActive] = useState<boolean>(true);
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div className="w-full h-[60px] bg-white px-[40px] py-[8px] shadow-[0_4px_8px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between h-full">
        <div className="flex-none">
          <Logo variant="hori" />
        </div>

        {variant === "default" ? (
          <div className="flex-1" />
        ) : (
          <div className="flex-1 max-w-[50%]">
            <SearchBar
              shape="round"
              className="w-full"
              placeholder="Search topcis, users or keywords,,,"
            />
          </div>
        )}
        <div>
          <div
            className="flex-none cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            <div
              className={`w-[44px] h-[44px] rounded-[24px] px-[3px] py-[3px] flex relative items-center justify-center ${
                isActive ? "bg-violet-90" : ""
              }`}
            >
              <img src="../../src/assets/emoji/bell-on.svg" alt="bell" />
              <div
                className={`w-[8px] h-[8px] absolute right-[10px] top-[10px] rounded-[12px] ${
                  isActive ? "bg-violet-50" : "bg-transparent"
                }`}
              />
            </div>
          </div>
          {isOpen && (
            <div className="absolute right-[40px] top-[68px] z-50">
              <GNB_Alarm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
