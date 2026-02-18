import { useNavigate } from "react-router-dom";
import type { NotiItem } from "../../../types/notification";
import { formatTimeAgo } from "../../../utils/time";
import { useNotification } from "../../../contexts/NotificationContext";
import { markOneRead } from "../../../apis/notification";

interface AlarmProps {
  notification: NotiItem;
}

export default function Alarm({ notification }: AlarmProps) {
  const navigate = useNavigate();
  const { setNotis } = useNotification();

  const handleClick = async () => {
    if (!notification.isRead) {
      try {
        await markOneRead(notification.notificationId);

        setNotis((prev) =>
          prev.map((n) =>
            n.notificationId === notification.notificationId
              ? { ...n, isRead: true }
              : n,
          ),
        );
      } catch (err) {
        console.error("읽음 처리 실패", err);
      }
    }

    if (notification.url) {
      navigate(notification.url);
    }
  };

  return (
    <div
      className={`flex flex-row items-center gap-[8px] w-[369px] h-[63px] px-[8px] py-[12px] border-b-[1px] border-gray-1 transition-colors cursor-pointer ${notification.isRead ? "bg-white" : "bg-violet-110 hover:bg-violet-100"}`}
      onClick={handleClick}
    >
      <div
        className={`w-[8px] h-[8px] rounded-full ${notification.isRead ? "bg-transparent" : "bg-violet-50"}`}
      />
      <div className="flex flex-col justify-center">
        <div className="text-[length:var(--fs-subtitle2)]">
          {notification.content}
        </div>
        <div className="text-[14px] text-gray-5 font-medium">
          {formatTimeAgo(notification.createdAt)}
        </div>
      </div>
    </div>
  );
}
