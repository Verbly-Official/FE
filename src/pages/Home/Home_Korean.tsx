import { useEffect, useState } from "react";
import Home_WriteModal from "../../components/Home/Home_WriteModal.tsx";
import GNB from "../../components/Nav/GNB";
import SideMenu from "../../components/Nav/SideMenu";
import TrendingTag from "../../components/TrendingTag/TrendingTag";
import { UserStatsCard } from "../../components/ProfileCard/UserStatsCard.tsx";

import Home_Section from "./components/Home_Section.tsx";

import { getViewerInfo } from "../../apis/home.ts";
import type { ViewerInfo } from "../../types/home.ts";

export default function Home_Korean() {
  const [modalOpen, setModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [viewer, setViewer] = useState<ViewerInfo | null>(null);

  useEffect(() => {
    const fetchViewer = async () => {
      try {
        const data = await getViewerInfo();
        setViewer(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchViewer();
  }, []);

  return (
    <div className="h-screen overflow-hidden">
      {/*GNB*/}
      <div className="w-screen">
        <GNB variant="home" />
      </div>

      <div className="w-full flex flex-row justify-between h-[calc(100vh-60px)]">
        {/* 사이드메뉴 - 모달 열려도 가려지지 않음 */}
        <SideMenu onWriteClick={() => setModalOpen(true)} />

        {/* 오버레이 가능 영역 */}
        <div className={"w-full h-full bg-bg0 z-10 relative"}>
          <div className="flex w-full h-full">
            {/* 홈 내용 */}
            <div className="flex-1 overflow-y-auto no-scrollbar mx-[38px] mt-[32px]">
              <Home_Section
                variant="kr"
                refreshKey={refreshKey}
                viewer={viewer}
              />
            </div>
            {/* 사이드 */}
            <div className="mt-[32px] mr-[40px] flex flex-col gap-[32px]">
              <UserStatsCard
                userData={{
                  id: "viewer",
                  name: viewer?.nickname ?? "",
                  level: viewer?.level
                    ? parseInt(viewer.level.replace("LV", ""))
                    : 1,
                  profileImg: viewer?.imageUrl ?? "",
                  introduction: "",
                  role: "KOREAN",
                }}
                stats={{
                  follow: viewer?.following ?? 0,
                  streak: viewer?.streak ?? 0,
                  point: viewer?.point ?? 0,
                  correctionReceived: viewer?.correctionReceived ?? 0,
                }}
              />
              <TrendingTag />
            </div>
          </div>

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
                  onPostCreated={() => {
                    setRefreshKey((prev) => prev + 1);
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
