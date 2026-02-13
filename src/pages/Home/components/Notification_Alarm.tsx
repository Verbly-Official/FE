import { IconButton } from "../../../components/Button";
import CheckIcon from "../../../assets/emoji/check-purple.svg";
import CloseIcon from "../../../assets/emoji/close.svg";
import ProfileImg from "../../../components/Profile/img/medium.svg";
import type { NotiItem } from "../../../types/notification";

interface NotificationAlarmProps {
  notification: NotiItem;
  onRead?: () => void;
}

export default function Notification_Alarm({
  notification,
  onRead,
}: NotificationAlarmProps) {
  return (
    <div className="w-full flex flex-row justify-between items-center w-full h-[125px] p-[20px] rounded-[12px] bg-violet-110 cursor-pointer">
      <div className="flex flex-row items-center gap-[20px]">
        <img src={ProfileImg} className="w-[85px] h-[85px] rounded-[171px]" />
        <div className="flex flex-col gap-[3px] py-[18px]">
          <div className="text-[length:var(--fs-title2)] font-semibold">
            {notification.content}
          </div>
          <div className="text-[length:var(--fs-subtitle2)] font-normal leading-[24px] text-gray-5">
            {new Date(notification.createdAt).toLocaleString()}
          </div>
        </div>
      </div>
      {/* IconButtons */}
      <div className="flex flex-row gap-[28px]">
        <IconButton iconSrc={CheckIcon} ariaLabel="checkEmoji" />
        <IconButton iconSrc={CloseIcon} ariaLabel="close" />
      </div>
    </div>
  );
}
