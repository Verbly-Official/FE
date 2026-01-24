interface RecentCountCardProps {
  title?: string;
  count?: number;
  unit?: string;
  imageSrc?: string;
}

const My_board: React.FC<RecentCountCardProps> = ({ 
  title = '도움 준 글',
  count = 45,
  unit = '개',
  imageSrc
}) => {
  return (
    <div className="w-full bg-white rounded-xl md:rounded-2xl border border-gray-200 p-4 md:p-6 flex items-center justify-between gap-4">
      {/* 텍스트 영역 */}
      <div className="flex flex-col gap-1">
        <p className="text-xs md:text-sm text-gray-600 font-medium">
          {title}
        </p>
        <p className="text-2xl md:text-3xl font-bold text-gray-900">
          {count}<span className="text-lg md:text-2xl ml-1">{unit}</span>
        </p>
      </div>

      {/* 이미지 영역 */}
      <div className="w-20 h-16 sm:w-24 sm:h-18 md:w-32 md:h-20 rounded-lg md:rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0">
        {imageSrc ? (
          <img 
            src={imageSrc} 
            alt={title}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-gray-300 text-2xl md:text-4xl"></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default My_board;