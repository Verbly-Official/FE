import React from 'react';

// 1. 데이터 타입 정의 (외부에서 사용할 수 있도록 export)
export interface CorrectedPost {
  id: string;
  title: string;
  content: string;
  date: string;
  status?: 'completed' | 'in-progress' | 'pending';
}

// 2. 컴포넌트 Props 정의
interface MyCorrectorProps {
  item: CorrectedPost; // 부모로부터 데이터 객체 하나를 받음
}

const MyCorrected: React.FC<MyCorrectorProps> = ({ item }) => {
  
  // 상태별 뱃지 스타일
  const getStatusStyle = (status?: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-600';
      case 'in-progress': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case 'completed': return '완료';
      case 'in-progress': return '진행 중';
      default: return '대기';
    }
  };

  return (
    <div className="w-full bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col gap-3">
      {/* 상단: 제목 + 상태 */}
      <div className="flex justify-between items-start">
        <h4 className="font-bold text-gray-900 truncate pr-4">
          {item.title}
        </h4>
        {item.status && (
          <span className={`px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${getStatusStyle(item.status)}`}>
            {getStatusLabel(item.status)}
          </span>
        )}
      </div>

      {/* 내용 미리보기 */}
      <p className="text-sm text-gray-600 line-clamp-2">
        {item.content}
      </p>

      {/* 하단: 날짜 */}
      <div className="text-right mt-2">
        <span className="text-xs text-gray-400">{item.date}</span>
      </div>
    </div>
  );
};

export default MyCorrected;