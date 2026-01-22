import React from 'react';

interface RecentCountCardProps {
  title?: string;
  count?: number;
  unit?: string;
  imageSrc?: string;
}

const RecentCountCard: React.FC<RecentCountCardProps> = ({ 
  title = '도움 준 글',
  count = 45,
  unit = '개',
  imageSrc
}) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 p-6 flex items-center justify-between">
      {/* 텍스트 영역 */}
      <div className="flex flex-col gap-1">
        <p className="text-sm text-gray-600 font-medium">
          {title}
        </p>
        <p className="text-3xl font-bold text-gray-900">
          {count}<span className="text-2xl ml-1">{unit}</span>
        </p>
      </div>

      {/* 이미지 영역 */}
      <div className="w-32 h-20 rounded-xl overflow-hidden flex items-center justify-center">
        {imageSrc ? (
          <img 
            src={imageSrc} 
            alt={title}
            className="w-full h-full object-contain"
          />
        ) : (
          // 이미지 없을 때 플레이스홀더
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-gray-300 text-4xl"></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentCountCard;