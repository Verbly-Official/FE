import type { Trending } from "../../types/tags";

interface TrendingItemProps {
  tag: Trending;
}

export default function Tag({ tag }: TrendingItemProps) {
  return (
    <div className="flex flex-col gap-[4px] w-full">
      <div className="text-subtitle-semi22 text-gray-9 truncate">
        #{tag.tagName}
      </div>
      <div className="text-body-medium14 text-gray-5">{tag.count} posts</div>
    </div>
  );
}
