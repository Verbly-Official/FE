import { useEffect, useState } from "react";
import type { Trending } from "../../types/tags";
import { TextButton } from "../Button";
import { getTrendingTags } from "../../apis/tags";
import Tag from "./Tag";

export default function TrendingTag() {
  const [tags, setTags] = useState<Trending[]>([]);
  const [viewMore, setViewMore] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await getTrendingTags();
        setTags(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTags();
  }, []);

  const visibleTags = viewMore ? tags.slice(0, 10) : tags.slice(0, 5);

  return (
    <div className="flex flex-col p-[24px] gap-[16px] w-full h-stretch bg-white rounded-[8px] border-[1px] border-line1">
      <div className="text-title2-bold28 text-gray-10">Trending Tags</div>
      <div className="flex flex-col gap-[32px]">
        {visibleTags.map((tag) => (
          <Tag key={tag.tagId} tag={tag} />
        ))}
      </div>

      {tags.length > 5 && (
        <div className="flex justify-center w-full cursor-pointer">
          <TextButton onClick={() => setViewMore((prev) => !prev)}>
            {viewMore ? "View Less" : "View More"}
          </TextButton>
        </div>
      )}
    </div>
  );
}
