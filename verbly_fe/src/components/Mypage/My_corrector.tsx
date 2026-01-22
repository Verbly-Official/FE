import basicProfile from '../../components/Profile/img/basicProfile.svg';

// [수정] 인터페이스 export
export interface ExpertRequest {
  id: number;
  name: string;
  location: string;
  profileImg: string;
}

// [수정] export 추가
export const ExpertRequestManagement = ({ requests }: { requests: ExpertRequest[] }) => (
  <div className="bg-white rounded-xl border border-line1 p-6">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-bold text-gray-10">전문가 의뢰 관리</h3>
    </div>
    
    <div className="space-y-3">
      {requests.map((request) => (
        <div 
          key={request.id} 
          className="flex items-center gap-3 p-4 border border-line1 rounded-lg hover:bg-bg1 transition-colors cursor-pointer"
        >
          <div className="px-3 py-1 bg-blue-90 text-blue-60 rounded text-xs font-semibold whitespace-nowrap">
            첨삭 완료
          </div>
          
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
             <img 
               src={request.profileImg || basicProfile} 
               alt={request.name}
               className="w-full h-full object-cover" 
             />
          </div>

          <div className="flex-1 min-w-0">
            <div className="font-semibold text-gray-10 text-sm truncate">{request.name}</div>
            <div className="text-xs text-gray-5 truncate">{request.location}</div>
          </div>
          <button className="text-xs text-gray-5 hover:text-gray-7 transition-colors whitespace-nowrap">
            내 문서 {'>'}
          </button>
        </div>
      ))}
    </div>
  </div>
);