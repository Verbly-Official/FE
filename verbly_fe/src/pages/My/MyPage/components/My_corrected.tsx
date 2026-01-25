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
      // 데이터가 없을 때도 고정 높이 대신 적절한 여백을 줌
      <div className="flex flex-col items-center justify-center gap-3 self-stretch py-10 md:py-16">
        <p className="text-gray-400 text-sm md:text-base">아직 받은 첨삭이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-2 md:gap-[12px]">
      {data.map((item) => (
        <div
          key={item.id}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 md:p-6 gap-2 md:gap-3 w-full rounded-lg md:rounded-xl bg-white border border-[#F0F0F0] transition-all duration-200"
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