// [수정] export 추가
export const Dashboard = () => (
  <div className="bg-white rounded-xl border border-line1 p-6">
    <div className="flex items-center gap-2 mb-6">
      <span className="text-lg">≡</span>
      <h3 className="text-lg font-bold text-gray-10">Dashboard</h3>
    </div>
    
    <div className="flex items-center gap-6 p-8 bg-gray-50 rounded-xl border border-line1">
      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-5xl">📄</div>
      </div>
      <div>
        <div className="text-sm text-gray-5 mb-2 font-semibold">도움 준 글</div>
        <div className="text-4xl font-bold text-gray-10">45개</div>
      </div>
    </div>
  </div>
);