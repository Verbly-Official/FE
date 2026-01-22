import React from 'react';

interface CorrectionedItem {
  id: string;
  title: string;
  date: string;
  status?: 'completed' | 'in-progress' | 'pending';
}

interface CorrectionedListProps {
  title?: string;
  items: CorrectionedItem[];
  onItemClick?: (item: CorrectionedItem) => void;
  onMoreClick?: () => void;
  showMoreButton?: boolean;
}

const CorrectionedList: React.FC<CorrectionedListProps> = ({ 
  title = '여행 일기',
  items,
  onItemClick,
}) => {
  const getStatusBadge = (status?: string) => {
    if (!status) return null;
    
    const statusConfig = {
      completed: { text: 'Completed', className: 'bg-green-100 text-green-700' },
      'in-progress': { text: 'In Progress', className: 'bg-blue-100 text-blue-700' },
      pending: { text: 'Pending', className: 'bg-gray-100 text-gray-600' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    if (!config) return null;
    
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${config.className}`}>
        {config.text}
      </span>
    );
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* 헤더 */}
      <div className="w-full flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      </div>

      {/* 리스트 */}
      <div className="w-full flex flex-col gap-0 divide-y divide-gray-100">
        {items.length === 0 ? (
          <div className="py-8 text-center text-gray-400">
            아직 작성된 일기가 없습니다.
          </div>
        ) : (
          items.map((item) => (
            <div 
              key={item.id} 
              onClick={() => onItemClick?.(item)}
              className="py-4 first:pt-0 last:pb-0 hover:bg-gray-50 px-3 -mx-3 rounded-lg transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                {/* 문서 아이콘 */}
                <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-gray-500"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>

                {/* 텍스트 영역 */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h4 className="text-gray-900 font-semibold truncate flex-1">
                      {item.title}
                    </h4>
                    {getStatusBadge(item.status)}
                  </div>
                  <p className="text-sm text-gray-500">
                    {item.date}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// 예시 사용
const CorrectionedListExample: React.FC = () => {
  const sampleItems: CorrectionedItem[] = [
    {
      id: '1',
      title: 'Travel Diary - Day 1',
      date: 'Yesterday',
      status: 'completed',
    },
    {
      id: '2',
      title: 'Travel Diary - Day 1',
      date: 'Yesterday',
    },
    {
      id: '3',
      title: 'Beach Adventures',
      date: '2 days ago',
      status: 'in-progress',
    },
    {
      id: '4',
      title: 'Mountain Hiking',
      date: '3 days ago',
      status: 'pending',
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
      <CorrectionedList  
        title="여행 일기"
        items={sampleItems}
        onItemClick={(item) => console.log('Clicked:', item)}
        onMoreClick={() => console.log('More clicked')}
        showMoreButton={true}
      />
    </div>
  );
};

export default CorrectionedListExample;