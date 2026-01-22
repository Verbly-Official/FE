import { ContentBadge } from '../Badge/ContentBadge'; // 파일명 확인 필요 (ContentBadge.tsx 가정)

export interface HistoryItem {
  id: number;
  title: string;
  date: string;
  status: string;
}

// [수정] export 추가
export const CorrectionHistory = ({ history }: { history: HistoryItem[] }) => {
  return (
    <div className="bg-white rounded-xl border border-line1 p-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-lg">≡</span>
        <h3 className="text-lg font-bold text-gray-10">Correction History</h3>
      </div>
      
      <div className="space-y-3">
        {history.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center justify-between p-4 border border-line1 rounded-lg hover:bg-bg1 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white border border-line1 rounded-lg flex items-center justify-center text-2xl">
                📄
              </div>
              <div>
                <div className="font-semibold text-gray-10 text-sm">{item.title}</div>
                <div className="text-sm text-gray-5 mt-1">{item.date}</div>
              </div>
            </div>
            {/* Badge 컴포넌트 사용 예시 */}
            <ContentBadge 
              content={item.status} 
              size="small" 
              className="!bg-green-100 !text-green-700"
            />
          </div>
        ))}
      </div>
    </div>
  );
};