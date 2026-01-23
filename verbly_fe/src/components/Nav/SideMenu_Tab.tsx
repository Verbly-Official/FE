type SideMenuProps = {
  label: string;
  isSelected: boolean;
  onClick: () => void;
};
export default function SideMenu_Tab({
  label,
  isSelected = false,
  onClick,
}: SideMenuProps) {
  return (
    <div
      onClick={onClick}
      className={`w-[172px] h-[56px] flex items-center gap-[20px] px-[16px] rounded-[4px] text-[20px] cursor-pointer ${
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
      <span>{label}</span>
    </div>
  );
}
