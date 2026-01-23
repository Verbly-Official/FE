interface SentenceItemProps {
  text: string;
  index: number;
}

const SentenceItem: React.FC<SentenceItemProps> = ({ text, index }) => (
  <div className="w-full px-4 py-[20px] items-start border border-[#D9D9D9] bg-white overflow-y-auto flex flex-col gap-3">
    {/* 번호 */}
    <div className="truncate text-[#1F1F1F] font-pretendard text-lg font-semibold leading-none overflow-hidden">Sentence #{index + 1}</div>

    {/* 본문 */}
    <p className="text-[#585858] font-pretendard text-base font-semibold leading-[150%]">{text}</p>
  </div>
);

export default SentenceItem;
