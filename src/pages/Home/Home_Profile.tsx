// src/pages/Home/Home_Profile.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createOrEnterChatroom } from "../../apis/chatrooms";

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
import Home_WriteModal from "../../components/Home/Home_WriteModal.tsx";

export default function Home_Profile() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

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
      navigate(`/profile/${uuidFromUrl}`);
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
      const data = await getUuserInfo(userId);
      console.log("Uuser data:", data); // ID 확인용 로그
      setUuser(data);
    };

    fetchPosts();
    fetchUuser();
  }, [uuidFromUrl, refreshKey]);


  const handleMessage = async () => {
    // 1. 백엔드에서 userId(숫자)를 주기로 했으므로 Uuser 객체에서 확인
    const targetUserId = Uuser?.userId;

    if (!targetUserId) {
      console.error("Chat creation failed: 'userId' (numeric) is missing in User Profile data.");
      alert("Cannot start chat: Missing User ID. Please verify backend API update.");
      return;
    }

    try {
      const chatroomId = await createOrEnterChatroom(targetUserId);
      navigate(`/inbox/${chatroomId}`);
    } catch (error) {
      console.error("Failed to enter chatroom:", error);
      alert("Failed to start chat.");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-bg0 overflow-hidden">
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
                              {Uuser?.nativeLang === "ko"
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
                              onClick={() => navigate("/inbox")}
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
                    <div className="text-[length:var(--fs-subtitle1)] text-gray-7 font-semibold">
                      {Uuser?.nativeLang === "ko" ? "Korean" : "English"}
                    </div>
                  </div>
                  <div className="w-[700px] h-auto text-[length:var(--fs-subtitle2)] leading-[24px]">
                    {Uuser?.description}
                  </div>
                  <div className="flex gap-[16px]">
                    <div className="flex gap-[4px] items-center">
                      <span className="text-[length:var(--fs-subtitle1)] font-semibold">
                        {Uuser?.totalPosts}
                      </span>
                      <span className="text-[length:var(--fs-subtitle2)] leading-[24px] text-gray-6">
                        Posts
                      </span>
                    </div>
                    <div className="flex gap-[4px] items-center">
                      <span className="text-[length:var(--fs-subtitle1)] font-semibold">
                        {Uuser?.follower}
                      </span>
                      <span className="text-[length:var(--fs-subtitle2)] leading-[24px] text-gray-6">
                        Follower
                      </span>
                    </div>
                    <div className="flex gap-[4px] items-center">
                      <span className="text-[length:var(--fs-subtitle1)] font-semibold">
                        {Uuser?.following}
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
                    <FollowButton
                      size="large"
                      className="w-[508px]"
                      userId={userId ? (isNaN(parseInt(userId)) ? userId : parseInt(userId)) : 0}
                      initialIsFollowing={Uuser?.isFollowing}
                    />
                    <OutlinedButton
                      label="Message"
                      Icon={MessageImg}
                      size="large"
                      onClick={handleMessage}
                      className="cursor-pointer hover:bg-violet-50 hover:text-white transition-colors"
                    />
                  </div>
                </div>
              </div>
              {/* Tabs */}
              <Tabs tabs={["Posts"]} />
              <section className="p-[28px] flex flex-col gap-[20px]">
                {posts.map((post) => (
                  <Home_Card
                    key={post.postId}
                    varient="default"
                    isCorrected={post.status !== "PENDING"}
                    post={post}
                    viewer={viewer}
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
      </div >
    </>
  );
}
