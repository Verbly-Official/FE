import { TextButton } from "../Button";

export default function TrendingTag() {
  return (
    <div className="flex flex-col p-[24px] gap-[16px] w-[384px] h-stretch bg-white rounded-[8px]">
      <div className="text-[28px] font-bold text-gray-10 leading-[33.6px]">
        Trending Tags
      </div>
      <div className="flex flex-col gap-[32px]">
        <div className="flex flex-col gap-[4px]">
          <div className="text-[22px] font-semi text-gray-9">#English</div>
          <div className="text-[14px] font-medium text-gray-5 leading-[16.8px]">
            <span>2K</span>
            <span> posts</span>
          </div>
        </div>
        <div className="flex flex-col gap-[4px]">
          <div className="text-[22px] font-semi text-gray-9">#Daily</div>
          <div className="text-[14px] font-medium text-gray-5 leading-[16.8px]">
            <span>1.5K</span>
            <span> posts</span>
          </div>
        </div>
        <div className="flex flex-col gap-[4px]">
          <div className="text-[22px] font-semi text-gray-9">#Netflix</div>
          <div className="text-[14px] font-medium text-gray-5 leading-[16.8px]">
            <span>1K</span>
            <span> posts</span>
          </div>
        </div>
        <div className="flex flex-col gap-[4px]">
          <div className="text-[22px] font-semi text-gray-9">#Slang</div>
          <div className="text-[14px] font-medium text-gray-5 leading-[16.8px]">
            <span>920</span>
            <span> posts</span>
          </div>
        </div>
        <div className="flex flex-col gap-[4px]">
          <div className="text-[22px] font-semi text-gray-9">#Urgent</div>
          <div className="text-[14px] font-medium text-gray-5 leading-[16.8px]">
            <span>881</span>
            <span> posts</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center w-[336px]">
        <TextButton>View More</TextButton>
      </div>
    </div>
  );
}
