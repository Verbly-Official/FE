import { IconButton } from "../../../components/Button";
import CheckIcon from "../../../assets/emoji/check-purple.svg";
import CloseIcon from "../../../assets/emoji/close.svg";
import ProfileImg from "../../../components/Profile/img/medium.svg";
import type { NotiItem } from "../../../types/notification";
import { markOneRead } from "../../../apis/notification";
import { useNavigate } from "react-router-dom";

interface NotificationAlarmProps {
  notification: NotiItem;
  onRead?: () => void;
  onDelete?: () => void;
}

export default function Notification_Alarm({
  notification,
  onRead,
  onDelete,
}: NotificationAlarmProps) {
  const navigate = useNavigate();

  const handleCardClick = async (e: React.MouseEvent) => {
    // 버튼 클릭이면 카드 클릭 무시
    if ((e.target as HTMLElement).closest("button")) return;

    if (!notification.isRead) {
      try {
        await markOneRead(notification.notificationId);
        onRead?.();
      } catch (err) {
        console.error("읽음 처리 실패", err);
      }
    }

    if (notification.url) {
      navigate(notification.url);
    }
  };

  const handleRead = async () => {
    if (!notification.isRead) {
      await markOneRead(notification.notificationId);
      onRead?.();
    }
  };
  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <div
      className={`w-full flex flex-row justify-between items-center w-full h-[125px] p-[20px] rounded-[12px] cursor-pointer ${notification.isRead ? "bg-white opacity-70" : "bg-violet-110"}`}
      onClick={handleCardClick}
    >
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
        <IconButton
          iconSrc={CheckIcon}
          ariaLabel="mark read"
          onClick={handleRead}
        />

        <IconButton
          iconSrc={CloseIcon}
          ariaLabel="close"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}
