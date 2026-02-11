import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import GNB from "../../components/Nav/GNB";
import SideMenu from "../../components/Nav/SideMenu";
import TrendingTag from "../../components/TrendingTag/TrendingTag";
import { UserStatsCard } from "../Library/components/UserStatsCard";
import MessageImg from "../../assets/emoji/mail-purple.svg";
import CheckIcon from "../../assets/emoji/checkbox-rounded.svg";
import { FollowButton, OutlinedButton } from "../../components/Button";
import Tabs from "../../components/Tab/Tabs";
import Home_Card from "../../components/Home/Home_Card";

import type { ViewerInfo, UuserInfo } from "../../types/home.ts";
import type { PostItem } from "../../types/post.ts";
import { getUserPosts } from "../../apis/post.ts";
import { getViewerInfo, getUuserInfo } from "../../apis/home.ts";

export default function Home_Profile() {
  const { uuid } = useParams();

  const [viewer, setViewer] = useState<ViewerInfo | null>(null);
  const [Uuser, setUuser] = useState<UuserInfo | null>(null);

  const [posts, setPosts] = useState<PostItem[]>([]);
  const [page, setPage] = useState(0);
  const [last, setLast] = useState(false);

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

  useEffect(() => {
    if (!uuid) return;
    const fetchPosts = async () => {
      try {
        const data = await getUserPosts(uuid, 0);
        setPosts(data.content);
        setLast(data.last);
        setPage(data.number);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchUuser = async () => {
      const data = await getUuserInfo(uuid);
      setUuser(data);
    };
    fetchPosts();
    fetchUuser();
  }, [uuid]);

  return (
    <>
      <div className="min-h-screen">
        {/*GNB*/}
        <div className="w-full max-w-[1920px] mx-auto">
          <GNB variant="home" />
        </div>
        <div>
          <div className="w-full min-h-screen bg-bg0 flex flex-row justify-between pr-[40px]">
            <SideMenu />
            <div className="bg-white p-[24px] w-[1120px] min-h-screen mt-[32px] rounded-[12px]">
              {/* Profile */}
              <div className="w-full h-stretch p-[20px] flex flex-row gap-[52px]">
                <img
                  src={Uuser?.imageUrl ?? ""}
                  alt="profile"
                  className="w-[180px] h-[180px]"
                />
                <div className="w-[1072px] flex flex-col flex-start gap-[16px]">
                  <div className="flex gap-[4px] flex-col">
                    <div className="flex flex-row gap-[12px] items-center">
                      <div className="font-bold text-[40px] leading-[40px]">
                        {Uuser?.nickname ?? ""}
                      </div>
                      <img
                        src={CheckIcon}
                        alt="checkIcon"
                        className="w-[48px] h-[48px] p-[3.33px]"
                      />
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
                    <FollowButton size="large" className="w-[508px]" />
                    <OutlinedButton
                      label="Message"
                      Icon={MessageImg}
                      size="large"
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
                  />
                ))}
              </section>
            </div>

            {/* Right Side */}
            <div>
              <div className="mt-[32px] flex flex-col gap-[32px]">
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
        </div>
      </div>
    </>
  );
}
