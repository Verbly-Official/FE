import React, { useEffect, useState } from 'react';
import { getMyProfileApi } from '../../../apis/user'; 
import DashBoardIcon from '../img/dashBoard.svg'; // [수정] SVG 이미지 import

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
    <div className="w-full bg-[var(--color-white)] rounded-xl md:rounded-2xl border border-gray-2 p-4 md:p-6 flex items-center justify-between gap-4">
      <div className="flex flex-col gap-1">
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

      <div className="w-20 h-16 sm:w-24 sm:h-18 md:w-32 md:h-20 rounded-lg md:rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0">
        {imageSrc ? (
          <img 
            src={imageSrc} 
            alt={title}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {/* [수정] import한 이미지 변수 사용 */}
            <img 
              src={DashBoardIcon} 
              alt="Dashboard Default" 
              className="w-full h-full object-cover" 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;