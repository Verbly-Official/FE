type BtnTabProps = {
  label: string;
  isSelected: boolean;
  onClick: () => void;
};

export default function BtnTab({ label, isSelected, onClick }: BtnTabProps) {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-[4px] px-[12px] py-[8px] rounded-[24px] cursor-pointer ${
        isSelected ? "bg-violet-50 text-white" : "bg-transparent text-gray-6"
      }`}
    >
      <img
        src={
          isSelected
            ? "../../src/assets/emoji/checkbox-dashed-white.svg"
            : "../../src/assets/emoji/checkbox-dashed-gray.svg"
        }
        className="w-[24px] h-[24px]"
      />
      <span>{label}</span>
    </div>
  );
}
