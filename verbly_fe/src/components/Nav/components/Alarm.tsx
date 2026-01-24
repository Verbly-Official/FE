export default function Alarm() {
  return (
    <div className="flex flex-row items-center gap-[8px] w-[369px] h-[63px] px-[8px] py-[12px] border-b-[1px] border-gray-1 bg-violet-110 cursor-pointer">
      <div className="w-[8px] h-[8px] bg-violet-50 rounded-[50px]" />
      <div className="flex flex-col justify-center">
        <div className="text-[16px]">Jisu liked your post.</div>
        <div className="text-[14px] text-gray-5 font-medium">5m ago</div>
      </div>
    </div>
  );
}
