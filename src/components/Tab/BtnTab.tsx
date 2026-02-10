type BtnTabProps = {
  label: string;
  iconSrc: string;
  isSelected: boolean;
  onClick: () => void;
};

export default function BtnTab({
  label,
  iconSrc,
  isSelected,
  onClick,
}: BtnTabProps) {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-[4px] px-[12px] py-[8px] rounded-[24px] cursor-pointer ${
        isSelected ? "bg-violet-50 text-white" : "bg-transparent text-gray-6"
      }`}
    >
      <img src={iconSrc} className="w-[24px] h-[24px]" />
      <span>{label}</span>
    </div>
  );
}
