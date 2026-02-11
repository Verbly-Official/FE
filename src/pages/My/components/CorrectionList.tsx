import React, { useEffect, useState } from 'react';
import { Badge } from "../../../components/Badge/ContentBadge"; 
import { getCorrections, type CorrectionItem } from '../../../apis/correction'; 

interface CorrectionItemData {
  id: number;
  title: string;
  date: string;
  status: string;
}

interface CorrectionListProps {
  data?: CorrectionItemData[]; 
}

const CorrectionList: React.FC<CorrectionListProps> = ({ data: propData }) => {
  const [items, setItems] = useState<CorrectionItemData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 1. Props로 전달된 데이터가 있으면 그것을 사용
    if (propData && propData.length > 0) {
      setItems(propData);
      setLoading(false);
      return;
    }

    // 2. API 호출하여 데이터 가져오기
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const response = await getCorrections({ 
          sort: true 
        });
        const mappedItems: CorrectionItemData[] = response.items.map((item: CorrectionItem) => ({
          id: item.id,
          title: item.title,
          date: item.createdAt 
            ? new Date(item.createdAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              }).replace(/\. /g, '.').replace('.', '')
            : '',
          status: item.status 
        }));

        setItems(mappedItems);
      } catch (error) {
        console.error("Correction history 조회 실패:", error);
         setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [propData]);

  if (!loading && (!items || items.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 self-stretch py-10 md:py-16 border border-gray-2 rounded-xl bg-[var(--color-white)]">
        <p className="text-gray-4 text-[length:var(--fs-body2)]">아직 받은 첨삭이 없습니다.</p>
      </div>
    );
  }

  const getBadgeStyle = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return { content: 'Completed', className: 'bg-green-100 text-green-800' };
      case 'IN_PROGRESS':
        return { content: 'In Progress', className: 'bg-blue-100 text-blue-800' };
      default:
        return { content: 'Pending', className: 'bg-gray-1 text-gray-8' };
    }
  };

  return (
    <div className="flex flex-col w-full gap-2 md:gap-[12px]">
      {items.map((item) => {
        const badgeStyle = getBadgeStyle(item.status);
        
        return (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 md:p-6 gap-2 md:gap-3 w-full rounded-lg md:rounded-xl bg-[var(--color-white)] border border-gray-2 hover:shadow-sm transition-all duration-200 cursor-pointer"
          >
            <div className="flex flex-col w-full gap-1">
              <p className="text-[length:var(--fs-subtitle1)] text-gray-9 line-clamp-1">
                {item.title}
              </p>
              <p className="text-[length:var(--fs-body2)] text-gray-5">
                {item.date}
              </p>
            </div>

            <Badge
              content={badgeStyle.content}
              className={`${badgeStyle.className} shrink-0 self-start sm:self-auto`} 
              size="medium"
            />
          </div>
        );
      })}
      
      {loading && (
         <div className="p-6 w-full rounded-xl bg-[var(--color-white)] border border-gray-2 animate-pulse">
           <div className="h-5 bg-gray-2 rounded w-1/3 mb-2"></div>
           <div className="h-4 bg-gray-1 rounded w-1/4"></div>
         </div>
      )}
    </div>
  );
};

export default CorrectionList;