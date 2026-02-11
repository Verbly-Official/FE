import React, { useEffect, useState } from 'react';
import { getMyProfileApi } from '../../../apis/user'; 

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
    <div className="w-full bg-white rounded-xl md:rounded-2xl border border-gray-200 p-4 md:p-6 flex items-center justify-between gap-4">
      <div className="flex flex-col gap-1">
        <p className="text-xs md:text-sm text-gray-600 font-medium">
          {title}
        </p>
        <p className="text-2xl md:text-3xl font-bold text-gray-900">
          {loading && propCount === undefined ? (
            <span className="inline-block w-8 h-8 bg-gray-100 rounded animate-pulse align-middle" />
          ) : (
            displayCount
          )}
          <span className="text-lg md:text-2xl ml-1 font-normal text-gray-500">{unit}</span>
        </p>
      </div>

      <div className="w-20 h-16 sm:w-24 sm:h-18 md:w-32 md:h-20 rounded-lg md:rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0 bg-gray-50">
        {imageSrc ? (
          <img 
            src={imageSrc} 
            alt={title}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;