// [수정] export 추가
export const BadgeManagement = ({ badges }: { badges: string[] }) => (
  <div className="bg-white rounded-xl border border-line1 p-6 h-auto max-h-[214px]">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-bold text-gray-10">뱃지 관리</h3>
    </div>
    
    <div className="grid grid-cols-4 gap-3">
      {badges.map((badge, idx) => (
        <div 
          key={idx} 
          className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center p-2"
        >
          <span className="h-auto text-xs text-violet-50 font-semibold text-center leading-tight break-keep">
            {badge}
          </span>
        </div>
      ))}
    </div>
  </div>
);