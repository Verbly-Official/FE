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
    <div className="w-full bg-[#F8FAFC] flex flex-col flex-1 overflow-hidden min-h-screen">
      {/* Header */}
      <GNB />
      
      {/* Main Content Wrapper - 반응형 구조 */}
      <div className="w-full flex flex-col md:flex-row flex-1 overflow-hidden mx-auto">
              
        {/* Left Sidebar */}
        <SideMenu variant="default" />

        {/* Page Content */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          <div className="w-full max-w-[1800px] mx-auto px-4 py-6 md:px-8 lg:px-12 relative">
            
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

            {/* Main Layout */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-7xl relative z-10">
              
              {/* Left Side: Plan Selection & Payment Info */}
              <div className="flex-1 space-y-6 lg:space-y-8">
                {/* Choose Plan */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
                  <SectionHeader number={1} title="Choose Your plan" />
                  <PricingCard 
                    options={PRICING_OPTIONS}
                    selectedId={selectedPlan}
                    onSelect={setSelectedPlan}
                  />
                </div>

                {/* Payment Information */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
                  <SectionHeader number={2} title="Payment Information" />
                  
                  <PaymentMethodSelector 
                    selectedMethod={paymentMethod}
                    onMethodChange={setPaymentMethod}
                  />

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

              {/* Right Side: Order Summary & Benefits */}
              <div className="lg:w-[400px] xl:w-[450px] space-y-6 relative">
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
  );
};

export default PaymentPage;