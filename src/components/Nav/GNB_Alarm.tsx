import { useNavigate } from "react-router-dom";
import Alarm from "./components/Alarm";
import CheckIcon from "../../assets/emoji/check-purple.svg";

export default function GNB_Alarm() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-[369px] h-[344px] bg-white py-[20px] rounded-[12px] shadow-[0_4px_8px_0_rgba(0,0,0,0.08)]">
      <div className="flex flex-row justify-center items-center h-[28px] p-[14.5px]  gap-[92px]">
        <span className=" text-[24px] font-bold">Notification</span>
        <span className="flex flex-row items-center px-[4px] gap-[4px] text-[14px] text-violet-50 font-semibold">
          <img src={CheckIcon} className="w-[20px] h-[20px]" />
          Mark all read
        </span>
      </div>
      {/* 연동하며 alarm 컴포넌트로 대체 필요 */}
      <Alarm />

      <div className="flex flex-row items-center gap-[8px] w-[369px] h-[63px] px-[8px] py-[12px] border-b-[1px] border-gray-1">
        <div className="w-[8px] h-[8px] bg-transparent rounded-[50px]" />
        <div className="flex flex-col justify-center">
          <div className="text-[16px]">David corrected your post.</div>
          <div className="text-[14px] text-gray-5">5m ago</div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-[8px] w-[369px] h-[63px] px-[8px] py-[12px] border-b-[1px] border-gray-1">
        <div className="w-[8px] h-[8px] bg-transparent rounded-[50px]" />
        <div className="flex flex-col justify-center">
          <div className="text-[16px]">Notice_System maintenance</div>
          <div className="text-[14px] text-gray-5">5m ago</div>
        </div>
      </div>
      <div
        onClick={() => navigate("/home/notification")}
        className="text-center text-[14px] text-gray-6 font-medium cursor-pointer"
      >
        View all notifications
      </div>
    </div>
  );
}
