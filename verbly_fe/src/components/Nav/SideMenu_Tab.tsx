export default function SideMenu_Tab() {
  const isSelected = true;
  return (
    <div
      className={`w-[172px] h-[56px] flex items-center gap-[20px] px-[16px] rounded-[4px] text-[20px] ${
        isSelected
          ? "bg-violet-100 text-violet-50 border-[1px] border-violet-50"
          : "bg-white"
      }`}
    >
      <img
        src={`${
          isSelected
            ? "../../src/assets/emoji/checkbox-dashed-purple.svg"
            : "../../src/assets/emoji/checkbox-dashed.svg"
        }`}
        className="w-[20px] h-[20px]"
      />
      <span>Text</span>
    </div>
  );
}
