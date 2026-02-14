import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../apis/axios";

export default function CorrectionRedirectPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      try {
        const { data } = await instance.get("/api/user/me");
        const nativeLang = data?.result?.nativeLang;
        console.log("nativeLang:", nativeLang);

        if (nativeLang === "en") navigate("/correction/native", { replace: true });
        else navigate("/correction/ko", { replace: true });
      } catch (e) {
        // 실패하면 기본 KO로
        navigate("/correction/ko", { replace: true });
      }
    };

    run();
  }, [navigate]);

  return null; // 로딩 UI 넣고 싶으면 여기서
}
