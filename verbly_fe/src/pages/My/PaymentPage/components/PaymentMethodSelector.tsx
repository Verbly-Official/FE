import React from 'react';
import { OutlinedButton } from '../../../../components/Button';
import CardIcon from '../../../../assets/emoji/card.svg';
import HomeIcon from '../../../../assets/emoji/home.svg';

interface PaymentMethodSelectorProps {
  selectedMethod: 'card' | 'paypal';
  onMethodChange: (method: 'card' | 'paypal') => void;
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
        label='Credit Card' 
        iconSrc={CardIcon}
        onClick={() => onMethodChange('card')}
        className={selectedMethod === 'card' ? 'border-violet-50 bg-violet-100' : ''}
      />
      <OutlinedButton 
        variant='primary'
        size='large' 
        label='Paypal' 
        iconSrc={HomeIcon}
        onClick={() => onMethodChange('paypal')}
        className={selectedMethod === 'paypal' ? 'border-violet-50 bg-violet-100' : ''}
      />
    </div>
  );
};