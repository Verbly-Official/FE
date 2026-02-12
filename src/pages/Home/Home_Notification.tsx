import { IconButton } from "../../components/Button";
import CheckIcon from "../../assets/emoji/check-purple.svg";
import CloseIcon from "../../assets/emoji/close.svg";
import GNB from "../../components/Nav/GNB";
import SideMenu from "../../components/Nav/SideMenu";

export default function Home_Notification() {
  return (
    <>
      <div className="min-h-screen">
        {/*GNB*/}
        <GNB variant="home" />
        <div className="w-full min-h-screen bg-bg0 flex flex-row gap-[38px] pr-[220px]">
          {/* SideMenu */}
          <SideMenu />
          {/* Notification */}
          <div className="w-full min-h-screen bg-white mt-[32px] rounded-[12px] flex flex-col px-[59px] py-[60px] gap-[48px] ">
            <div className="text-[40px] font-bold">Notification</div>
            {/* Section */}
            <div className="w-full flex flex-col gap-[12px]">
              <div className="flex flex-row gap-[8px] p-[4px] cursor-pointer">
                <img src={CheckIcon} className="w-[24px] h-[24px]" />
                <div className="font-semibold text-violet-50 text-[length:var(--fs-subtitle1)]">
                  Mark All read
                </div>
              </div>

              {/* Alarms */}
              <div className="flex flex-col gap-[8px]">
                {/* Content */}
                <div className="w-full flex flex-row justify-between items-center gap-[857px] w-full h-[125px] p-[20px] rounded-[12px] bg-violet-110 cursor-pointer">
                  <div className="flex flex-row gap-[20px]">
                    <div className="w-[85px] h-[85px] rounded-[171px] bg-gray-10" />
                    <div className="flex flex-col gap-[3px] py-[18px]">
                      <div className="text-[length:var(--fs-title2)] font-semibold">
                        Contents
                      </div>
                      <div className="text-[length:var(--fs-subtitle2)] font-normal leading-[24px] text-gray-5">
                        10min
                      </div>
                    </div>
                  </div>
                  {/* IconButtons */}
                  <div className="flex flex-row gap-[28px]">
                    <IconButton iconSrc={CheckIcon} ariaLabel="checkEmoji" />
                    <IconButton iconSrc={CloseIcon} ariaLabel="close" />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full flex flex-row justify-between items-center gap-[857px] w-full h-[125px] p-[20px] rounded-[12px] bg-violet-110 cursor-pointer">
                  <div className="flex flex-row gap-[20px]">
                    <div className="w-[85px] h-[85px] rounded-[171px] bg-gray-10" />
                    <div className="flex flex-col gap-[3px] py-[18px]">
                      <div className="text-[length:var(--fs-title1)] font-semibold">
                        Contents
                      </div>
                      <div className="text-[length:var(--fs-subtitle2)] font-normal leading-[24px] text-gray-5">
                        10min
                      </div>
                    </div>
                  </div>
                  {/* IconButtons */}
                  <div className="flex flex-row gap-[28px]">
                    <IconButton iconSrc={CheckIcon} ariaLabel="checkEmoji" />
                    <IconButton iconSrc={CloseIcon} ariaLabel="close" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
