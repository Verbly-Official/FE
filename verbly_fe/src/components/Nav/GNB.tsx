import Logo from "../Logo/Logo";

export default function GNB({ variant = "default" }) {
  const isActive = false;
  switch (variant) {
    case "default":
      return (
        <div className="relative flex justify-center items-center w-[1920px] h-[60px] bg-white px-[40px] py-[8px]">
          <Logo variant="hori" />
          <div
            className={`absolute right-[40px] w-[44px] h-[44px] rounded-[24px] px-[3px] py-[3px] flex items-center justify-center ${
              isActive ? "bg-violet-100" : ""
            }`}
          >
            <img src="../../src/assets/bell-off.svg" alt="bell" />
          </div>
        </div>
      );
    case "home":
      return (
        <div className="flex items-center justify-between w-[1920px] h-[60px] bg-white px-[40px] py-[8px]">
          <Logo variant="hori" />
          <div className="flex w-[680px] h-[40px] px-[20px] py-[8px] bg-[#FBFBFB] rounded-[20px] border-[1px] border-[#D9D9D9]">
            <div className="mr-[12px]">icon</div>
            <input
              placeholder="Search topcis, users or keywords,,,"
              className="w-[604px] text-[16px] truncate focus:outline-none"
            ></input>
          </div>
          <div
            className={`w-[44px] h-[44px] rounded-[24px] px-[3px] py-[3px] flex items-center justify-center ${
              isActive ? "bg-violet-100" : ""
            }`}
          >
            <img src="../../src/assets/bell-off.svg" alt="bell" />
          </div>
        </div>
      );
  }
}
