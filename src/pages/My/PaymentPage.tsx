import React from 'react';
import GNB from '../../components/Nav/GNB';
import SideMenu from '../../components/Nav/SideMenu';
import { IconButton, GradientButton } from '../../components/Button';
import { SectionHeader } from './components/SectionHeader';
import PricingCard from './components/PricingCard';
import OrderSummary from './components/OrderSummary';
import { PaymentMethodSelector } from './components/PaymentMethodSelector';
import { BenefitsList } from './components/BenefitsList';
import { TermsCheckbox } from './components/TermsCheckbox';
import { DecorativeIcons } from './components/DecorativeIcons';
import { usePaymentForm } from './hooks/usePaymentForm';
import CloseIcon from '../../assets/emoji/close.svg';

// 필요 시 usePaymentForm에서 export한 타입을 import 해서 사용해도 됩니다.
interface PricingOption {
  id: string;
  period: string;
  price: string;
  rawPrice: number;
  description: string;
}

const PaymentPage: React.FC = () => {
  const {
    pricingOptions, // API에서 받아온 플랜 리스트
    selectedPlan,
    setSelectedPlan,
    paymentMethod,
    setPaymentMethod,
    agreedToTerms,
    setAgreedToTerms,
    period,
    originalPrice,
    discount,
    tax,
    total,
    handleSubscribe,
    isLoading, // 로딩 상태
  } = usePaymentForm(); // 인자 제거 (훅 내부에서 API 호출)

  return (
    <div className="w-full h-screen overflow-hidden bg-bg0 flex flex-col">
      <GNB />
      
      <div className="w-full flex flex-1 overflow-hidden mx-auto">
        <SideMenu variant="profile" />

        <main className="flex-1 overflow-hidden relative">
          <div className="w-[111.2%] h-[111.2%] origin-top-left scale-[0.9] overflow-y-auto">
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

              <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8 max-w-7xl relative z-10">
                
                {/* 왼쪽 메인 폼 영역 */}
                <div className="flex-1 w-full bg-[var(--color-white)] rounded-2xl border border-gray-1 shadow-sm p-6 md:p-8">
                  
                  {/* Section 1: Choose Your Plan */}
                  <div className="mb-10">
                    <SectionHeader number={1} title="Choose Your plan" />
                    <div className="mt-6">
                      {pricingOptions.length > 0 ? (
                        <PricingCard 
                          options={pricingOptions}
                          selectedId={selectedPlan}
                          onSelect={setSelectedPlan}
                        />
                      ) : (
                        <div className="w-full py-10 flex justify-center items-center text-gray-500">
                          Loading plans...
                        </div>
                      )}
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
                    </div>
                  </div>
                </div>

                {/* 오른쪽 사이드바 */}
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
                      disabled={isLoading} 
                    >
                      {isLoading ? 'Processing...' : 'Subscribe Now'}
                    </GradientButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PaymentPage;