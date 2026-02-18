// src/pages/Home/Home_Profile.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import GNB from "../../components/Nav/GNB";
import SideMenu from "../../components/Nav/SideMenu";
import TrendingTag from "../../components/TrendingTag/TrendingTag";
import { UserStatsCard } from "../../components/ProfileCard/UserStatsCard.tsx";
import MessageImg from "../../assets/emoji/mail-purple.svg?react";
import CheckIcon from "../../assets/emoji/checkbox-rounded.svg";
import { FollowButton, OutlinedButton } from "../../components/Button";
import Tabs from "../../components/Tab/Tabs";
import Home_Card from "../../components/Home/Home_Card";

import type { ViewerInfo, UuserInfo } from "../../types/home.ts";
import type { PostItem } from "../../types/post.ts";
import { getUserPosts } from "../../apis/post.ts";
import { getViewerInfo, getUuserInfo } from "../../apis/home.ts";
import { createOrEnterChatroom } from "../../apis/chatrooms.ts";
import Home_WriteModal from "../../components/Home/Home_WriteModal.tsx";

export default function Home_Profile() {
  const navigate = useNavigate();
  // URL에서 가져오는 id는 UUID입니다.
  const { userId: uuidFromUrl } = useParams<{ userId: string }>();

  const [viewer, setViewer] = useState<ViewerInfo | null>(null);
  const [Uuser, setUuser] = useState<UuserInfo | null>(null);
  const [posts, setPosts] = useState<PostItem[]>([]);
  // const [page, setPage] = useState(0); // 사용하지 않는 상태라면 제거 가능
  // const [last, setLast] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // 프로필로 이동하는 함수 (UUID 사용)
  const handleNavigateToProfile = () => {
    if (uuidFromUrl) {
      navigate(`/home/profile/${uuidFromUrl}`);
    }
  };

  useEffect(() => {
    const fetchViewer = async () => {
      try {
        const data = await getViewerInfo();
        setViewer(data);
      } catch (error) {
        console.error("Viewer 정보 조회 실패:", error);
      }
    };
    fetchViewer();
  }, []);

  useEffect(() => {
    if (!uuidFromUrl) return;

    const fetchPosts = async () => {
      try {
        const data = await getUserPosts(uuidFromUrl, 0);
        setPosts(data.content);
        // setLast(data.last);
        // setPage(data.number);
      } catch (err) {
        console.error("포스트 목록 조회 실패:", err);
      }
    };

    const fetchUuser = async () => {
      try {
        const data = await getUuserInfo(uuidFromUrl);
        setUuser(data);
      } catch (err) {
        console.error("사용자 프로필 정보 조회 실패:", err);
      }
    };

    fetchPosts();
    fetchUuser();
  }, [uuidFromUrl, refreshKey]);

  return (
    <div className="h-screen flex flex-col bg-bg0 overflow-hidden min-w-[1200px]">
      {/*GNB*/}
      <div className="w-screen">
        <GNB variant="home" />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* 사이드메뉴 - 모달 열려도 가려지지 않음 */}
        <SideMenu variant="default" onWriteClick={() => setModalOpen(true)} />

        <div className="flex-1 flex flex-col overflow-hidden relative">
          <div className="flex flex-1 overflow-hidden">
            <div className={"w-full h-full bg-bg0 z-10 relative"}>
              <div className="flex w-full h-full">
                {/* 오버레이 가능 영역 */}
                <div className="flex-1 overflow-y-auto no-scrollbar px-[38px] pt-[32px] pb-[40px]">
                  <div className="max-w-[1200px] mx-auto">
                    <div className="bg-white p-[24px] rounded-[12px] no-scrollbar">
                      {/* Profile */}
                      <div className="w-full p-[20px] flex flex-row gap-[52px]">
                        <img
                          src={Uuser?.imageUrl || undefined}
                          alt="profile"
                          className="size-[180px] rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={handleNavigateToProfile}
                        />
                        <div className="flex-1 flex flex-col flex-start gap-[16px]">
                          <div className="flex gap-[4px] flex-col">
                            <div className="flex flex-row gap-[12px] items-center">
                              <div
                                className="font-bold text-[40px] leading-[40px] cursor-pointer hover:underline"
                                onClick={handleNavigateToProfile}
                              >
                                {Uuser?.nickname ?? ""}
                              </div>
                              <img
                                src={CheckIcon}
                                alt="checkIcon"
                                className="w-[48px] h-[48px] p-[3.33px]"
                              />
                            </div>
                            <div className="text-[length:var(--fs-subtitle1)] text-gray-7 font-semibold">
                              {Uuser?.nativeLang === "kr"
                                ? "Korean"
                                : "English"}
                            </div>
                          </div>
                          <div className="w-[700px] h-auto text-[length:var(--fs-subtitle2)] leading-[24px]">
                            {Uuser?.description}
                          </div>

                          <div className="flex gap-[16px]">
                            <div className="flex gap-[4px] items-center">
                              <span className="text-[length:var(--fs-subtitle1)] font-semibold">
                                {Uuser?.totalPosts ?? 0}
                              </span>
                              <span className="text-[length:var(--fs-subtitle2)] leading-[24px] text-gray-6">
                                Posts
                              </span>
                            </div>
                            <div className="flex gap-[4px] items-center">
                              <span className="text-[length:var(--fs-subtitle1)] font-semibold">
                                {Uuser?.follower ?? 0}
                              </span>
                              <span className="text-[length:var(--fs-subtitle2)] leading-[24px] text-gray-6">
                                Follower
                              </span>
                            </div>
                            <div className="flex gap-[4px] items-center">
                              <span className="text-[length:var(--fs-subtitle1)] font-semibold">
                                {Uuser?.following ?? 0}
                              </span>
                              <span className="text-[length:var(--fs-subtitle2)] leading-[24px] text-gray-6">
                                Follow
                              </span>
                            </div>
                            <div className="flex gap-[4px] items-center">
                              <span className="text-[length:var(--fs-subtitle1)] font-semibold">
                                {Uuser?.correctionGiven}
                              </span>
                              <span className="text-[length:var(--fs-subtitle2)] leading-[24px] text-gray-6">
                                Given Correct
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-row gap-[20px]">
                            {/* [수정] Fallback 제거, Uuser.userId 직접 사용 */}
                            {/* API가 userId를 주지 않으면 버튼 동작 안 함 (undefined 전달됨) */}
                            <FollowButton
                              userId={Uuser?.userId}
                              initialIsFollowing={Uuser?.isFollowing}
                              size="large"
                              className="w-[508px]"
                            />
                            <OutlinedButton
                              label="Message"
                              Icon={MessageImg}
                              size="large"
                              onClick={async () => {
                                if (Uuser?.userId) {
                                  try {
                                    const chatroomId =
                                      await createOrEnterChatroom(Uuser.userId);
                                    navigate(`/inbox/${chatroomId}`, {
                                      state: {
                                        selectedChatId: chatroomId.toString(),
                                        partner: {
                                          name: Uuser.nickname,
                                          imageUrl: Uuser.imageUrl,
                                        },
                                      },
                                    });
                                  } catch (error) {
                                    console.error(
                                      "Failed to enter chatroom:",
                                      error,
                                    );
                                  }
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Center */}
                      <div className="flex mb-[28px] justify-start gap-0 border-b-[1px] border-line2">
                        <Tabs tabs={["Posts"]} />
                      </div>
                      <section className="flex flex-col gap-[20px]">
                        {posts.map((post) => (
                          <Home_Card
                            key={post.postId}
                            varient="default"
                            isCorrected={post.status !== "PENDING"}
                            viewer={viewer}
                            post={post}
                          />
                        ))}
                      </section>
                    </div>
                  </div>
                </div>
                {/* Right Side */}
                <div className="hidden lg:flex w-[280px] flex-shrink-0 mt-[32px] mr-[40px] flex-col gap-[32px]">
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
    </div>
  );
}
