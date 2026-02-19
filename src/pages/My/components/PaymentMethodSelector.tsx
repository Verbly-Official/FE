import React from 'react';
import { OutlinedButton } from '../../../components/Button';
import CardIcon from '../../../assets/emoji/card.svg';
import KakaoIcon from '../../../assets/emoji/kakao.svg'; 
import HomeIcon from '../../../assets/emoji/home.svg';

interface PaymentMethodSelectorProps {
  selectedMethod: 'kakaopay' | 'paypal' | undefined;
  onMethodChange: (method: 'kakaopay' | 'paypal') => void;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onMethodChange,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <OutlinedButton 
        variant='primary'
        size='large' 
        label='Kakaopay' 
        Icon={() => <img src={KakaoIcon} alt="kakaopay" className="w-5 h-5" />}
        onClick={() => onMethodChange('kakaopay')}
        className={`w-full ${
          selectedMethod === 'kakaopay' 
            ? '!border-violet-500 !bg-violet-100 !text-violet-700' 
            : ''
        }`}
      />
      <OutlinedButton 
        variant='primary'
        size='large' 
        label='Paypal' 
        Icon={() => <img src={HomeIcon} alt="paypal" className="w-5 h-5" />}
        onClick={() => onMethodChange('paypal')}
        className={`w-full ${
          selectedMethod === 'paypal' 
            ? '!border-violet-500 !bg-violet-100 !text-violet-700' 
            : ''
        }`}
      />
    </div>
  );
};