import { createContext, useContext, useEffect, useState } from "react";
import { getNoti } from "../apis/notification";
import type { NotiItem } from "../types/notification";

interface NotificationContextType {
  notis: NotiItem[];
  setNotis: React.Dispatch<React.SetStateAction<NotiItem[]>>;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notis, setNotis] = useState<NotiItem[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getNoti(0, 20);
        setNotis(data);
      } catch (err) {
        console.error("알림 불러오기 실패", err);
      }
    };

    fetch();
  }, []);

  const unreadCount = notis.filter((n) => !n.isRead).length;

  return (
    <NotificationContext.Provider value={{ notis, setNotis, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error("useNotification must be used inside NotificationProvider");
  return context;
};
