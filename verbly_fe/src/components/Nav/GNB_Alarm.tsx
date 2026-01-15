/* 모달만 있습니다. */

export default function GNB_Alarm() {
  return (
    <div className="flex flex-col w-[369px] h-[344px] bg-white py-[20px] rounded-[12px] shadow-[0_4px_8px_0_rgba(0,0,0,0.08)]">
      <div className="flex flex-row justify-center items-center h-[28px] p-[14.5px]  gap-[105px]">
        <span>Notification</span>
        <span className="flex flex-row items-center px-[4px] gap-[4px] text-violet-50">
          <img
            src="../../src/assets/emoji/check-purple.svg"
            className="w-[20px] h-[20px]"
          />
          Mark all read
        </span>
      </div>
      <div className="flex flex-row items-center gap-[8px] w-[369px] h-[63px] px-[8px] py-[12px] border-b-[1px] border-gray-1 bg-violet-110">
        <div className="w-[8px] h-[8px] bg-violet-50 rounded-[50px]" />
        <div className="flex flex-col justify-center">
          <div className="text-[16px]">Jisu liked your post.</div>
          <div className="text-[14px] text-gray-5">5m ago</div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-[8px] w-[369px] h-[63px] px-[8px] py-[12px] border-b-[1px] border-gray-1 bg-violet-110">
        <div className="w-[8px] h-[8px] bg-violet-50 rounded-[50px]" />
        <div className="flex flex-col justify-center">
          <div className="text-[16px]">Jisu liked your post.</div>
          <div className="text-[14px] text-gray-5">5m ago</div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-[8px] w-[369px] h-[63px] px-[8px] py-[12px] border-b-[1px] border-gray-1">
        <div className="w-[8px] h-[8px] bg-transparent rounded-[50px]" />
        <div className="flex flex-col justify-center">
          <div className="text-[16px]">David corrected your post.</div>
          <div className="text-[14px] text-gray-5">5m ago</div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-[8px] w-[369px] h-[63px] px-[8px] py-[12px] border-b-[1px] border-gray-1">
        <div className="w-[8px] h-[8px] bg-transparent rounded-[50px]" />
        <div className="flex flex-col justify-center">
          <div className="text-[16px]">Notice_System maintenance</div>
          <div className="text-[14px] text-gray-5">5m ago</div>
        </div>
      </div>
      <div className="text-center text-[14px] text-gray-6">
        View all notifications
      </div>
    </div>
  );
}
