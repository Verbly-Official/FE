import { useEffect, useState } from "react";
import type { Trending } from "../../types/tags";
import { TextButton } from "../Button";
import { getTrendingTags } from "../../apis/tags";
import Tag from "./Tag";

export default function TrendingTag() {
  const [tags, setTags] = useState<Trending[]>([]);

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

  return (
    <div className="flex flex-col p-6 gap-4 w-full h-stretch bg-white rounded-[8px] border-[1px] border-line1">
      <div className="text-[length:var(--fs-title1)] font-bold text-gray-10">Trending Tags</div>
      <div className="flex flex-col gap-[32px]">
        {tags.map((tag) => (
          <Tag key={tag.tagId} tag={tag} />
        ))}
      </div>

      {/* w-[336px] -> w-full로 변경하여 가운데 정렬 보장 */}
      <div className="flex justify-center w-full cursor-pointer">
        <TextButton>View More</TextButton>
      </div>
    </div>
  );
}
