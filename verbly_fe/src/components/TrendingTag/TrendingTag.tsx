import { TextButton } from "../Button";

export default function TrendingTag() {
  return (
    <div className="flex flex-col p-[24px] gap-[16px] w-[384px] h-stretch bg-white rounded-[8px]">
      <div className="text-title2-bold28 text-gray-10">
        Trending Tags
      </div>
      <div className="flex flex-col gap-[32px]">
        <div className="flex flex-col gap-[4px]">
          <div className="text-subtitle-semi22 text-gray-9">#English</div>
          <div className="text-body-medium14 text-gray-5">
            <span>2K</span>
            <span> posts</span>
          </div>
        </div>
        <div className="flex flex-col gap-[4px]">
          <div className="text-subtitle-semi22 text-gray-9">#Daily</div>
          <div className="text-body-medium14 text-gray-5">
            <span>1.5K</span>
            <span> posts</span>
          </div>
        </div>
        <div className="flex flex-col gap-[4px]">
          <div className="text-subtitle-semi22 text-gray-9">#Netflix</div>
          <div className="text-body-medium14 text-gray-5">
            <span>1K</span>
            <span> posts</span>
          </div>
        </div>
        <div className="flex flex-col gap-[4px]">
          <div className="text-subtitle-semi22 text-gray-9">#Slang</div>
          <div className="text-body-medium14 text-gray-5">
            <span>920</span>
            <span> posts</span>
          </div>
        </div>
        <div className="flex flex-col gap-[4px]">
          <div className="text-subtitle-semi22 text-gray-9">#Urgent</div>
          <div className="text-body-medium14 text-gray-5">
            <span>881</span>
            <span> posts</span>
          </div>
        </div>
      </div>

      {/* w-[336px] -> w-full로 변경하여 가운데 정렬 보장 */}
      <div className="flex justify-center w-full">
        <TextButton>View More</TextButton>
      </div>
    </div>
  );
}
