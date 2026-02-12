import Home_Card from "../../../components/Home/Home_Card";
import Tabs from "../../../components/Tab/Tabs";

import { getPosts, getHotPosts } from "../../../apis/post";
import type { PostItem } from "../../../types/post";
import { useEffect, useState } from "react";
import type { ViewerInfo } from "../../../types/home";

interface SectionProps {
  variant: "kr" | "en";
  refreshKey: number;
  viewer: ViewerInfo | null;
}

export default function Home_Section({
  variant = "kr",
  refreshKey,
  viewer,
}: SectionProps) {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [page, setPage] = useState(0);
  const [last, setLast] = useState(false);
  const [isHotPost, setIsHotPost] = useState(false);

  useEffect(() => {
    if (isHotPost) fetchHotPosts();
    else fetchPosts(0);
  }, [isHotPost, refreshKey]);

  const fetchPosts = async (pageNumber: number) => {
    try {
      const data = await getPosts(pageNumber);
      setPosts((prev) =>
        pageNumber === 0 ? data.content : [...prev, ...data.content],
      );
      setLast(data.last);
      setPage(data.number);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHotPosts = async () => {
    try {
      const data = await getHotPosts();
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white flex-1 p-[24px] w-full min-h-screen rounded-[12px] ">
      {/* Tab */}
      <div className="flex mb-[28px] justify-start gap-0 border-b-[1px] border-line2">
        <Tabs
          tabs={
            variant === "kr"
              ? ["For You", "Hot Posts"]
              : ["For You", "Hot Posts", "Need Correction"]
          }
          onChange={(index) => {
            if (index === 1) {
              setIsHotPost(true);
            } else {
              setIsHotPost(false);
            }
          }}
        />
      </div>
      {/* HomeCards */}
      <div className="flex flex-col gap-[20px]">
        {posts.map((post) => (
          <Home_Card
            key={post.postId}
            varient="default"
            isCorrected={post.status !== "PENDING"}
            viewer={viewer}
            post={post}
          />
        ))}
      </div>
    </div>
  );
}
