import { OutlinedButton } from "../../../components/Button";
import { SolidButton } from "../../../components/Button";
interface DetailSentenceProps {
  index: number;
  text: string;
}

const DetailSentence: React.FC<DetailSentenceProps> = ({ index, text }) => {
  return (
    <div className="flex w-full flex-col items-start gap-5 rounded-[12px] bg-white p-8">
      <span className="text-[#585858] font-pretendard text-2xl font-medium leading-none">Sentence #{index + 1}</span>

      <div className="flex p-6 items-center gap-[10px] rounded-[12px] w-full border border-[#D9D9D9] bg-[#FBFBFB]">
        <p className="text-[#585858] font-pretendard text-base font-semibold leading-[150%]">{text}</p>
      </div>

      <span className="text-[#585858] font-pretendard text-2xl font-medium leading-none">Corrected Sentence #{index + 1}</span>
      <div className="flex flex-col p-8 items-start self-stretch gap-6 rounded-[12px] border border-[#D9D9D9] bg-white p-8">
        <div></div>
        <div className="flex w-full gap-[10px] justify-end">
          <OutlinedButton label="Cancel" className="h-[60px]" />
          <SolidButton label="Send" />
        </div>
      </div>
    </div>
  );
};

export default DetailSentence;
