import SolidButton from '../../components/Button/SolidButton';

// [수정] export 추가
export const PremiumBanner = () => (
  <div className="bg-gradient-to-r from-violet-50 to-pink-40 rounded-xl p-10 flex items-center justify-between shadow-lg relative overflow-hidden">
    <div className="absolute left-8 top-1/2 -translate-y-1/2 text-8xl opacity-20 select-none">📝</div>
    <div className="flex items-center gap-8 z-10">
      <div className="text-7xl select-none">📝</div>
      <div>
        <h3 className="text-3xl font-bold text-white mb-2">Upgrade to Premium</h3>
        <p className="text-white text-opacity-90 text-lg">Get unlimited AI corrections & templates</p>
      </div>
    </div>
    <SolidButton 
      variant="primary" 
      size="large" 
      label='BUY NOW'
      className="!bg-white !text-violet-50 hover:!bg-gray-1 z-10 border-none"
    />
  </div>
);