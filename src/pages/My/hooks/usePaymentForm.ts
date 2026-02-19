import { useState, useEffect } from 'react';
import { 
  getPaymentPlansApi, 
  readyPaymentApi, 
  readyPaypalApi, 
  type PlanDto 
} from '../../../apis/payment';

export interface PricingOption {
  id: string;      
  planId: number;  
  period: string;
  price: string;
  rawPrice: number;
  description: string;
}

export const usePaymentForm = () => {
  const [pricingOptions, setPricingOptions] = useState<PricingOption[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string>(''); 
  const [paymentMethod, setPaymentMethod] = useState<'kakaopay' | 'paypal'>();
  
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await getPaymentPlansApi();
        if (response.isSuccess && response.result) {
          const options: PricingOption[] = response.result.map((plan: PlanDto) => {
            const fallbackPlanId = plan.billingCycle === 'MONTHLY' ? 1 : 2;
            
            return {
              id: plan.billingCycle.toLowerCase(),
              planId: plan.planId ?? fallbackPlanId, 
              period: plan.billingCycle,
              price: `$${plan.price.toLocaleString()}`, // 기획에 맞게 달러 표기 유지
              rawPrice: plan.price,
              description: plan.name 
            };
          });
          
          setPricingOptions(options);
          
          const defaultPlan = options.find(o => o.id === 'yearly') || options[0];
          if (defaultPlan) setSelectedPlan(defaultPlan.id);
        }
      } catch (error) {
        console.error('Failed to fetch payment plans:', error);
      }
    };

    fetchPlans();
  }, []);

  const selectedOption = pricingOptions.find(opt => opt.id === selectedPlan);
  const period = selectedOption?.period || 'MONTHLY';
  
  const monthlyOption = pricingOptions.find(opt => opt.period === 'MONTHLY');
  const monthlyRawPrice = monthlyOption ? monthlyOption.rawPrice : 0;
  
  const originalPrice = (selectedOption?.period === 'YEARLY' && monthlyRawPrice > 0)
    ? (monthlyRawPrice * 12) 
    : (selectedOption?.rawPrice || 0);

  const finalPrice = selectedOption?.rawPrice || 0;
  const discount = originalPrice - finalPrice;
  const tax = 0;
  const total = finalPrice + tax;

  const handleSubscribe = async () => {
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
      if (paymentMethod === 'kakaopay') {
        const response = await readyPaymentApi(selectedOption.planId);
        if (response.isSuccess && response.result) {
          window.location.href = response.result.next_redirect_pc_url;
        } else {
          alert(response.message || 'Failed to initialize KakaoPay payment.');
        }
      } 
      else if (paymentMethod === 'paypal') {
        const response = await readyPaypalApi(selectedOption.planId);
        if (response.isSuccess && typeof response.result === 'string') {
          window.location.href = response.result;
        } else {
          alert(response.message || 'Failed to initialize PayPal payment.');
        }
      } else {
        alert('Please select a valid payment method.');
      }
    } catch (error: any) {
      console.error('Payment initialization failed:', error);
      alert(error.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    pricingOptions, selectedPlan, setSelectedPlan, paymentMethod, setPaymentMethod,
    cardName, setCardName, cardNumber, setCardNumber, expirationDate, setExpirationDate,
    cvv, setCvv, agreedToTerms, setAgreedToTerms, isLoading, period, originalPrice,
    discount, tax, total, handleSubscribe,
  };
};