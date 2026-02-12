import type { Trending } from "../../types/tags";

interface TrendingItemProps {
  tag: Trending;
}

export default function Tag({ tag }: TrendingItemProps) {
  return (
    <div className="flex flex-col gap-1 cursor-pointer">
      <div className="text-[length:var(--fs-title2)] font-semibold text-gray-9">#{tag.tagName}</div>
      <div className="text-[length:var(--fs-body2)] font-medium text-gray-5">{tag.count} posts</div>
    </div>
  );
}
