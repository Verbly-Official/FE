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
    <div className='bg-white rounded-lg md:rounded-xl lg:rounded-[0.875rem] border border-gray-2 shadow-sm p-4 md:p-5 lg:p-[1.5rem] flex flex-col gap-4 md:gap-5 lg:gap-[1.5rem]'>
      <span className='text-xl md:text-2xl lg:text-[1.5rem] text-gray-9 font-bold'>Order Summary</span>
      
      <div className='flex flex-col gap-3 md:gap-4 lg:gap-[1.25rem] py-4 md:py-5 lg:py-[1.5rem] border-y border-gray-2'>
        {/* 상품명 & 가격 */}
        <div className='flex justify-between items-center gap-2'>
          <span className='text-sm md:text-base lg:text-[1rem] text-gray-6'>
            {isYearly ? 'Bubbly Pro (Yearly)' : 'Bubbly Pro (Monthly)'}
          </span>
          <span className='text-sm md:text-base lg:text-[1rem] text-gray-9 font-medium'>
            ${basePrice.toFixed(2)}
          </span>
        </div>

        {/* 할인 금액 */}
        <div className='flex justify-between items-center gap-2'>
          <span className='text-sm md:text-base lg:text-[1rem] text-gray-6'>
            Discount ({isYearly ? '20%' : '0%'} Off)
          </span>
          <span className='text-sm md:text-base lg:text-[1rem] text-pink-40 font-medium'>
            -${discount.toFixed(2)}
          </span>
        </div>

        {/* 세금 */}
        <div className='flex justify-between items-center gap-2'>
          <span className='text-sm md:text-base lg:text-[1rem] text-gray-6'>Tax (Estimated)</span>
          <span className='text-sm md:text-base lg:text-[1rem] text-gray-9 font-medium'>
            ${tax.toFixed(2)}
          </span>
        </div>
      </div>
      
      {/* 총 결제 금액 */}
      <div className='flex justify-between items-center gap-2'>
        <span className='text-lg md:text-xl lg:text-[1.25rem] font-bold text-transparent bg-clip-text bg-[image:var(--gradient-4)]'>
          Total due
        </span>
        <span className='text-xl md:text-2xl lg:text-[1.5rem] font-bold text-transparent bg-clip-text bg-[image:var(--gradient-4)]'>
          ${total.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default OrderSummary;