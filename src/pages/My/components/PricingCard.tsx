import { useState } from 'react';

interface PricingOption {
  id: string;
  period: string;
  price: string;
  rawPrice: number;
  description: string;
}

interface PricingCardProps {
  options: PricingOption[];
  selectedId?: string;
  onSelect?: (id: string) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ 
  options, 
  selectedId: controlledSelectedId,
  onSelect 
}) => {
  const [internalSelectedId, setInternalSelectedId] = useState(options[0]?.id);
  
  const selectedId = controlledSelectedId !== undefined ? controlledSelectedId : internalSelectedId;
  
  const handleSelect = (id: string) => {
    if (onSelect) {
      onSelect(id);
    } else {
      setInternalSelectedId(id);
    }
  };

  return (
    <div className="w-full max-w-[51rem]">
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 lg:gap-[1rem]">
        {options.map((option) => {
          const isSelected = selectedId === option.id;
          
          return (
            <div
              key={option.id}
              role="button"
              tabIndex={0}
              onClick={() => handleSelect(option.id)}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(option.id)}
              className={`
                flex-1 rounded-lg md:rounded-xl p-4 md:p-6 lg:p-[1.5rem] transition-all duration-200 cursor-pointer
                ${isSelected 
                  ? 'bg-violet-110 border-2 border-violet-40 shadow-md' 
                  : 'bg-[var(--color-white)] border-2 border-gray-2 hover:border-violet-100'
                }
              `}
            >
              <div className="flex justify-between items-start mb-3 md:mb-4 lg:mb-[1rem]">
                <span className="text-[length:var(--fs-subtitle1)] text-violet-40 uppercase tracking-wide">
                  {option.period}
                </span>
                
                <div className={`
                  w-5 h-5 md:w-6 md:h-6 lg:w-[1.5rem] lg:h-[1.5rem] rounded-md border-2 flex items-center justify-center transition-all
                  ${isSelected 
                    ? 'bg-violet-40 border-violet-40' 
                    : 'border-gray-3 bg-[var(--color-white)]'
                  }
                `}>
                  {isSelected && (
                    <svg 
                      width="12" 
                      height="12" 
                      viewBox="0 0 12 12" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-[var(--color-white)] w-3 h-3 md:w-4 md:h-4"
                    >
                      <path 
                        d="M10 3L4.5 8.5L2 6" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
              
              <div className="text-left">
                <div className="text-[length:var(--fs-title1)] font-bold text-violet-40 mb-2 lg:mb-[0.5rem] leading-none">
                  {option.price}
                </div>
                <div className="text-[length:var(--fs-body2)] text-gray-5">
                  {option.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PricingCard;