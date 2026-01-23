import React from "react";
import { Badge } from "../../../components/Badge/ContentBadge"; // 경로가 맞는지 확인 필요
// import File from "../../assets/emoji/file.svg"; // 사용하지 않는다면 제거

// 더미 데이터 인터페이스
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
  // 데이터가 없을 경우
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col h-[348px] items-center justify-center gap-3 self-stretch overflow-y-auto pr-1">
        <p className="text-gray-400">아직 받은 첨삭이 없습니다.</p>
      </div>
    );
  }

  return (
    // 메인 리스트 컨테이너
    <div className="flex flex-col h-[348px] items-start gap-[12px] self-stretch overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
      {data.map((item) => (
        <div
          key={item.id}
          // [수정 1] items-start -> items-center: 뱃지와 텍스트 수직 중앙 정렬
          // [수정 2] p-6 추가: 카드 내부에 전체적으로 여백을 줌
          className="flex justify-between items-center p-6 gap-2 self-stretch rounded-xl bg-white border border-[#F0F0F0] hover:border-[#7C4DFF] hover:shadow-[0_4px_12px_rgba(124,77,255,0.05)] transition-all duration-200"
        >
          {/* 헤더 영역 (이름, 날짜) */}
          {/* [수정 3] mb-1, p-6 제거: 부모 div에서 padding을 처리하므로 제거 */}
          <div className="flex flex-col w-full gap-1">
            <p className="text-[18px] font-bold text-gray-900">{item.title}</p>
            <p className="text-[14px] text-gray-500">{item.date}</p>
          </div>

          {/* 뱃지 영역 */}
          <Badge
            content="Completed"
            className="bg-green-100 text-green-800 shrink-0" 
            size="medium"
          />
        </div>
      ))}
    </div>
  );
};

export default MyCorrected;