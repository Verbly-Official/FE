import Logo from "../Logo/Logo";
import SearchIcon from "../../assets/emoji/search-gray.svg";

export default function GNB({ variant = "default" }) {
  const isActive = true;
  switch (variant) {
    case "default":
      return (
        <div className="relative flex justify-center items-center w-full h-[60px] bg-white px-[40px] py-[8px]">
          <Logo variant="hori" />
          <div
            className={`absolute right-[40px] w-[44px] h-[44px] rounded-[24px] px-[3px] py-[3px] flex items-center justify-center ${
              isActive ? "bg-violet-100" : ""
            }`}
          >
            <div
              className={`relative w-[44px] h-[44px] rounded-[24px] px-[3px] py-[3px] flex items-center justify-center ${
                isActive ? "bg-violet-90" : ""
              }`}
            >
              <img src="../../src/assets/emoji/bell-on.svg" alt="bell" />
              <div
                className={`w-[8px] h-[8px] absolute right-[10px] top-[9px] rounded-[12px] ${
                  isActive ? "bg-violet-50" : "bg-transparent"
                }`}
              />
            </div>
          </div>
        </div>
      );
    case "home":
      return (
        <div className="flex items-center justify-between w-full h-[60px] bg-white px-[40px] py-[8px]">
          <Logo variant="hori" />
          <div className="flex w-[680px] h-[40px] px-[20px] py-[8px] bg-bg1 rounded-[20px] border-[1px] border-line1">
            <img
              src={SearchIcon}
              className="mr-[12px] w-[24px] h-[24px] fill-gray-4"
            />
            <input
              placeholder="Search topcis, users or keywords,,,"
              className="w-[604px] text-[16px] truncate focus:outline-none placeholder-gray-4"
            ></input>
          </div>
          <div
            className={`relative w-[44px] h-[44px] rounded-[24px] px-[3px] py-[3px] flex items-center justify-center ${
              isActive ? "bg-violet-90" : ""
            }`}
          >
            <img src="../../src/assets/emoji/bell-on.svg" alt="bell" />
            <div
              className={`w-[8px] h-[8px] absolute right-[13px] top-[9px] rounded-[12px] ${
                isActive ? "bg-violet-50" : "bg-transparent"
              }`}
            />
          </div>
        </div>
      );
  }
}
