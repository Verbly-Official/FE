import { Badge } from "../../../../components/Badge/ContentBadge";

interface CorrectionItemData {
  id: string;
  title: string;
  date: string;
  correctorName: string;
}

interface MyCorrectedListProps {
  data?: CorrectionItemData[];
}

const MyCorrected = ({ data = [] }: MyCorrectedListProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col h-48 md:h-[348px] items-center justify-center gap-3 self-stretch overflow-y-auto pr-1">
        <p className="text-gray-400 text-sm md:text-base">아직 받은 첨삭이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-auto max-h-[400px] md:h-[348px] items-start gap-2 md:gap-[12px] self-stretch overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
      {data.map((item) => (
        <div
          key={item.id}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 md:p-6 gap-2 md:gap-3 self-stretch rounded-lg md:rounded-xl bg-white border border-[#F0F0F0] hover:border-[#7C4DFF] hover:shadow-[0_4px_12px_rgba(124,77,255,0.05)] transition-all duration-200"
        >
          {/* 헤더 영역 */}
          <div className="flex flex-col w-full gap-1">
            <p className="text-base md:text-[18px] font-bold text-gray-900">{item.title}</p>
            <p className="text-xs md:text-[14px] text-gray-500">{item.date}</p>
          </div>

          {/* 뱃지 영역 */}
          <Badge
            content="Completed"
            className="bg-green-100 text-green-800 shrink-0 self-start sm:self-auto" 
            size="medium"
          />
        </div>
      ))}
    </div>
  );
};

export default MyCorrected;