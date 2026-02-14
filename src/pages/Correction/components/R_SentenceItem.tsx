interface RightSentenceProps {
  text: string;
  index: number;
  active?: boolean;
  onClick?: () => void;
}

const RightSentence: React.FC<RightSentenceProps> = ({ text, index, active = false, onClick }) => (
  <div onClick={onClick} className="cursor-pointer">
    <span className="text-[#585858] font-pretendard text-[length:var(--fs-title3)] font-medium leading-none">Sentence #{index + 1}</span>

    <div
      className={`flex p-5 items-center gap-[10px] rounded-[12px] w-full border
      ${active ? "border-[#713DE3] bg-[#FBFBFB] shadow-[0_4px_4px_0_rgba(162,120,255,0.24)]" : "border-[#D9D9D9] bg-[#FBFBFB]"}`}
    >
      <p className="text-[#585858] font-pretendard text-[length:var(--fs-subtitle3)] font-semibold leading-[150%]">{text}</p>
    </div>
  </div>
);

export default RightSentence;
