import React from 'react';
import GNB from '../../components/Nav/GNB';
import SideMenu from '../../components/Nav/SideMenu';
import { IconButton, GradientButton } from '../../components/Button';
import { SectionHeader } from './components/SectionHeader';
import PricingCard from './components/PricingCard';
import OrderSummary from './components/OrderSummary';
import { PaymentMethodSelector } from './components/PaymentMethodSelector';
import { CardForm } from './components/CardForm';
import { BenefitsList } from './components/BenefitsList';
import { TermsCheckbox } from './components/TermsCheckbox';
import { DecorativeIcons } from './components/DecorativeIcons';
import { usePaymentForm } from './hooks/usePaymentForm';
import CloseIcon from '../../assets/emoji/close.svg';

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
  const {
    selectedPlan,
    setSelectedPlan,
    paymentMethod,
    setPaymentMethod,
    cardName,
    setCardName,
    cardNumber,
    setCardNumber,
    expirationDate,
    setExpirationDate,
    cvv,
    setCvv,
    agreedToTerms,
    setAgreedToTerms,
    period,
    originalPrice,
    discount,
    tax,
    total,
    handleSubscribe,
  } = usePaymentForm(PRICING_OPTIONS);

  return (
    // [90% 배율 적용] 외부 래퍼
    <div className="w-full h-screen overflow-hidden bg-bg0">
      {/* [90% 배율 적용] 내부 컨텐츠: 111.2% 크기 -> 0.9 축소 */}
      <div className="flex flex-col w-[111.2%] h-[111.2vh] origin-top-left scale-[0.9] overflow-hidden">
        <GNB />
        
        <div className="w-full flex flex-col md:flex-row flex-1 overflow-hidden mx-auto">
                
          <SideMenu variant="profile" />

          <main className="flex-1 flex flex-col overflow-y-auto">
            <div className="w-full max-w-[1800px] mx-auto px-4 py-6 md:px-8 lg:px-12 relative">
              
              <div className="flex items-center gap-2 mb-6">
                <IconButton 
                  iconSrc={CloseIcon} 
                  ariaLabel='quit'
                  size="small" 
                  shape="square" 
                  onClick={() => window.history.back()} 
                />
                <span className='text-[length:var(--fs-body2)] text-gray-5'>Quit</span>
              </div>

              {/* [수정됨] items-start 추가 
                기본값인 stretch를 start로 변경하여, 왼쪽/오른쪽 영역이 서로의 높이에 영향을 받지 않고
                각자의 컨텐츠 높이만큼만 차지하도록 설정했습니다.
              */}
              <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8 max-w-7xl relative z-10">
                
                {/* 왼쪽 메인 폼 영역 */}
                <div className="flex-1 w-full bg-[var(--color-white)] rounded-2xl border border-gray-1 shadow-sm p-6 md:p-8">
                  
                  {/* Section 1: Choose Your Plan */}
                  <div className="mb-10">
                    <SectionHeader number={1} title="Choose Your plan" />
                    <div className="mt-6">
                      <PricingCard 
                        options={PRICING_OPTIONS}
                        selectedId={selectedPlan}
                        onSelect={setSelectedPlan}
                      />
                    </div>
                  </div>

                  {/* Section 2: Payment Information */}
                  <div>
                    <SectionHeader number={2} title="Payment Information" />
                    
                    <div className="mt-6 flex flex-col gap-6">
                      <PaymentMethodSelector 
                        selectedMethod={paymentMethod}
                        onMethodChange={setPaymentMethod}
                      />

                      {/* CardForm은 paymentMethod가 'card'일 때만 렌더링되므로, 
                          'paypal'일 때는 이 부분이 사라지고 부모 div 높이가 줄어듭니다. */}
                      {paymentMethod === 'card' && (
                        <CardForm
                          cardName={cardName}
                          cardNumber={cardNumber}
                          expirationDate={expirationDate}
                          cvv={cvv}
                          onCardNameChange={setCardName}
                          onCardNumberChange={setCardNumber}
                          onExpirationDateChange={setExpirationDate}
                          onCvvChange={setCvv}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* 오른쪽 사이드바 (요약 및 결제 버튼) */}
                <div className="w-full lg:w-[400px] xl:w-[450px] space-y-6 relative">
                  <DecorativeIcons />

                  <div className="relative z-10">
                    <OrderSummary
                      period={period}
                      basePrice={originalPrice}
                      discount={discount}
                      tax={tax}
                      total={total}
                    />
                  </div>

                  <div className="p-6 relative z-10">
                    <BenefitsList />
                    <TermsCheckbox 
                      checked={agreedToTerms}
                      onChange={setAgreedToTerms}
                    />
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
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;