import React from 'react';

interface OrderSummaryProps {
  period: string;
  basePrice: number;
  discount: number;
  tax: number;
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  period, 
  basePrice, 
  discount, 
  tax, 
  total 
}) => {
  const isYearly = period === 'YEARLY';

  return (
    <div className='bg-[var(--color-white)] rounded-lg md:rounded-xl lg:rounded-[0.875rem] border border-gray-2 shadow-sm p-4 md:p-5 lg:p-[1.5rem] flex flex-col gap-4 md:gap-5 lg:gap-[1.5rem]'>
      <span className='text-[length:var(--fs-title1)] text-gray-9 font-bold'>Order Summary</span>
      
      <div className='flex flex-col gap-3 md:gap-4 lg:gap-[1.25rem] py-4 md:py-5 lg:py-[1.5rem] border-y border-gray-2'>
        {/* 상품명 & 가격 */}
        <div className='flex justify-between items-center gap-2'>
          <span className='text-[length:var(--fs-body2)] text-gray-6'>
            {isYearly ? 'Bubbly Pro (Yearly)' : 'Bubbly Pro (Monthly)'}
          </span>
          <span className='text-[length:var(--fs-subtitle2)] text-gray-9'>
            ${basePrice.toFixed(2)}
          </span>
        </div>

        {/* 할인 금액 */}
        <div className='flex justify-between items-center gap-2'>
          <span className='text-[length:var(--fs-body2)] text-gray-6'>
            Discount ({isYearly ? '20%' : '0%'} Off)
          </span>
          <span className='text-[length:var(--fs-subtitle2)] text-pink-40'>
            -${discount.toFixed(2)}
          </span>
        </div>

        {/* 세금 */}
        <div className='flex justify-between items-center gap-2'>
          <span className='text-[length:var(--fs-body2)] text-gray-6'>Tax (Estimated)</span>
          <span className='text-[length:var(--fs-subtitle2)] text-gray-9'>
            ${tax.toFixed(2)}
          </span>
        </div>
      </div>
      
      {/* 총 결제 금액 */}
      <div className='flex justify-between items-center gap-2'>
        <span className='text-[length:var(--fs-title3)] font-bold text-transparent bg-clip-text bg-[image:var(--gradient-4)]'>
          Total due
        </span>
        <span className='text-[length:var(--fs-title1)] font-bold text-transparent bg-clip-text bg-[image:var(--gradient-4)]'>
          ${total.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default OrderSummary;