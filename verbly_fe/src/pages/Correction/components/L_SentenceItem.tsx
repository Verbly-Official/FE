interface SentenceItemProps {
  text: string;
  index: number;
  active?: boolean;
  onClick?: () => void;
}

const SentenceItem: React.FC<SentenceItemProps> = ({ text, index, active = false, onClick }) => (
  <div
    onClick={onClick}
    className={`w-full px-4 py-[20px] items-start overflow-y-auto flex flex-col gap-3 cursor-pointer
      ${active ? "border border-[#D9D9D9] bg-[#F1ECFC]" : "border border-[#D9D9D9] bg-white"}
    `}
  >
    <div className="truncate text-[#1F1F1F] font-pretendard text-lg font-semibold leading-none overflow-hidden">Sentence #{index + 1}</div>

    <p className="text-[#585858] font-pretendard text-base font-semibold leading-[150%]">{text}</p>
  </div>
);

export default SentenceItem;
