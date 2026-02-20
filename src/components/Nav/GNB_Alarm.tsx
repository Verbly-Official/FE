import { useNavigate } from "react-router-dom";
import Alarm from "./components/Alarm";
import CheckIcon from "../../assets/emoji/check-purple.svg";
import { useNotification } from "../../contexts/NotificationContext";
import { TextButton } from "../Button";
import { markAllRead } from "../../apis/notification";

export default function GNB_Alarm() {
  const { notis, setNotis } = useNotification();
  const navigate = useNavigate();

  const sortedNotis = [...notis].sort(
    (a, b) =>
      Number(a.isRead) - Number(b.isRead) ||
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="flex flex-col w-[369px] h-[344px] bg-white py-[20px] rounded-[12px] shadow-[0_4px_8px_0_rgba(0,0,0,0.08)]">
      {/* 상단 헤더 */}
      <div className="flex flex-row justify-center items-center h-[28px] p-[14.5px]  gap-[92px]">
        <span className=" text-[24px] font-bold">Notification</span>
        <TextButton
          icon="leading"
          size="medium"
          iconSrc={CheckIcon}
          onClick={async () => {
            await markAllRead(0, 20);
            setNotis((prev) => prev.map((noti) => ({ ...noti, isRead: true })));
          }}
          className="whitespace-nowrap"
        >
          Mark all read
        </TextButton>
      </div>

      <div className="flex-1 overflow-y-auto overflow-hidden mt-[12px]">
        {sortedNotis.slice(0, 5).map((noti) => (
          <Alarm key={noti.notificationId} notification={noti} />
        ))}
      </div>

      <div className="flex justify-center">
        <TextButton
          variant="secondary"
          size="small"
          interaction="normal"
          icon="none"
          onClick={() => navigate("/home/notification")}
        >
          View all notifications
        </TextButton>
      </div>
    </div>
  );
}
