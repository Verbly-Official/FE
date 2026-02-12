import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [items, setItems] = useState<CorrectionItemData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 1. Props로 데이터가 들어오면 우선 사용
    if (propData && propData.length > 0) {
      setItems(propData);
      setLoading(false);
      return;
    }

    // 2. API 호출
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const response = await getCorrections({ 
          sort: true 
        });

        // [수정] Swagger 응답 구조(corrections 배열) 및 필드명(correctionId, correctionCreatedAt) 반영
        // response가 { total: number, corrections: [...] } 형태라고 가정
        const sourceData = response.corrections || [];

        const mappedItems: CorrectionItemData[] = sourceData.map((item: CorrectionItem) => ({
          id: item.correctionId ?? 0,
          title: item.title ?? "제목 없음",
          date: item.correctionCreatedAt 
            ? new Date(item.correctionCreatedAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }).replace(/\. /g, '.').slice(0, -1)
            : 'Unknown Date',
          status: item.status ?? 'PENDING'
        }));

        setItems(mappedItems);
      } catch (error) {
        console.error("Failed to fetch corrections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [propData]);

  const getBadgeStyle = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return { content: 'Completed', className: 'bg-primary-5 text-primary-500' };
      case 'IN_PROGRESS':
        return { content: 'In Progress', className: 'bg-blue-50 text-blue-500' };
      case 'PENDING':
        return { content: 'Pending', className: 'bg-gray-1 text-gray-8' };
      case 'TEMP':
        return { content: 'Temp', className: 'bg-gray-1 text-gray-5' };
      default:
        return { content: status, className: 'bg-gray-1 text-gray-8' };
    }
  };

  const handleItemClick = (id: number) => {
    navigate(`/correction/${id}`); 
  };

  return (
    <div className="flex flex-col w-full gap-2 md:gap-[12px]">
      {items.map((item) => {
        const badgeStyle = getBadgeStyle(item.status);
        
        return (
          <div
            key={item.id}
            onClick={() => handleItemClick(item.id)}
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
      
      {!loading && items.length === 0 && (
        <div className="p-6 text-center text-gray-5">작성된 첨삭 요청이 없습니다.</div>
      )}
    </div>
  );
};

export default CorrectionList;