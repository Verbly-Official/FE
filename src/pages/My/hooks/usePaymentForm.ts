import { useState, useEffect } from 'react';
import { 
  getPaymentPlansApi, 
  readyPaymentApi, 
  type PlanDto 
} from '../../../apis/payment';

// UI용 옵션 타입
export interface PricingOption {
  id: string;      // 'monthly' | 'yearly' (UI 식별용)
  planId: number;  // 실제 서버 DB ID (API 호출용)
  period: string;
  price: string;
  rawPrice: number;
  description: string;
}

export const usePaymentForm = () => {
  // --- State ---
  const [pricingOptions, setPricingOptions] = useState<PricingOption[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string>(''); 
  // 기본 결제 수단을 카카오페이로 설정
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'kakaopay'>('kakaopay');
  
  // 카드 정보 (카카오페이 사용 시 미사용)
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // --- Effects ---
  // 플랜 목록 조회
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await getPaymentPlansApi();
        if (response.isSuccess && response.result) {
          const options: PricingOption[] = response.result.map((plan: PlanDto) => ({
            id: plan.billingCycle.toLowerCase(), // 'monthly'
            planId: plan.planId,                 // 1 or 2
            period: plan.billingCycle,           // 'MONTHLY'
            price: `$ ${plan.price.toFixed(2)}`, // "$ 2.00"
            rawPrice: plan.price,
            description: plan.billingCycle === 'MONTHLY' ? 'Per month' : 'Per year'
          }));
          
          setPricingOptions(options);
          
          // 'yearly'를 기본 선택, 없으면 첫 번째 선택
          const defaultPlan = options.find(o => o.id === 'yearly') || options[0];
          if (defaultPlan) setSelectedPlan(defaultPlan.id);
        }
      } catch (error) {
        console.error('Failed to fetch payment plans:', error);
      }
    };

    fetchPlans();
  }, []);

  // --- Computed Values ---
  const selectedOption = pricingOptions.find(opt => opt.id === selectedPlan);
  
  const period = selectedOption?.period || 'MONTHLY';
  
  // 할인율 계산 (Monthly 가격 기준)
  const monthlyOption = pricingOptions.find(opt => opt.period === 'MONTHLY');
  const monthlyRawPrice = monthlyOption ? monthlyOption.rawPrice : 0;
  
  const originalPrice = (selectedOption?.period === 'YEARLY' && monthlyRawPrice > 0)
    ? (monthlyRawPrice * 12) 
    : (selectedOption?.rawPrice || 0);

  const finalPrice = selectedOption?.rawPrice || 0;
  const discount = originalPrice - finalPrice;
  const tax = 0;
  const total = finalPrice + tax;

  // --- Handlers ---
  const handleSubscribe = async () => {
    // 1. 유효성 검사
    if (!agreedToTerms) {
      alert('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    if (!selectedOption) {
      alert('Please select a plan.');
      return;
    }

    setIsLoading(true);

    try {
      // 카카오페이 선택 시
      if (paymentMethod === 'kakaopay') {
        console.log(`Starting KakaoPay for Plan ID: ${selectedOption.planId}`);
        
        // 결제 준비 API 호출
        const response = await readyPaymentApi(selectedOption.planId);
        
        if (response.isSuccess && response.result) {
          const { next_redirect_pc_url } = response.result;
          
          // PC URL로 리다이렉트 (모바일 환경이면 next_redirect_mobile_url 사용 고려)
          window.location.href = next_redirect_pc_url;
        } else {
          alert(response.message || 'Failed to initialize payment.');
        }
      } else {
        // 카드 등 다른 결제 수단 (현재 미구현)
        alert('Selected payment method is currently not supported.');
      }

    } catch (error: any) {
      console.error('Payment initialization failed:', error);
      const errorMessage = error.response?.data?.message || 'Payment failed. Please try again.';
      alert(errorMessage);
    } finally {
      // 리다이렉트가 일어나면 이 코드는 실행되지 않을 수 있음
      setIsLoading(false);
    }
  };

  return {
    pricingOptions,
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
    isLoading,
    period,
    originalPrice,
    discount,
    tax,
    total,
    handleSubscribe,
  };
};