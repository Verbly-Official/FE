import React, { useState } from 'react';
// 컴포넌트
import { Header } from '../../components/Header/Header';
import SideMenu from '../../components/Nav/SideMenu';
import { TextField } from '../../components/TextArea/TextField'; 
import { GradientButton, IconButton, OutlinedButton } from '../../components/Button';
import PricingCard from './components/PricingCard';
import OrderSummary from './components/OrderSummary'; 
import { Badge } from '../../components/Badge/Badge';

// 아이콘 및 이미지
import CloseIcon from '../../assets/emoji/close.svg';
import CardIcon from '../../assets/emoji/card.svg';
import HomeIcon from '../../assets/emoji/home.svg'; 
import NewspaperIcon from './img/L-Newspaper.svg';
import AcademicIcon from './img/L-Academic.svg';

interface PricingOption {
  id: string;
  period: string;
  price: string;
  rawPrice: number;
  description: string;
}

const PRICING_OPTIONS: PricingOption[] = [
  {
    id: 'monthly',
    period: 'MONTHLY',
    price: '$ 1.60',
    rawPrice: 1.60,
    description: 'Per month'
  },
  {
    id: 'yearly',
    period: 'YEARLY',
    price: '$ 9.60',
    rawPrice: 9.60,
    description: 'Per year'
  }
];

const PaymentPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState('yearly');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // 가격 및 기간 계산 로직
  const selectedOption = PRICING_OPTIONS.find(opt => opt.id === selectedPlan);
  const isYearly = selectedPlan === 'yearly';
  
  const period = selectedOption?.period || 'MONTHLY';

  const monthlyPrice = 1.60;
  const originalPrice = isYearly ? (monthlyPrice * 12) : monthlyPrice; 
  const finalPrice = selectedOption?.rawPrice || 0; 
  
  const discount = originalPrice - finalPrice;
  const tax = 0;
  const total = finalPrice + tax;

  const handleSubscribe = () => {
    if (!agreedToTerms) {
      alert('Please agree to the Terms of Service and Privacy Policy');
      return;
    }
    console.log('Subscription details:', {
      plan: selectedPlan,
      paymentMethod,
      total
    });
    alert('Subscription successful!');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="w-full max-w-[1920px] mx-auto">
        <Header />
      </div>

      {/* Main Content */}
      <div className="flex w-full max-w-[1920px] mx-auto">
        {/* Sidebar - 모바일에서 숨김 */}
        <div className="hidden lg:block">
          <SideMenu variant="default" />
        </div>

        {/* Page Content */}
        <main className="flex-1 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 md:py-8 overflow-hidden relative">
          {/* Quit Button */}
          <div className="flex items-center gap-2 mb-6">
            <IconButton 
              iconSrc={CloseIcon} 
              ariaLabel='quit'
              size="small" 
              shape="square" 
              onClick={() => window.history.back()} 
            />
            <span className='text-sm text-gray-500'>Quit</span>
          </div>

          {/* Main Layout: 좌우 2단 */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-7xl relative z-10">
            {/* Left Side: Plan Selection & Payment Info */}
            <div className="flex-1 space-y-6 lg:space-y-8">
              {/* Choose Your Plan */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Badge
                    content='number'
                    variant='primary'
                    count={1}
                  />
                  <h2 className="text-[24px] text-gray-7 font-bold">
                    Choose Your plan
                  </h2>
                </div>

                <PricingCard 
                  options={PRICING_OPTIONS}
                  selectedId={selectedPlan}
                  onSelect={setSelectedPlan}
                />
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Badge
                    content='number'
                    variant='primary'
                    count={2}
                  />
                  <h2 className="text-[24px] text-gray-7 font-bold">
                    Payment Information
                  </h2>
                </div>

                {/* Payment Method Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <OutlinedButton 
                      variant='primary'
                      size='large' 
                      label='Credit Card' 
                      iconSrc={CardIcon}
                      onClick={() => setPaymentMethod('card')}
                      className={paymentMethod === 'card' ? 'border-violet-50 bg-violet-100' : ''}
                    />
                  <OutlinedButton 
                      variant='primary'
                      size='large' 
                      label='Paypal' 
                      iconSrc={HomeIcon}
                      onClick={() => setPaymentMethod('paypal')}
                      className={paymentMethod === 'paypal' ? 'border-violet-50 bg-violet-100' : ''}
                    />
                </div>

                {/* Card Form */}
                {paymentMethod === 'card' && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name on Card
                      </label>
                      <TextField 
                        shape='square'
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <TextField 
                        shape='square'
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiration Date
                        </label>
                        <TextField 
                          shape='square'
                          value={expirationDate}
                          onChange={(e) => setExpirationDate(e.target.value)}
                          placeholder="MM / YY"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVC / CC
                        </label>
                         <TextField 
                            shape='square'
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            placeholder="123"
                            maxLength={4}
                           />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side: Order Summary & Decorative Icons */}
            {/* relative 클래스를 추가하여 내부 absolute 요소들의 기준점이 되게 함 */}
            <div className="lg:w-[400px] xl:w-[450px] space-y-6 relative">
              
              {/* 장식용 아이콘 배치 (배경 느낌을 위해 -z-index 사용 가능하거나 위치 조절) */}
              <div className="hidden xl:block pointer-events-none">
                {/* 1. 뉴스페이퍼 아이콘 (우측 상단 쯤 배치) */}
                <img 
                  src={NewspaperIcon} 
                  alt="" 
                  className="absolute -right-30 top-60 w-[500px] h-[500px] opacity-80 rotate-5"
                />
                {/* 2. 학사모 아이콘 (우측 하단 쯤 배치) */}
                <img 
                  src={AcademicIcon} 
                  alt="" 
                  className="absolute -right-50 top-40 w-[400px] h-[400px] opacity-80 -rotate-12"
                />
                
                {/* (선택사항) 배경에 보라색 블러 효과를 원한다면 아래 div 주석 해제 */}
                {/* <div className="absolute top-1/2 right-[-50px] -translate-y-1/2 w-[500px] h-[500px] bg-purple-200/50 rounded-full blur-3xl -z-10" /> */}
              </div>

              <div className="relative z-10">
                <OrderSummary
                  period={period}
                  basePrice={originalPrice}
                  discount={discount}
                  tax={tax}
                  total={total}
                />
                </div>
              {/* Benefits & Subscribe */}
              <div className="p-6 relative z-10">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                  PRO BENEFITS INCLUDED
                </h3>
                
                <div className="space-y-3 mb-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center flex-shrink-0">
                         {/* 체크 아이콘 */}
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
                          <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="text-sm text-gray-600">Unlimited AI Grammar</span>
                    </div>
                  ))}
                </div>

                {/* Terms Checkbox */}
                <label className="flex items-start gap-3 mb-6 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 w-5 h-5 rounded border-2 border-gray-300 text-violet-500 focus:ring-2 focus:ring-violet-200 cursor-pointer"
                  />
                  <span className="text-sm text-gray-600 leading-tight">
                    I agree to the{' '}
                    <a href="#" className="text-violet-500 hover:underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-violet-500 hover:underline">Privacy Policy</a>
                    {' '}Subscription auto-renew...
                  </span>
                </label>

                {/* Subscribe Button */}
                <GradientButton 
                  size='large'
                  className="w-full justify-center gap-2 h-[3.5rem]"
                  onClick={handleSubscribe}
                >
                  Subscribe Now
                </GradientButton>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PaymentPage;