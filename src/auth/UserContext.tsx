import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { instance } from "../apis/axios";

type Me = {
  userId: number;
  nativeLang: string; // "en" | "kr" ...
  learningLang: string;
  nickname: string;
};

type UserState = {
  me: Me | null;
  loading: boolean;
  isEnglishNative: boolean;
  refetch: () => Promise<void>;
};

const Ctx = createContext<UserState | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);

  const refetch = async () => {
    setLoading(true);
    try {
      const { data } = await instance.get("/api/users/me");
      setMe(data.result);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  const isEnglishNative = useMemo(() => me?.nativeLang === "en", [me]);

  return <Ctx.Provider value={{ me, loading, isEnglishNative, refetch }}>{children}</Ctx.Provider>;
}

export function useUser() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useUser must be used within UserProvider");
  return v;
}
