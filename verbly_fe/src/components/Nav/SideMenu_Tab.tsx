export default function SideMenu_Tab() {
  const isSelected = true;
  return (
    <div
      className={`w-[172px] h-[56px] flex items-center gap-[20px] px-[16px] rounded-[4px] ${
        isSelected
          ? "bg-violet-100 text-violet-700 border-[1px] border-violet-700"
          : "bg-transparent"
      }`}
    >
      <img
        src="../../src/assets/checkbox-outlined.svg"
        className="w-[20px] h-[20px]"
      />
      <span className="text-[20px]">Text</span>
    </div>
  );
}
