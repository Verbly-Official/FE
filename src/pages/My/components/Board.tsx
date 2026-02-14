import React, { useEffect, useState } from 'react';
import { getMyProfileApi } from '../../../apis/user'; 
import DashBoardIcon from '../img/dashBoard.svg';

interface RecentCountCardProps {
  title?: string;
  count?: number;
  unit?: string;
  imageSrc?: string;
}

const Board: React.FC<RecentCountCardProps> = ({ 
  title = '도움 준 글',
  count: propCount,
  unit = '개',
  imageSrc
}) => {
  const [fetchedCount, setFetchedCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (propCount !== undefined) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await getMyProfileApi();
        if (response && response.isSuccess && response.result) {
          setFetchedCount(response.result.correctionsGiven);
        }
      } catch (error) {
        console.error("대시보드 데이터 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [propCount]);

  const displayCount = propCount !== undefined ? propCount : fetchedCount;

  return (
    // overflow-hidden을 주어 이미지가 둥근 모서리를 넘지 않도록 함
    <div className="w-full bg-[var(--color-white)] rounded-xl md:rounded-2xl border border-gray-2 p-4 md:p-6 flex items-center justify-between gap-4 overflow-hidden relative min-h-[120px]">
      <div className="flex flex-col gap-1 z-10">
        <p className="text-[length:var(--fs-body2)] text-gray-6">
          {title}
        </p>
        <p className="text-[length:var(--fs-title1)] font-bold text-gray-9">
          {loading && propCount === undefined ? (
            <span className="inline-block w-8 h-8 bg-gray-1 rounded animate-pulse align-middle" />
          ) : (
            displayCount
          )}
          <span className="text-[length:var(--fs-subtitle1)] ml-1 font-normal text-gray-5">{unit}</span>
        </p>
      </div>

      {/* [수정] 아이콘 컨테이너 및 이미지 스타일
        - absolute positioning을 사용하여 우측 하단에 고정
        - w-[160px], h-[160px]: 요청하신 크기 반영
        - -right-[20px], -bottom-[20px]: 박스 밖으로 살짝 나가게 하여 자연스러운 배치 유도 (수치 조절 가능)
      */}
      <div className="absolute right-10 -bottom-6 w-[160px] h-[160px] flex items-center justify-center pointer-events-none">
        <img 
          src={imageSrc || DashBoardIcon} 
          alt="Dashboard Default" 
          className="w-full h-full object-contain" 
        />
      </div>
    </div>
  );
};

export default Board;