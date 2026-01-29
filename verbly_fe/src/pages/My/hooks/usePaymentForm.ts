import { useState } from 'react';

interface PricingOption {
  id: string;
  period: string;
  price: string;
  rawPrice: number;
  description: string;
}

export const usePaymentForm = (pricingOptions: PricingOption[]) => {
  const [selectedPlan, setSelectedPlan] = useState('yearly');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // 가격 계산 로직
  const selectedOption = pricingOptions.find(opt => opt.id === selectedPlan);
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

  return {
    // State
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

    // Computed
    period,
    originalPrice,
    discount,
    tax,
    total,

    // Methods
    handleSubscribe,
  };
};