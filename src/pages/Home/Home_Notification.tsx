import { useEffect, useMemo, useState } from "react";
import { TextButton } from "../../components/Button";
import Notification_Alarm from "./components/Notification_Alarm";
import GNB from "../../components/Nav/GNB";
import SideMenu from "../../components/Nav/SideMenu";
import Home_WriteModal from "../../components/Home/Home_WriteModal";
import CheckIcon from "../../assets/emoji/check-purple.svg";
import { getNoti, markAllRead } from "../../apis/notification";
import type { NotiItem } from "../../types/notification";
import { useNotification } from "../../contexts/NotificationContext";

export default function Home_Notification() {
  const [modalOpen, setModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { notis, setNotis } = useNotification();

  const fetchNoti = async () => {
    try {
      const data = await getNoti(0, 20);
      setNotis(data);
    } catch (err) {
      console.error(err);
    }
  };
  //useEffect(() => {
  //  fetchNoti();
  //}, []);

  const sortedNotis = useMemo(() => {
    return [...notis].sort(
      (a, b) =>
        Number(a.isRead) - Number(b.isRead) ||
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [notis]);

  useEffect(() => {
    const eventSource = new EventSource(
      "http://3.35.202.0:8080/api/notifications/subscribe",
      { withCredentials: true },
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type !== "CONNECT") {
        setNotis((prev) => [data, ...prev]);
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE error:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="h-screen flex flex-col bg-bg0  min-w-[1200px]">
      {/*GNB*/}
      <div className="w-screen">
        <GNB variant="home" />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* 사이드메뉴 - 모달 열려도 가려지지 않음 */}
        <SideMenu variant="default" onWriteClick={() => setModalOpen(true)} />

        <div className="flex-1 relative overflow-y-auto px-[38px] pt-[32px] pb-[40px] z-10">
          <div className="max-w-[1200px]">
            <div className="bg-white min-h-screen rounded-[12px] px-[59px] py-[60px] flex flex-col gap-[48px]">
              <div className="text-[40px] font-bold">Notification</div>
              {/* Section */}
              <div className="w-full flex flex-col gap-[12px]">
                <div className="flex">
                  <TextButton
                    icon="leading"
                    iconSrc={CheckIcon}
                    className="justify-start"
                    onClick={async () => {
                      await markAllRead(0, 20);
                      setNotis((prev) =>
                        prev.map((noti) => ({ ...noti, isRead: true })),
                      );
                    }}
                  >
                    Mark all read
                  </TextButton>
                </div>
                {/* Alarms */}
                <div className="flex flex-col gap-[8px] transition-all duration-300">
                  {sortedNotis.map((noti) => (
                    <Notification_Alarm
                      key={noti.notificationId}
                      notification={noti}
                      onRead={() =>
                        setNotis((prev) =>
                          prev.map((item) =>
                            item.notificationId === noti.notificationId
                              ? { ...item, isRead: true }
                              : item,
                          ),
                        )
                      }
                      onDelete={() =>
                        setNotis((prev) =>
                          prev.filter(
                            (item) =>
                              item.notificationId !== noti.notificationId,
                          ),
                        )
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* MODAL */}
          {modalOpen && (
            <>
              <div
                className="w-full absolute inset-0 bg-[rgba(0,0,0,0.40)] z-20"
                onClick={() => setModalOpen(false)}
              />
              <div
                className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                onClick={(e) => e.stopPropagation()}
              >
                <Home_WriteModal
                  variant="KOREAN"
                  onClose={() => setModalOpen(false)}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
