import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Home_Card from "../../components/Home/Home_Card";
import Home_WriteModal from "../../components/Home/Home_WriteModal.tsx";
import GNB from "../../components/Nav/GNB";
import SideMenu from "../../components/Nav/SideMenu";
import TrendingTag from "../../components/TrendingTag/TrendingTag";
import { UserStatsCard } from "../../components/ProfileCard/UserStatsCard.tsx";
import type { PostItem } from "../../types/post.ts";
import { searchPosts } from "../../apis/post";
import type { ViewerInfo } from "../../types/home.ts";
import { getViewerInfo } from "../../apis/home.ts";

export default function Home_Search() {
  const rawKeyword = useParams<{ keyword: string }>().keyword;
  const keyword = rawKeyword ? decodeURIComponent(rawKeyword) : "";

  const [modalOpen, setModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [posts, setPosts] = useState<PostItem[]>([]);
  const [page, setPage] = useState(0);
  const [last, setLast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewer, setViewer] = useState<ViewerInfo | null>(null);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!keyword) return;

    setPosts([]);
    setPage(0);
    setLast(false);

    fetchSearchPosts(keyword, 0);
  }, [keyword]);

  const fetchSearchPosts = async (
    currentKeyword: string,
    pageNumber: number,
  ) => {
    if (!keyword || loading || last) return;

    try {
      setLoading(true);

      const data = await searchPosts(keyword, pageNumber, 10);

      setPosts((prev) =>
        pageNumber === 0 ? data.content : [...prev, ...data.content],
      );

      setLast(data.last);
      setPage(pageNumber);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFollowChange = (isFollowing: boolean) => {
    setViewer((prev) =>
      prev
        ? {
            ...prev,
            following: isFollowing ? prev.following + 1 : prev.following - 1,
          }
        : prev,
    );
  };

  const fetchViewer = async () => {
    try {
      console.log("viewer:", viewer);
      console.log("viewer.nativeLang:", viewer?.nativeLang);
      const data = await getViewerInfo();
      setViewer(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchViewer();
  }, []);

  const handlePostFollowToggle = (
    targetUserId: number,
    isFollowing: boolean,
  ) => {
    // 🔥 1. 카드들 동기화
    setPosts((prev) =>
      prev.map((p) => (p.userId === targetUserId ? { ...p, isFollowing } : p)),
    );

    // 🔥 2. viewer follow 수 업데이트
    setViewer((prev) =>
      prev
        ? {
            ...prev,
            following: isFollowing ? prev.following + 1 : prev.following - 1,
          }
        : prev,
    );
  };

  // 🔹 무한 스크롤
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !last && !loading) {
          fetchSearchPosts(keyword, page + 1);
        }
      },
      { threshold: 1 },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [page, last, loading]);

  return (
    <div className="h-screen flex flex-col bg-bg0 min-w-[1200px]">
      {/*GNB*/}
      <div className="w-screen">
        <GNB variant="home" />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:flex flex-shrink-0">
          <SideMenu variant="default" onWriteClick={() => setModalOpen(true)} />
        </div>
        {/* 오버레이 가능 영역 */}
        <div className={"w-full h-full bg-bg0 z-10 relative"}>
          <div className="flex w-full h-full">
            {/* 홈 내용 */}
            <div className="flex flex-1 overflow-y-auto no-scrollbar pl-[59px] pt-[30px] pb-[30px]">
              <div className="flex-1 flex flex-col max-w-[1200px] mx-auto bg-white w-full h-fit p-[20px] rounded-[12px] gap-[28px]">
                {/* 검색 제목 */}
                <div className="flex items-end gap-[12px]">
                  <span className="font-bold text-[40px] text-blue-60 leading-[40px]">
                    {keyword}
                  </span>
                  <span className="text-[length:var(--fs-title1)] font-semibold">
                    에 대한 결과입니다.
                  </span>
                </div>

                {/* 카드 그리드 */}
                <div className="grid gap-[20px] grid-cols-[repeat(auto-fit,minmax(360px,1fr))]">
                  {posts.map((post) => (
                    <Home_Card
                      key={post.postId}
                      varient="mini"
                      post={post}
                      isCorrected={post.status !== "PENDING"}
                      viewer={viewer}
                      onFollowToggle={(isFollowing) =>
                        handlePostFollowToggle(post.userId, isFollowing)
                      }
                    />
                  ))}
                </div>
                {/* 무한스크롤 */}
                <div ref={observerRef} className="h-[40px]" />
              </div>
              {/* 사이드 */}
              <div className="hidden lg:flex w-[280px] flex-shrink-0 mx-[40px] flex-col gap-[32px]">
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
          </div>
          {modalOpen && (
            <>
              <div
                className="w-full absolute inset-0 bg-[rgba(0,0,0,0.40)] z-20"
                onClick={() => setModalOpen(false)}
              />
              <div
                className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[956px]"
                onClick={(e) => e.stopPropagation()}
              >
                <Home_WriteModal
                  variant={viewer?.nativeLang === "en" ? "NATIVE" : "KOREAN"}
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
