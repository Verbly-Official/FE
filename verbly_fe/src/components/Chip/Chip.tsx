interface ChipProps {
  label: string;
  onRemove?: () => void;
}

export default function Chip({ label, onRemove }: ChipProps) {
  return (
    <div className="inline-flex h-[32px] whitespace-nowrap bg-blue-100 px-[8px] py-[12px] flex flex-row justify-center items-center gap-[8px] rounded-[4px]">
      <div className="text-[14px] text-blue-70">{label}</div>
      <img
        src="../../src/assets/emoji/close.svg"
        alt="remove"
        onClick={onRemove}
        className="w-[16px] h-[16px] cursor-pointer"
      />
    </div>
  );
}
