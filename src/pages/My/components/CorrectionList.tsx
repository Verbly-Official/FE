import React, { useEffect, useState } from 'react';
import { Badge } from "../../../components/Badge/ContentBadge"; // 경로 확인 필요
import { getCorrections, type CorrectionItem } from '../../../apis/correction'; //

// UI에서 사용할 데이터 타입 정의
interface CorrectionItemData {
  id: number;
  title: string;
  date: string;
  status: string;
}

interface CorrectionListProps {
  data?: CorrectionItemData[]; // 부모에서 데이터를 주입할 경우 사용
}

const CorrectionList: React.FC<CorrectionListProps> = ({ data: propData }) => {
  const [items, setItems] = useState<CorrectionItemData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 1. props로 데이터가 전달된 경우 API 호출 생략
    if (propData && propData.length > 0) {
      setItems(propData);
      setLoading(false);
      return;
    }

    // 2. API 호출하여 데이터 가져오기
    const fetchData = async () => {
      try {
        // 최근 항목 조회 (예: size 5, sort=true 등 필요한 파라미터 설정)
        const response = await getCorrections({ 
          page: 1, 
          size: 5, 
          sort: true 
        });

        // API 응답 데이터를 UI 데이터 형태로 변환
        const mappedItems: CorrectionItemData[] = response.items.map((item: CorrectionItem) => ({
          id: item.id,
          title: item.title,
          // 날짜 포맷팅 (YYYY.MM.DD)
          date: item.createdAt 
            ? new Date(item.createdAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              }).replace(/\. /g, '.').replace('.', '')
            : '',
          status: item.status // 'COMPLETED' | 'IN_PROGRESS' | 'PENDING'
        }));

        setItems(mappedItems);
      } catch (error) {
        console.error("Correction history 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [propData]);

  // 로딩 중이거나 데이터가 없을 때 표시할 UI
  if (!loading && (!items || items.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 self-stretch py-10 md:py-16 border border-gray-100 rounded-xl bg-white">
        <p className="text-gray-400 text-sm md:text-base">아직 받은 첨삭이 없습니다.</p>
      </div>
    );
  }

  // 뱃지 스타일 매핑 함수
  const getBadgeStyle = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return { content: 'Completed', className: 'bg-green-100 text-green-800' };
      case 'IN_PROGRESS':
        return { content: 'In Progress', className: 'bg-blue-100 text-blue-800' };
      default:
        return { content: 'Pending', className: 'bg-gray-100 text-gray-800' };
    }
  };

  return (
    <div className="flex flex-col w-full gap-2 md:gap-[12px]">
      {items.map((item) => {
        const badgeStyle = getBadgeStyle(item.status);
        
        return (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 md:p-6 gap-2 md:gap-3 w-full rounded-lg md:rounded-xl bg-white border border-[#F0F0F0] hover:shadow-sm transition-all duration-200 cursor-pointer"
          >
            {/* 헤더 영역 */}
            <div className="flex flex-col w-full gap-1">
              <p className="text-base md:text-[18px] font-bold text-gray-900 line-clamp-1">
                {item.title}
              </p>
              <p className="text-xs md:text-[14px] text-gray-500">
                {item.date}
              </p>
            </div>

            {/* 뱃지 영역 */}
            <Badge
              content={badgeStyle.content}
              className={`${badgeStyle.className} shrink-0 self-start sm:self-auto`} 
              size="medium"
            />
          </div>
        );
      })}
      
      {/* 로딩 스켈레톤 (옵션) */}
      {loading && (
         <div className="p-6 w-full rounded-xl bg-white border border-gray-100 animate-pulse">
           <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
           <div className="h-4 bg-gray-100 rounded w-1/4"></div>
         </div>
      )}
    </div>
  );
};

export default CorrectionList;